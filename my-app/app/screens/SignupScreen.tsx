// SignupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function SignupScreen({ navigation }: { navigation?: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Erro', 'As senhas não conferem!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://10.0.2.2:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro no cadastro');
      Alert.alert('Sucesso', 'Conta criada! Faça login.');
      navigation?.navigate('Login');
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor:'#f0f6ff', justifyContent:'center', padding:20 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom:30, alignItems:'center' }}>
          <Text style={{ fontSize:26, fontWeight:'bold', color:'#0b63a8' }}>Criar Conta</Text>
          <Text style={{ marginTop:8, color:'#4a6fa5' }}>Preencha os dados para se cadastrar</Text>
        </View>

        <View style={{ backgroundColor:'#fff', padding:20, borderRadius:12 }}>
          <Text style={{ marginBottom:6, fontWeight:'600' }}>Nome</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Nome" editable={!loading} style={{ borderWidth:1, borderColor:'#d6e4f0', borderRadius:8, padding:12, marginBottom:16 }} />

          <Text style={{ marginBottom:6, fontWeight:'600' }}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" editable={!loading} style={{ borderWidth:1, borderColor:'#d6e4f0', borderRadius:8, padding:12, marginBottom:16 }} />

          <Text style={{ marginBottom:6, fontWeight:'600' }}>Senha</Text>
          <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry editable={!loading} style={{ borderWidth:1, borderColor:'#d6e4f0', borderRadius:8, padding:12, marginBottom:16 }} />

          <Text style={{ marginBottom:6, fontWeight:'600' }}>Confirmar Senha</Text>
          <TextInput value={confirm} onChangeText={setConfirm} placeholder="Confirmar senha" secureTextEntry editable={!loading} style={{ borderWidth:1, borderColor:'#d6e4f0', borderRadius:8, padding:12, marginBottom:20 }} />

          <TouchableOpacity onPress={handleSignup} disabled={loading} style={{ backgroundColor:'#0b63a8', paddingVertical:14, borderRadius:8, alignItems:'center' }}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color:'#fff', fontWeight:'700', fontSize:16 }}>Cadastrar</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
