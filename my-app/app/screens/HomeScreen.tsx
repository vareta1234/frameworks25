// HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { request, removeToken } from '../../api';

export default function HomeScreen({ navigation }: { navigation?: any }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await request('/api/me', { method: 'GET' });
        setUser(data.user);
      } catch (err: any) {
        Alert.alert('Erro', err.message || 'Falha ao carregar usuário');
        // em caso de token inválido, deslogue
        await removeToken();
        navigation?.navigate('Login');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    navigation?.navigate('Login');
  };

  if (loading) return <ActivityIndicator style={{ flex:1, justifyContent:'center' }} />;

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:'700' }}>Olá, {user?.name || user?.email}!</Text>
      <Text style={{ marginTop:8 }}>ID: {user?.id}</Text>

      <TouchableOpacity onPress={handleLogout} style={{ marginTop:20, backgroundColor:'#0b63a8', padding:12, borderRadius:8 }}>
        <Text style={{ color:'#fff', fontWeight:'700' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
