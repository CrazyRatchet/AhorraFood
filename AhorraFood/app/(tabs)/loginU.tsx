import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  Platform,
  ScrollView,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* Logo y subtítulo */}
        <Image
          source={require("@/assets/images/logooo.png")}
          style={styles.logo}
        />
        <Text style={styles.logoText}>AhorraFood</Text>
        <Text style={styles.subtitle}>Bienvenido de vuelta</Text>

        {/* Card de login */}
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            placeholder="tu@email.com"
            style={styles.input}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="Tu contraseña"
            style={styles.input}
            secureTextEntry={true}
          />

          <View style={styles.row}>
            <View style={styles.checkboxWrapper}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.checkbox}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                />
              </TouchableOpacity>
              <Text style={styles.rememberText}>Recordarme</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/principal")} // Navega a /principal
          >
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <Text style={styles.centerText}>
            ¿No tienes cuenta?{" "}
            <Text style={styles.link} onPress={() => router.push("/registerU")}>
              Regístrate
            </Text>
          </Text>

          <View style={styles.divider} />
          <Text style={styles.centerText}>
            ¿Eres propietario de una fonda?{" "}
            <Text style={styles.link} onPress={() => router.push("/registerC1")}>
              Ingresa aquí
            </Text>
          </Text>
        </View>

        <Text style={styles.terms}>
          Al iniciar sesión, aceptas nuestros{" "}
          <Text style={styles.link}>Términos de Servicio</Text> y{" "}
          <Text style={styles.link}>Política de Privacidad</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#dbece1",
  },
  container: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32", // verde
  },
  subtitle: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 20,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 6,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 4,
    backgroundColor: "white",
  },
  checkboxChecked: {
    backgroundColor: "#166534",
    borderColor: "#166534",
  },
  rememberText: {
    fontSize: 13,
    color: "#374151",
  },
  link: {
    color: "#166534",
    fontWeight: "500",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#166534",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
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
  terms: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 20,
    maxWidth: 320,
  },
});
