// registerC2.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function RegisterStep2() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombreNegocio: "",
    nombrePropietario: "",
    correo: "",
    telefono: "",
    direccion: "",
    ubicacion: "",
    categoria: "",
    descripcion: "",
    horaApertura: "",
    horaCierre: "",
    recogerLocal: false,
    envioDomicilio: false,
  });

  const handleChange = (name: string, value: string | boolean) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Comercio - Paso 2</Text>
        <Text style={styles.subtitle}>
          Información del negocio - Completa los datos de tu establecimiento
        </Text>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          <View style={[styles.stepCircle, styles.completedStep]}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepCircle, styles.activeStep]}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información del Negocio</Text>
          <Text style={styles.sectionSubtitle}>
            Proporciona los datos de tu fonda/restaurante
          </Text>

          {/* Inputs */}
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Nombre del Negocio *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Fonda Doña Carmen"
                onChangeText={(text) => handleChange("nombreNegocio", text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Nombre del Propietario *</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre completo"
                onChangeText={(text) => handleChange("nombrePropietario", text)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Correo Electrónico *</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="correo@ejemplo.com"
                onChangeText={(text) => handleChange("correo", text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.input}
                placeholder="+507 6123-4567"
                keyboardType="phone-pad"
                onChangeText={(text) => handleChange("telefono", text)}
              />
            </View>
          </View>

          <Text style={styles.label}>Dirección Completa</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección completa del negocio"
            onChangeText={(text) => handleChange("direccion", text)}
          />

          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Ubicación</Text>
              <TextInput
                style={styles.input}
                placeholder="Selecciona ubicación"
                onChangeText={(text) => handleChange("ubicacion", text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Categoría</Text>
              <TextInput
                style={styles.input}
                placeholder="Selecciona categoría"
                onChangeText={(text) => handleChange("categoria", text)}
              />
            </View>
          </View>

          <Text style={styles.label}>Descripción del Negocio</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline
            placeholder="Describe tu negocio..."
            onChangeText={(text) => handleChange("descripcion", text)}
          />

          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Hora de Apertura</Text>
              <TextInput
                style={styles.input}
                placeholder="00:00"
                onChangeText={(text) => handleChange("horaApertura", text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Hora de Cierre</Text>
              <TextInput
                style={styles.input}
                placeholder="00:00"
                onChangeText={(text) => handleChange("horaCierre", text)}
              />
            </View>
          </View>

          <Text style={styles.label}>Opciones de Entrega</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleChange("recogerLocal", !form.recogerLocal)}
              style={styles.checkboxWrapper}
            >
              <View style={styles.checkbox}>
                {form.recogerLocal && <View style={styles.checkedBox} />}
              </View>
              <Text style={styles.checkboxLabel}>Recoger en local</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChange("envioDomicilio", !form.envioDomicilio)}
              style={styles.checkboxWrapper}
            >
              <View style={styles.checkbox}>
                {form.envioDomicilio && <View style={styles.checkedBox} />}
              </View>
              <Text style={styles.checkboxLabel}>Envío a domicilio</Text>
            </TouchableOpacity>
          </View>

          {/* Botones */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonGray]}
              onPress={() => router.push("/registerC1")}
            >
              <Text style={styles.buttonText}>Anterior</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonGreen]}
              onPress={() => router.push("/registerC3")}
            >
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: "#166534",
  },
  completedStep: {
    backgroundColor: "#166534",
  },
  stepNumber: {
    color: "white",
    fontWeight: "bold",
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: "#d1d5db",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    fontSize: 13,
    backgroundColor: "#f9fafb",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#374151",
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    width: 10,
    height: 10,
    backgroundColor: "#166534",
  },
  checkboxLabel: {
    fontSize: 13,
    color: "#374151",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonGreen: {
    backgroundColor: "#166534",
  },
  buttonGray: {
    backgroundColor: "#e5e7eb",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
