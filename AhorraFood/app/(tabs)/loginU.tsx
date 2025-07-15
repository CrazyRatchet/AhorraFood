import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/funciones/auth";

export default function LoginUserScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginUser(email.trim(), password);
      Alert.alert("Éxito", "Sesión iniciada correctamente");
      router.push("/principal"); // Puedes cambiar esta ruta si tienes otra home
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logooo.png")}
        style={styles.logo}
      />
      <Text style={styles.logoText}>AhorraFood</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          placeholder="tu@email.com"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          placeholder="Tu contraseña"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? "Cargando..." : "Iniciar sesión"}</Text>
        </TouchableOpacity>

        <Text style={styles.centerText}>
          ¿No tienes cuenta?{" "}
          <Text style={styles.link} onPress={() => router.push("/registerU")}>
            Regístrate
          </Text>
        </Text>

        <View style={styles.divider} />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dbece1",
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 4,
    marginTop: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "#111827",
  },
  label: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#f9fafb",
  },
  loginButton: {
    backgroundColor: "#166534",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  centerText: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 16,
    color: "#4b5563",
  },
  divider: {
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  link: {
    color: "#166534",
    fontWeight: "500",
    fontSize: 13,
  },
});
