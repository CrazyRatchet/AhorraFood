import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function RegisterStep2() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [form, setForm] = useState({
    telefono: "",
    direccion: "",
    categoria: "",
    recogerLocal: false,
    envioDomicilio: false,
  });

  const handleChange = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (
      !form.telefono.trim() ||
      !form.direccion.trim() ||
      !form.categoria.trim() ||
      (!form.recogerLocal && !form.envioDomicilio)
    ) {
      Alert.alert("Por favor completa todos los campos obligatorios y selecciona al menos un tipo de entrega.");
      return;
    }

    router.push({
      pathname: "/registerC3",
      params: {
        ...params,
        ...form,
        recogerLocal: form.recogerLocal.toString(),
        envioDomicilio: form.envioDomicilio.toString(),
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Comercio - Paso 2</Text>
        <Text style={styles.subtitle}>
          Información del negocio - Completa los datos de tu establecimiento
        </Text>

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

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 6123-4567"
          keyboardType="phone-pad"
          value={form.telefono}
          onChangeText={(text) => handleChange("telefono", text)}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección exacta del negocio"
          value={form.direccion}
          onChangeText={(text) => handleChange("direccion", text)}
        />

        <Text style={styles.label}>Categoría</Text>
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={[
              styles.option,
              form.categoria === "Fonda" && styles.selectedOption,
            ]}
            onPress={() => handleChange("categoria", "Fonda")}
          >
            <Text
              style={[
                styles.optionText,
                form.categoria === "Fonda" && styles.selectedOptionText,
              ]}
            >
              Fonda / Restaurante
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              form.categoria === "Supermercado" && styles.selectedOption,
            ]}
            onPress={() => handleChange("categoria", "Supermercado")}
          >
            <Text
              style={[
                styles.optionText,
                form.categoria === "Supermercado" && styles.selectedOptionText,
              ]}
            >
              Supermercado
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>¿Qué tipo de entrega ofrece?</Text>
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={[
              styles.option,
              form.recogerLocal && styles.selectedOption,
            ]}
            onPress={() =>
              handleChange("recogerLocal", !form.recogerLocal)
            }
          >
            <Text
              style={[
                styles.optionText,
                form.recogerLocal && styles.selectedOptionText,
              ]}
            >
              Recoger en Local
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              form.envioDomicilio && styles.selectedOption,
            ]}
            onPress={() =>
              handleChange("envioDomicilio", !form.envioDomicilio)
            }
          >
            <Text
              style={[
                styles.optionText,
                form.envioDomicilio && styles.selectedOptionText,
              ]}
            >
              Envío a Domicilio
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/registerC1")}>
            <Text style={styles.backButtonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    backgroundColor: "#f9fafb",
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 12,
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  completedStep: {
    backgroundColor: "#166534",
  },
  activeStep: {
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
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "white",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 8,
    flexWrap: "wrap",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    backgroundColor: "white",
  },
  selectedOption: {
    backgroundColor: "#166534",
    borderColor: "#166534",
  },
  optionText: {
    color: "#374151",
    fontSize: 13,
  },
  selectedOptionText: {
    color: "white",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 24,
    gap: 10,
  },
  backButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#166534",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
