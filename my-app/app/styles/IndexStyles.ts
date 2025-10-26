import { StyleSheet } from "react-native";

export const IndexStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f1fb",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0b63a8",
    marginBottom: 16,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#4a6fa5",
    marginBottom: 40,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#0b63a8",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonSecondary: {
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
