// app/productosC.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/components/Header";

export default function ProductosC() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <Header />
      
      <View style={styles.container}>
        <View style={styles.placeholderContainer}>
          <Feather name="package" size={80} color="#94a3b8" />
          <Text style={styles.title}>Gestión de Productos</Text>
          <Text style={styles.subtitle}>Esta funcionalidad estará disponible próximamente</Text>
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/agregarP")}
          >
            <Feather name="plus" size={16} color="white" />
            <Text style={styles.backButtonText}>Agregar Producto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 40,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#374151",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#15803d",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
  backButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
