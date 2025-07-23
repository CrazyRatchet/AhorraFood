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
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { obtenerProductosComercio, cambiarEstadoProducto, eliminarProducto, Producto } from "../../funciones/productosComercio";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function ProductosC() {
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      console.log("🔄 Cargando productos...");
      const productosData = await obtenerProductosComercio();
      console.log("📦 Productos recibidos:", productosData.length);
      setProductos(productosData);
    } catch (error: any) {
      console.error("❌ Error cargando productos:", error);
      Alert.alert("Error", error.message || "No se pudieron cargar los productos");
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
    
    Alert.alert(
      `${accion.charAt(0).toUpperCase() + accion.slice(1)} Producto`,
      `¿Estás seguro de que quieres ${accion} "${producto.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: accion.charAt(0).toUpperCase() + accion.slice(1),
          onPress: async () => {
            try {
              await cambiarEstadoProducto(producto.id, nuevoEstado);
              await cargarProductos(); // Recargar lista
              Alert.alert("Éxito", `Producto ${accion === "activar" ? "activado" : "desactivado"} correctamente`);
            } catch (error: any) {
              Alert.alert("Error", error.message || `No se pudo ${accion} el producto`);
            }
          }
        }
      ]
    );
  };

  const handleEliminar = async (producto: Producto) => {
    Alert.alert(
      "Eliminar Producto",
      `¿Estás seguro de que quieres eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await eliminarProducto(producto.id);
              await cargarProductos(); // Recargar lista
              Alert.alert("Éxito", "Producto eliminado correctamente");
            } catch (error: any) {
              Alert.alert("Error", error.message || "No se pudo eliminar el producto");
            }
          }
        }
      ]
    );
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo": return "#10b981";
      case "inactivo": return "#f59e0b";
      case "agotado": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case "activo": return "Activo";
      case "inactivo": return "Inactivo";
      case "agotado": return "Agotado";
      default: return estado;
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <Header />
        <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color="#166534" />
          <Text style={{ marginTop: 16, color: "#6b7280" }}>Cargando productos...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <Header />
      
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#166534"]} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>Mis Productos</Text>
            <Text style={styles.subtitle}>
              {productos.length} producto{productos.length !== 1 ? "s" : ""} 
              {productos.length > 0 && ` • ${productos.filter(p => p.estado === "activo").length} activo${productos.filter(p => p.estado === "activo").length !== 1 ? "s" : ""}`}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/agregarP")}
          >
            <Feather name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Lista de productos */}
        {productos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="package" size={80} color="#94a3b8" />
            <Text style={styles.emptyTitle}>No tienes productos</Text>
            <Text style={styles.emptySubtitle}>
              Agrega tu primer producto para empezar a vender
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => router.push("/agregarP")}
            >
              <Feather name="plus" size={16} color="white" />
              <Text style={styles.emptyButtonText}>Agregar Producto</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.productsList}>
            {productos.map((producto) => (
              <View key={producto.id} style={styles.productCard}>
                {/* Imagen del producto */}
                <View style={styles.productImageContainer}>
                  {producto.imagen_url ? (
                    <Image source={{ uri: producto.imagen_url }} style={styles.productImage} />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Feather name="image" size={24} color="#94a3b8" />
                    </View>
                  )}
                  
                  {/* Badge de estado */}
                  <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(producto.estado) }]}>
                    <Text style={styles.estadoText}>{getEstadoText(producto.estado)}</Text>
                  </View>
                </View>

                {/* Información del producto */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{producto.nombre}</Text>
                  <Text style={styles.productDescription} numberOfLines={2}>
                    {producto.descripcion}
                  </Text>
                  
                  {/* Precios */}
                  <View style={styles.priceContainer}>
                    {producto.porcentaje_descuento > 0 ? (
                      <>
                        <Text style={styles.originalPrice}>${producto.precio_original.toFixed(2)}</Text>
                        <Text style={styles.discountPrice}>${producto.precio_descuento.toFixed(2)}</Text>
                        <Text style={styles.discountPercentage}>-{producto.porcentaje_descuento}%</Text>
                      </>
                    ) : (
                      <Text style={styles.discountPrice}>${producto.precio_original.toFixed(2)}</Text>
                    )}
                  </View>

                  {/* Info adicional */}
                  <View style={styles.additionalInfo}>
                    <Text style={styles.infoText}>
                      <Feather name="package" size={12} color="#6b7280" /> {producto.cantidad_disponible} disponibles
                    </Text>
                    <Text style={styles.infoText}>
                      <Feather name="eye" size={12} color="#6b7280" /> {producto.visualizaciones} vistas
                    </Text>
                    <Text style={styles.infoText}>
                      <Feather name="shopping-cart" size={12} color="#6b7280" /> {producto.ventas} ventas
                    </Text>
                  </View>

                  {/* Fecha de vencimiento */}
                  <Text style={styles.expirationDate}>
                    Vence: {producto.fecha_vencimiento.toLocaleDateString()}
                  </Text>
                </View>

                {/* Acciones */}
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: getEstadoColor(producto.estado === "activo" ? "inactivo" : "activo") }]}
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
        )}
      </ScrollView>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyButton: {
    flexDirection: "row",
    backgroundColor: "#166534",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
  emptyButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  productsList: {
    padding: 16,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  productImageContainer: {
    position: "relative",
    height: 120,
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
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#6b7280",
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#166534",
  },
  discountPercentage: {
    fontSize: 12,
    color: "#166534",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 6,
    paddingVertical: 2,
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
    fontSize: 12,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
