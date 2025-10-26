// server.js
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// "Banco" simples em memória — substitua por DB real em produção
const users = []; // cada item: { id, name, email, passwordHash }
// armazenamento simples de tokens de autenticação em memória
const authTokens = new Map(); // token -> { id, email, name, exp }

const PORT = process.env.PORT || 4000;

function generateAuthToken(user) {
  // gera um token randômico e o armazena em memória com expiração
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 dias
  authTokens.set(token, { id: user.id, email: user.email, name: user.name, exp: expiresAt });
  return token;
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers['x-auth-token'];
  if (!authHeader) return res.status(401).json({ message: 'Token ausente' });

  // suporta formatos: 'Auth <token>' ou 'Bearer <token>' ou token direto no x-auth-token
  let token = authHeader;
  if (typeof authHeader === 'string' && authHeader.split(' ').length === 2) {
    token = authHeader.split(' ')[1];
  }

  const session = authTokens.get(token);
  if (!session) return res.status(401).json({ message: 'Token inválido' });
  if (session.exp && session.exp < Date.now()) {
    authTokens.delete(token);
    return res.status(401).json({ message: 'Token expirado' });
  }

  req.user = { id: session.id, email: session.email, name: session.name };
  next();
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

    const auth = generateAuthToken(user);
    return res.status(201).json({ auth, user: { id: user.id, name: user.name, email: user.email } });
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

    const auth = generateAuthToken(user);
    return res.json({ auth, user: { id: user.id, name: user.name, email: user.email } });
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
