import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { registerUser } from "@/funciones/auth";

export default function RegisterUserScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPass) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUser(nombre, email, telefono, password);
      alert("Usuario registrado correctamente");
      router.replace("/loginU");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logooo.png")}
          style={styles.logo}
        />
        <Text style={styles.logoText}>AhorraFood</Text>
        <Text style={styles.subtitle}>
          Únete a AhorraFood y comienza a ahorrar
        </Text>

        <View style={styles.card}>
          <Text style={styles.title}>Crear cuenta</Text>

          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            placeholder="Tu nombre completo"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            placeholder="tu@email.com"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            placeholder="+507 XXXX-XXXX"
            style={styles.input}
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="Mínimo 8 caracteres"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Repite contraseña</Text>
          <TextInput
            placeholder="Repite tu contraseña"
            style={styles.input}
            secureTextEntry
            value={confirmPass}
            onChangeText={setConfirmPass}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setAcceptTerms(!acceptTerms)}
              style={styles.checkboxBox}
            >
              {acceptTerms && <View style={styles.checkboxChecked} />}
            </TouchableOpacity>
            <Text style={styles.acceptText}>
              Acepto los <Text style={styles.link}>Términos de Servicio</Text> y
              la <Text style={styles.link}>Política de Privacidad</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, !acceptTerms && { opacity: 0.5 }]}
            disabled={!acceptTerms}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText} >Crear cuenta</Text>
          </TouchableOpacity>

          <Text style={styles.centerText}>
            ¿Ya tienes cuenta?{" "}
            <Text style={styles.link} onPress={() => router.push("/loginU")}>
              Inicia sesión
            </Text>
          </Text>

          <View style={styles.divider} />
          <Text style={styles.centerText}>
            ¿Tienes una fonda?{" "}
            <Text style={styles.link} onPress={() => router.push("/registerC1")}>
              Regístrate como comercio
            </Text>
          </Text>
        </View>
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
    marginTop: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
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
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    width: 10,
    height: 10,
    backgroundColor: "#166534",
  },
  acceptText: {
    fontSize: 13,
    color: "#374151",
    flex: 1,
    flexWrap: "wrap",
  },
  registerButton: {
    backgroundColor: "#166534",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonText: {
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
