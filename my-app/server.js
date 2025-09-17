// server.js
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// "Banco" simples em memória — substitua por DB real em produção
const users = []; // cada item: { id, name, email, passwordHash }

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const PORT = process.env.PORT || 4000;

function generateToken(user) {
  // não inclua senhas ou dados sensíveis no payload
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token ausente' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Token inválido' });

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

/** Signup */
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Campos obrigatórios faltando' });

    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return res.status(409).json({ message: 'Email já cadastrado' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const id = users.length + 1;
    const user = { id, name, email: email.toLowerCase(), passwordHash };
    users.push(user);

    const token = generateToken(user);
    return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

/** Login */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Campos obrigatórios faltando' });

    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) return res.status(401).json({ message: 'Email ou senha inválidos' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Email ou senha inválidos' });

    const token = generateToken(user);
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

/** Exemplo de rota protegida */
app.get('/api/me', authMiddleware, (req, res) => {
  // req.user traz os dados codificados no token
  return res.json({ user: req.user });
});

app.listen(PORT, () => {
  console.log(`Auth server rodando em http://localhost:${PORT}`);
});
