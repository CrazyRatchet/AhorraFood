import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TarjetasL() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  return (
    <View style={styles.outer}>
      <View
        style={[
          styles.container,
          { flexDirection: isLargeScreen ? "row" : "column" },
        ]}
      >
        {/* Fonda y Restaurantes */}
        <View
          style={[
            styles.card,
            { backgroundColor: "#2E7D32", marginRight: isLargeScreen ? 16 : 0 },
          ]}
        >
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={24}
              color="white"
            />
            <Text style={styles.title}>Fondas y Restaurantes</Text>
          </View>
          <Text style={styles.subtitle}>
            Platos tradicionales panameños con descuentos especiales
          </Text>
          <View style={styles.stats}>
            <Text style={styles.statText}>📍 156 comercios</Text>
            <Text style={styles.statText}>📉 hasta 40% desc.</Text>
          </View>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => router.push("/fonda")}
          >
            <Text style={styles.linkText}>Ver Productos</Text>
            <Ionicons name="arrow-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Supermercados */}
        <View style={[styles.card, { backgroundColor: "#1565C0" }]}>
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color="white"
            />
            <Text style={styles.title}>Supermercados</Text>
          </View>
          <Text style={styles.subtitle}>
            Productos frescos y abarrotes con ofertas diarias
          </Text>
          <View style={styles.stats}>
            <Text style={styles.statText}>🛒 23 tiendas</Text>
            <Text style={styles.statText}>📉 hasta 35% desc.</Text>
          </View>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => router.push("/supermercado")}
          >
            <Text style={styles.linkText}>Ver productos</Text>
            <Ionicons name="arrow-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 16,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 1000,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 14,
    marginBottom: 12,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statText: {
    color: "white",
    fontSize: 14,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  linkText: {
    color: "white",
    fontWeight: "600",
  },
});
