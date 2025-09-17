import React, { useState } from "react";
import {router} from "expo-router"

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function SignupScreen({ navigation }: { navigation?: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    setLoading(true);

    // Simulação de cadastro (substitua por sua API ou Firebase)
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation?.navigate("Login");
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 30, alignItems: "center" }}>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#0b63a8" }}>
            Criar Conta
          </Text>
          <Text style={{ marginTop: 8, color: "#4a6fa5" }}>
            Preencha os dados para se cadastrar
          </Text>
        </View>

        <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 12 }}>
          <Text style={{ marginBottom: 6, fontWeight: "600" }}>Nome</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            editable={!loading}
            style={{
              borderWidth: 1,
              borderColor: "#d6e4f0",
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
            }}
          />

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
              marginBottom: 16,
            }}
          />

          <Text style={{ marginBottom: 6, fontWeight: "600" }}>
            Confirmar Senha
          </Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repita sua senha"
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
            onPress={handleSignup}
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
                Cadastrar
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text>Já possui conta?</Text>
          <TouchableOpacity onPress={() => router.push("(usuarios)/login")}>
            <Text style={{ color: "#0b63a8", fontWeight: "700", marginTop: 4 }}>
              Fazer Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

