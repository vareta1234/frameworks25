import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Arquivo inicial</Text>
      <Link href={"/(usuarios)/login"}> Login </Link>
      <Link href={"/(usuarios)/login/cadastro_users"} >Cadastro</Link>
    </View>
  );
}


