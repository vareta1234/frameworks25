import { Link } from "expo-router";
import { Text, View } from "react-native";
import { IndexStyles } from "./styles/IndexStyles";

export default function Index() {
  return (
    <View style={IndexStyles.container}>
      <Text style={IndexStyles.title}>Bem-vindo</Text>
      <Text style={IndexStyles.subtitle}>Escolha uma opção</Text>
      <Link href={"/(auth)/login"} style={IndexStyles.button as any}>
        <Text style={IndexStyles.buttonText}>Login</Text>
      </Link>
      <Link href={"/(auth)/cadastro"} style={IndexStyles.buttonSecondary as any}>
        <Text style={IndexStyles.buttonText}>Cadastrar</Text>
      </Link>
    </View>
  );
}
