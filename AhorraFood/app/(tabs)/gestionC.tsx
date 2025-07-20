import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  FontAwesome,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Header from "@/components/Header";

export default function PanelGeneral() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={styles.container}>
       
        <Text style={styles.title}>Gestión de Comercio</Text>
        <Text style={styles.subtitle}>Fonda Doña Carmen</Text>

        {/* Navegación por tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.activeTabText}>Panel General</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => router.push("/productosC")}
          >
            <Text style={styles.tabText}>Productos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => router.push("/pedidosC")}
          >
            <Text style={styles.tabText}>Pedidos</Text>
          </TouchableOpacity>
        </View>

        {/* Métricas */}
        <View style={styles.metricsContainer}>
          {[
            {
              label: "Ingresos del Mes",
              value: "$3450.75",
              icon: <FontAwesome name="dollar" size={20} color="#16a34a" />,
            },
            {
              label: "Pedidos Totales",
              value: "234",
              icon: (
                <MaterialCommunityIcons
                  name="cube-outline"
                  size={20}
                  color="#0f172a"
                />
              ),
            },
            {
              label: "Productos Activos",
              value: "12",
              icon: (
                <MaterialIcons name="trending-up" size={20} color="#16a34a" />
              ),
            },
            {
              label: "Calificación",
              value: "4.8",
              icon: <Feather name="star" size={20} color="#fbbf24" />,
            },
          ].map((item, index) => (
            <View key={index} style={styles.metricCardRow}>
              <View>
                <Text style={styles.metricLabel}>{item.label}</Text>
                <Text style={styles.metricValue}>{item.value}</Text>
              </View>
              {item.icon}
            </View>
          ))}
        </View>

        {/* Pedidos recientes */}
        <View style={styles.recentOrdersCard}>
          <Text style={styles.sectionTitle}>Pedidos Recientes</Text>

          {[
            {
              id: "ORD-001",
              cliente: "María González",
              detalle: "Arroz con Pollo, Refresco",
              hora: "11:00 AM",
              precio: "$3.2",
              estado: "Preparando",
              color: "#fef3c7",
              textColor: "#92400e",
            },
            {
              id: "ORD-002",
              cliente: "Carlos Ruiz",
              detalle: "Bistec Encebollado, Jugo Natural",
              hora: "11:15 AM",
              precio: "$4.85",
              estado: "Listo",
              color: "#e0f2fe",
              textColor: "#1e3a8a",
            },
            {
              id: "ORD-003",
              cliente: "Ana Torres",
              detalle: "Pescado Frito",
              hora: "10:00 AM",
              precio: "$4.2",
              estado: "Completado",
              color: "#dcfce7",
              textColor: "#166534",
            },
          ].map((pedido, i) => (
            <View key={i} style={styles.pedidoRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.pedidoId}>{pedido.id}</Text>
                <Text style={styles.pedidoDetalle}>{pedido.detalle}</Text>
                <Text style={styles.pedidoCliente}> {pedido.cliente}</Text>
                <Text style={styles.pedidoCliente}> Pickup: {pedido.hora}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.pedidoPrecio}>{pedido.precio}</Text>
                <View
                  style={{
                    marginTop: 4,
                    backgroundColor: pedido.color,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: pedido.textColor, fontWeight: "bold" }}>
                    {pedido.estado}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subtitle: {
    color: "#475569",
    marginBottom: 12,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabText: {
    color: "#334155",
  },
  activeTab: {
    backgroundColor: "white",
  },
  activeTabText: {
    color: "#0f172a",
    fontWeight: "bold",
  },
metricsContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginBottom: 16,
  gap: 12,
},

metricCardRow: {
  backgroundColor: "white",
  borderRadius: 10,
  padding: 14,
  width: "48%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 2,
  elevation: 2,
},

metricLabel: {
  fontSize: 12,
  color: "#475569",
  marginBottom: 4,
},

metricValue: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#16a34a",
},

  recentOrdersCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  pedidoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
    paddingVertical: 8,
  },
  pedidoId: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#0f172a",
  },
  pedidoDetalle: {
    fontSize: 13,
    color: "#334155",
  },
  pedidoCliente: {
    fontSize: 12,
    color: "#64748b",
  },
  pedidoPrecio: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
  },
  linkToComercio: {
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 8,
  },
});
