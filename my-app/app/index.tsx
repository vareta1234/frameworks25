// screens/IndexScreen.tsx
import React from "react";
import {router} from "expo-router"
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

export default function IndexScreen({ navigation }: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f0f6ff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#0b63a8",
          marginBottom: 40,
        }}
      >
        Bem-vindo ao App
      </Text>

      <TouchableOpacity
        onPress={() => router.push(("/(usuarios)/login"))}
        style={{
          backgroundColor: "#0b63a8",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push(("/(usuarios)/login/cadastro_users"))}
        style={{
          backgroundColor: "#4caf50",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          Cadastro
        </Text>
      </TouchableOpacity>
    </View>
  );
}
