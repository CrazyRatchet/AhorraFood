import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function RegisterStep1() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Comercio - Paso 1</Text>
        <Text style={styles.subtitle}>
          Tipo de negocio - Selecciona la categoría de tu establecimiento
        </Text>

        <View style={styles.stepsContainer}>
          <View style={[styles.stepCircle, styles.activeStep]}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
        </View>

        <Text style={styles.selectLabel}>Selecciona el Tipo de Negocio</Text>
        <Text style={styles.selectDescription}>
          Elige la categoría que mejor describe tu negocio
        </Text>

        <View style={styles.centerWrapper}>
          <TouchableOpacity
            style={styles.optionCardGreen}
            onPress={() => router.push("/registerC2?tipo=fonda")}
          >
            <Ionicons name="restaurant" size={24} color="#166534" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Fonda / Restaurante</Text>
              <Text style={styles.optionDesc}>
                Negocio de comida tradicional, fondas o restaurantes
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionCardBlue}
            onPress={() => router.push("/registerC2?tipo=super")}
          >
            <Ionicons name="cart" size={24} color="#2563eb" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Supermercado / Tienda</Text>
              <Text style={styles.optionDesc}>
                Supermercado, tienda de abarrotes o minisúper
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    flex: 1,
    padding: 20,
    paddingTop: 60,
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
  stepNumber: {
    color: "white",
    fontWeight: "bold",
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: "#d1d5db",
  },
  selectLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
    textAlign: "center",
  },
  selectDescription: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  centerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  optionCardGreen: {
    flexDirection: "row",
    backgroundColor: "#ecfdf5",
    padding: 14,
    borderRadius: 8,
    borderColor: "#a7f3d0",
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 16,
    maxWidth: 600,
    width: "100%",
  },
  optionCardBlue: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    padding: 14,
    borderRadius: 8,
    borderColor: "#bfdbfe",
    borderWidth: 1,
    alignItems: "center",
    maxWidth: 600,
    width: "100%",
  },
  optionTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  optionTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1f2937",
  },
  optionDesc: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
});
