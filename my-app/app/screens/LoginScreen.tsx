// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { saveToken, request } from '../../api';

export default function LoginScreen({ navigation }: { navigation?: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://10.0.2.2:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Falha no login');
      }
      // salva token e navega
      await saveToken(data.token);
      Alert.alert('Sucesso', 'Login realizado!');
      navigation?.navigate('Home');
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro ao logar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor:'#f0f6ff', justifyContent:'center', padding:20 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ marginBottom:40, alignItems:'center' }}>
        <Text style={{ fontSize:26, fontWeight:'bold', color:'#0b63a8' }}>Bem-vindo</Text>
        <Text style={{ marginTop:8, color:'#4a6fa5' }}>Faça login para continuar</Text>
      </View>

      <View style={{ backgroundColor:'#fff', padding:20, borderRadius:12 }}>
        <Text style={{ marginBottom:6, fontWeight:'600' }}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none" editable={!loading}
          style={{ borderWidth:1, borderColor:'#d6e4f0', borderRadius:8, padding:12, marginBottom:16 }} />

        <Text style={{ marginBottom:6, fontWeight:'600' }}>Senha</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry editable={!loading}
          style={{ borderWidth:1, borderColor:'#d6e4f0', borderRadius:8, padding:12, marginBottom:20 }} />

        <TouchableOpacity onPress={handleLogin} disabled={loading} style={{ backgroundColor:'#0b63a8', paddingVertical:14, borderRadius:8, alignItems:'center' }}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color:'#fff', fontWeight:'700', fontSize:16 }}>Entrar</Text>}
        </TouchableOpacity>

        <View style={{ marginTop:12, flexDirection:'row', justifyContent:'center' }}>
          <Text>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Signup')}>
            <Text style={{ color:'#0b63a8', fontWeight:'700', marginLeft:6 }}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
