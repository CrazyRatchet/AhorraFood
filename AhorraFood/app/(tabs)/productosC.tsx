// app/productosC.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  obtenerProductosComercio,
  cambiarEstadoProducto,
  eliminarProducto,
  Producto,
} from "../../funciones/productosComercio";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function ProductosC() {
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const productosData = await obtenerProductosComercio();
      setProductos(productosData);
    } catch (error: any) {
      const mensaje = error.message || "No se pudieron cargar los productos";

      if (Platform.OS === "web") {
        window.alert(`Error: ${mensaje}`);
      } else {
        Alert.alert("Error", mensaje);
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarProductos();
    setRefreshing(false);
  };

  const handleCambiarEstado = async (producto: Producto) => {
    const nuevoEstado = producto.estado === "activo" ? "inactivo" : "activo";
    const accion = nuevoEstado === "activo" ? "activar" : "desactivar";

    const confirmarAccion = async () => {
      try {
        await cambiarEstadoProducto(producto.id, nuevoEstado);
        await cargarProductos();
        if (Platform.OS === "web") {
          window.alert(`Producto ${accion} correctamente`);
        } else {
          Alert.alert("Éxito", `Producto ${accion} correctamente`);
        }
      } catch (error: any) {
        const mensaje = error.message || `No se pudo ${accion} el producto`;
        if (Platform.OS === "web") {
          window.alert(`Error: ${mensaje}`);
        } else {
          Alert.alert("Error", mensaje);
        }
      }
    };

    if (Platform.OS === "web") {
      const confirmar = window.confirm(
        `¿Estás seguro de que quieres ${accion} "${producto.nombre}"?`
      );
      if (confirmar) {
        confirmarAccion();
      }
    } else {
      Alert.alert(
        `${accion.charAt(0).toUpperCase() + accion.slice(1)} Producto`,
        `¿Estás seguro de que quieres ${accion} "${producto.nombre}"?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: accion.charAt(0).toUpperCase() + accion.slice(1),
            onPress: confirmarAccion,
          },
        ]
      );
    }
  };

  const handleEliminar = async (producto: Producto) => {
    const confirmarEliminar = async () => {
      try {
        await eliminarProducto(producto.id);
        await cargarProductos();
        if (Platform.OS === "web") {
          window.alert("Producto eliminado correctamente");
        } else {
          Alert.alert("Éxito", "Producto eliminado correctamente");
        }
      } catch (error: any) {
        const mensaje = error.message || "No se pudo eliminar el producto";
        if (Platform.OS === "web") {
          window.alert(`Error: ${mensaje}`);
        } else {
          Alert.alert("Error", mensaje);
        }
      }
    };

    if (Platform.OS === "web") {
      const confirmar = window.confirm(
        `¿Estás seguro de que quieres eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`
      );
      if (confirmar) {
        confirmarEliminar();
      }
    } else {
      Alert.alert(
        "Eliminar Producto",
        `¿Estás seguro de que quieres eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: confirmarEliminar,
          },
        ]
      );
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "#10b981";
      case "inactivo":
        return "#f59e0b";
      case "agotado":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case "activo":
        return "Activo";
      case "inactivo":
        return "Inactivo";
      case "agotado":
        return "Agotado";
      default:
        return estado;
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <Header />
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <ActivityIndicator size="large" color="#166534" />
          <Text style={{ marginTop: 16, color: "#6b7280" }}>
            Cargando productos...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <Header />

      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Mis Productos</Text>
          <Text style={styles.subtitle}>
            {productos.length} producto{productos.length !== 1 ? "s" : ""}
            {productos.length > 0 &&
              ` • ${
                productos.filter((p) => p.estado === "activo").length
              } activo${
                productos.filter((p) => p.estado === "activo").length !== 1
                  ? "s"
                  : ""
              }`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/agregarP")}
        >
          <Feather name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#166534"]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.productsList, isDesktop && styles.productsGrid]}>
          {productos.map((producto) => (
            <View
              key={producto.id}
              style={[
                styles.productCard,
                isDesktop && styles.productCardDesktop,
              ]}
            >
              <View style={styles.productImageContainer}>
                {producto.imagen_url ? (
                  <Image
                    source={{ uri: producto.imagen_url }}
                    style={styles.productImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Feather name="image" size={24} color="#94a3b8" />
                  </View>
                )}
                <View
                  style={[
                    styles.estadoBadge,
                    { backgroundColor: getEstadoColor(producto.estado) },
                  ]}
                >
                  <Text style={styles.estadoText}>
                    {getEstadoText(producto.estado)}
                  </Text>
                </View>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{producto.nombre}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {producto.descripcion}
                </Text>
                <View style={styles.priceContainer}>
                  {producto.porcentaje_descuento > 0 ? (
                    <>
                      <Text style={styles.originalPrice}>
                        ${producto.precio_original.toFixed(2)}
                      </Text>
                      <Text style={styles.discountPrice}>
                        ${producto.precio_descuento.toFixed(2)}
                      </Text>
                      <Text style={styles.discountPercentage}>
                        -{producto.porcentaje_descuento}%
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.discountPrice}>
                      ${producto.precio_original.toFixed(2)}
                    </Text>
                  )}
                </View>
                <View style={styles.additionalInfo}>
                  <Text style={styles.infoText}>
                    <Feather name="package" size={12} color="#6b7280" />{" "}
                    {producto.cantidad_disponible} disponibles
                  </Text>
                  <Text style={styles.infoText}>
                    <Feather name="eye" size={12} color="#6b7280" />{" "}
                    {producto.visualizaciones} vistas
                  </Text>
                  <Text style={styles.infoText}>
                    <Feather name="shopping-cart" size={12} color="#6b7280" />{" "}
                    {producto.ventas} ventas
                  </Text>
                </View>
                <Text style={styles.expirationDate}>
                  Vence: {producto.fecha_vencimiento.toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: getEstadoColor(
                        producto.estado === "activo" ? "inactivo" : "activo"
                      ),
                    },
                  ]}
                  onPress={() => handleCambiarEstado(producto)}
                >
                  <Feather
                    name={producto.estado === "activo" ? "pause" : "play"}
                    size={16}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#ef4444" }]}
                  onPress={() => handleEliminar(producto)}
                >
                  <Feather name="trash-2" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignSelf: "center",
    width: "100%",
    maxWidth: 1200,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#166534",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productsList: {
    padding: 16,
    width: "100%",
    alignSelf: "center",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  productCardDesktop: {
    width: "32%",
  },
  productImageContainer: {
    position: "relative",
    height: 200,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  estadoBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: "#6b7280",
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#166534",
  },
  discountPercentage: {
    fontSize: 10,
    backgroundColor: "#dcfce7",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    fontWeight: "600",
  },
  additionalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#6b7280",
    flex: 1,
  },
  expirationDate: {
    fontSize: 10,
    color: "#f59e0b",
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
    paddingTop: 0,
  },
  actionButton: {
    width: 36,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
