import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";

export default function LoginScreen({ navigation }: { navigation?: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    // Simula chamada de API
    setTimeout(() => {
      setLoading(false);
      if (email === "teste@email.com" && password === "123456") {
        Alert.alert("Sucesso", "Login realizado!");
        navigation?.navigate("Home"); // caso tenha tela Home
      } else {
        Alert.alert("Erro", "Email ou senha inválidos.");
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#f0f6ff",
        justifyContent: "center",
        padding: 20,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ marginBottom: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#0b63a8" }}>
          Bem-vindo
        </Text>
        <Text style={{ marginTop: 8, color: "#4a6fa5" }}>
          Faça login para continuar
        </Text>
      </View>

      <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 12 }}>
        <Text style={{ marginBottom: 6, fontWeight: "600" }}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          style={{
            borderWidth: 1,
            borderColor: "#d6e4f0",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
          }}
        />

        <Text style={{ marginBottom: 6, fontWeight: "600" }}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          editable={!loading}
          style={{
            borderWidth: 1,
            borderColor: "#d6e4f0",
            borderRadius: 8,
            padding: 12,
            marginBottom: 20,
          }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: "#0b63a8",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              Entrar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
