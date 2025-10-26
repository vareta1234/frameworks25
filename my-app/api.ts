// api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'http://10.0.2.2:4000'; // android emulator (use http://localhost:4000 no iOS / Expo Go em desktop)
export async function saveToken(token: string) {
  await AsyncStorage.setItem('@app:auth', token);
}
export async function getToken() {
  return AsyncStorage.getItem('@app:auth');
}
export async function removeToken() {
  return AsyncStorage.removeItem('@app:auth');
}

export async function request(path: string, options: RequestInit = {}) {
  const token = await getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) } as any;
  if (token) headers['Authorization'] = `Auth ${token}`;
  const resp = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const text = await resp.text();
  let json;
  try { json = text ? JSON.parse(text) : null; } catch (e) { json = { raw: text }; }
  if (!resp.ok) {
    const err = (json && json.message) || resp.statusText || 'Erro na requisição';
    throw new Error(err);
  }
  return json;
}
