// screens/JogoDetalhes.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { router, useLocalSearchParams } from "expo-router";

export default function JogoDetalhes() {
  const { id,nome,descricao,imagem,lancamento,genero } = useLocalSearchParams();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f0f6ff" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Image
        source={{ uri: imagem }}
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
        {nome}
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#444",
          marginBottom: 20,
        }}
      >
        {descricao}
      </Text>

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
        {lancamento || "Em breve"}
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
        {genero || "Ação / Aventura"}
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
