// app/(tabs)/dashboardComercio.tsx
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../FirebaseConfig";
import { obtenerProductosComercio } from "../../funciones/productosComercio";
import { detectUserType, UserProfile } from "../../funciones/userType";

export default function DashboardComercio() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    type: null,
    data: null,
  });
  const [stats, setStats] = useState({
    totalProductos: 0,
    productosActivos: 0,
    ventasHoy: 0,
    ingresosMes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profile = await detectUserType();
      setUserProfile(profile);

      if (profile.type === "comercio") {
        await loadStats();
      } else {
        // Si no es comercio, redirigir a la página principal
        router.replace("/principal");
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
      Alert.alert("Error", "No se pudieron cargar los datos del comercio");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const productos = await obtenerProductosComercio();

      setStats({
        totalProductos: productos.length,
        productosActivos: productos.filter((p) => p.estado === "activo").length,
        ventasHoy: productos.reduce((sum, p) => sum + p.ventas, 0),
        ingresosMes: productos.reduce(
          (sum, p) => sum + p.ventas * p.precio_descuento,
          0
        ),
      });
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace("/loginU");
            } catch (error) {
              Alert.alert("Error", "No se pudo cerrar la sesión");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#166534" />
        <Text style={{ marginTop: 16, color: "#6b7280" }}>Cargando...</Text>
      </View>
    );
  }

  if (userProfile.type !== "comercio") {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 18, color: "#ef4444" }}>Acceso denegado</Text>
        <Text style={{ color: "#6b7280", marginTop: 8 }}>
          Esta área es solo para comercios
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header del Dashboard */}
        <View style={styles.dashboardHeader}>
          <View>
            <Text style={styles.welcomeText}>¡Bienvenido!</Text>
            <Text style={styles.businessName}>
              {userProfile.data?.nombre || "Mi Comercio"}
            </Text>
            <Text style={styles.ownerName}>
              Propietario: {userProfile.data?.propietario}
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/")} >
            <Feather name="log-out" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Resumen del Negocio</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: "#dbeafe" }]}>
              <MaterialIcons name="inventory" size={24} color="#1d4ed8" />
              <Text style={styles.statNumber}>{stats.totalProductos}</Text>
              <Text style={styles.statLabel}>Total Productos</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: "#dcfce7" }]}>
              <Feather name="eye" size={24} color="#166534" />
              <Text style={styles.statNumber}>{stats.productosActivos}</Text>
              <Text style={styles.statLabel}>Activos</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: "#fef3c7" }]}>
              <FontAwesome5 name="shopping-cart" size={20} color="#d97706" />
              <Text style={styles.statNumber}>{stats.ventasHoy}</Text>
              <Text style={styles.statLabel}>Ventas</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: "#fce7f3" }]}>
              <FontAwesome5 name="dollar-sign" size={20} color="#be185d" />
              <Text style={styles.statNumber}>
                ${stats.ingresosMes.toFixed(2)}
              </Text>
              <Text style={styles.statLabel}>Ingresos</Text>
            </View>
          </View>
        </View>

        {/* Acciones Principales */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Gestión de Productos</Text>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#166534" }]}
            onPress={() => router.push("/agregarP")}
          >
            <Feather name="plus" size={24} color="white" />
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Agregar Producto</Text>
              <Text style={styles.actionSubtitle}>
                Publica un nuevo producto con descuento
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#1d4ed8" }]}
            onPress={() => router.push("/productosC")}
          >
            <MaterialIcons name="inventory-2" size={24} color="white" />
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Mis Productos</Text>
              <Text style={styles.actionSubtitle}>
                Ver, editar y gestionar productos
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#dc2626" }]}
            onPress={() => router.push("/pedidosC")}
          >
            <Feather name="shopping-bag" size={24} color="white" />
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Pedidos</Text>
              <Text style={styles.actionSubtitle}>
                Gestionar pedidos recibidos
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  dashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  welcomeText: {
    fontSize: 16,
    color: "#6b7280",
  },
  businessName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 4,
  },
  ownerName: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
    textAlign: "center",
  },
  actionsContainer: {
    padding: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  actionSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  statusContainer: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  categoryText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  deliveryText: {
    fontSize: 14,
    color: "#6b7280",
  },
});
