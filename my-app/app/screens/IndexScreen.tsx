// screens/IndexScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

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
        onPress={() => navigation.navigate("Login")}
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
        onPress={() => navigation.navigate("Signup")}
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
