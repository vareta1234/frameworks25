// screens/JogoDetalhes.tsx
import axios from 'axios';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Jogo {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  lancamento?: string;
  genero?: string;
}

export default function JogoDetalhes() {
  const { id } = useLocalSearchParams();
  const [jogo, setJogo] = useState<Jogo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function getJogo() {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/jogos/${id}`);
        
        if (!isMounted) return;
        
        if (response.data) {
          setJogo(response.data.jogo);
        } else {
          setError('Jogo não encontrado');
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Erro ao buscar detalhes do jogo:', error);
        setError('Erro ao carregar detalhes do jogo');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getJogo();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#f0f6ff" }}>
        <ActivityIndicator size="large" color="#0b63a8" />
      </View>
    );
  }

  if (error || !jogo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#f0f6ff", padding: 20 }}>
        <Text style={{ fontSize: 18, color: "#ff0000", marginBottom: 20, textAlign: 'center' }}>
          {error || 'Jogo não encontrado'}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "#0b63a8",
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f0f6ff" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Image
        source={{ uri: jogo.imagem }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 12,
          marginBottom: 20,
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#0b63a8",
          marginBottom: 10,
        }}
      >
        {jogo.nome}
      </Text>

      {/* Pequeno resumo do jogo com opção de ver mais */}
      <Text
        style={{
          fontSize: 16,
          color: "#444",
          marginBottom: 8,
        }}
      >
        {jogo.descricao
          ? showFullDesc
            ? jogo.descricao
            : jogo.descricao.length > 140
            ? `${jogo.descricao.slice(0, 140)}...`
            : jogo.descricao
          : "Sem descrição disponível."}
      </Text>
      {jogo.descricao && jogo.descricao.length > 140 && (
        <TouchableOpacity onPress={() => setShowFullDesc((s) => !s)} style={{ marginBottom: 12 }}>
          <Text style={{ color: "#0b63a8", fontWeight: "600" }}>
            {showFullDesc ? "Ver menos" : "Ver mais"}
          </Text>
        </TouchableOpacity>
      )}

      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        📅 Data de lançamento:
      </Text>
      <Text style={{ fontSize: 16, color: "#333", marginBottom: 20 }}>
        {jogo.lancamento || "Em breve"}
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        🕹️ Gênero:
      </Text>
      <Text style={{ fontSize: 16, color: "#333", marginBottom: 30 }}>
        {jogo.genero || "Ação / Aventura"}
      </Text>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: "#0b63a8",
          paddingVertical: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          Voltar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
