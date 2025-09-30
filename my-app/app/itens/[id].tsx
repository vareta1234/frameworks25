// screens/Jogos.tsx
import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Jogos({ navigation }: Props) {
  const jogos = [
    {
      id: "1",
      nome: "Eternal Quest",
      descricao: "RPG de mundo aberto com gráficos incríveis.",
      imagem:
        "https://placehold.co/300x180/0b63a8/fff?text=Eternal+Quest",
    },
    {
      id: "2",
      nome: "CyberRacer 2077",
      descricao: "Corridas futuristas em uma cidade cyberpunk.",
      imagem:
        "https://placehold.co/300x180/ff5722/fff?text=CyberRacer+2077",
    },
    {
      id: "3",
      nome: "Battle of Realms",
      descricao: "Estratégia em tempo real com batalhas épicas.",
      imagem:
        "https://placehold.co/300x180/4caf50/fff?text=Battle+of+Realms",
    },
    {
      id: "4",
      nome: "Sky Legends",
      descricao: "Simulador de combate aéreo multiplayer.",
      imagem:
        "https://placehold.co/300x180/673ab7/fff?text=Sky+Legends",
    },
  ];

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
              onPress={() => alert(`Mais detalhes sobre ${jogo.nome} em breve!`)}
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
