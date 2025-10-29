// screens/Jogos.tsx
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const axios = require('axios');

interface Jogo {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

export default function Jogos() {
  const [jogos, setJogos] = useState<Jogo[]>([])

  

  useEffect(() => {
    let isMounted = true;

    async function getJogos() {
      try {
        const response = await axios.get('http://localhost:4000/api/jogos');
        if (!isMounted) return;
        
        const dados = response.data.jogos;
        if (!Array.isArray(dados)) {
          console.error('Resposta inválida: dados não são um array');
          return;
        }

        setJogos(dados);
      } catch (error) {
        if (!isMounted) return;
        console.error('Erro ao buscar jogos:', error);
        setJogos([]); // Reset para array vazio em caso de erro
      }
    }

    getJogos();

    // Cleanup function para evitar atualização em componente desmontado
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f0f6ff", padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#0b63a8",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Catálogo de Lançamentos
      </Text>

      {jogos.map((jogo) => (
        <View
          key={jogo.id}
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: jogo.imagem }}
            style={{ width: "100%", height: 180 }}
            resizeMode="cover"
          />
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 6 }}>
              {jogo.nome}
            </Text>
            <Text style={{ color: "#555", marginBottom: 12 }}>
              {jogo.descricao}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#0b63a8",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => router.push({ pathname: "/jogos/[id]", params: { id: jogo.id }})}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Ver Detalhes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
