import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import Footer from "@/components/footer";

const screenWidth = Dimensions.get("window").width;

export default function RegisterC1() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombreNegocio: "",
    nombrePropietario: "",
    correo: "",
    password: "",
  });

  const handleChange = (name: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    const { nombreNegocio, nombrePropietario, correo, password } = form;

    if (
      !nombreNegocio.trim() ||
      !nombrePropietario.trim() ||
      !correo.trim() ||
      !password.trim()
    ) {
      Alert.alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    router.push({
      pathname: "/registerC2",
      params: {
        ...form,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}> {/* gris claro general */}
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Registro de Comercio - Paso 1</Text>
          <Text style={styles.subtitle}>
            Información general del negocio y el propietario
          </Text>

          <Text style={styles.label}>Nombre del Negocio</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Fonda Doña María"
            value={form.nombreNegocio}
            onChangeText={(text) => handleChange("nombreNegocio", text)}
          />

          <Text style={styles.label}>Nombre del Propietario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={form.nombrePropietario}
            onChangeText={(text) => handleChange("nombrePropietario", text)}
          />

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            value={form.correo}
            onChangeText={(text) => handleChange("correo", text)}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 32,
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#f9fafb",
    padding: 24,
    borderRadius: 10,
    width: "100%",
    maxWidth: 600,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
    
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 12, // separación extra entre campos
  },
  button: {
    backgroundColor: "#166534",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
