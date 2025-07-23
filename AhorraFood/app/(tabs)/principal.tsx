import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { detectUserType, UserProfile } from "../../funciones/userType";
import { obtenerProductosMejorValorados, obtenerTodosLosProductos, ProductoPublico } from "../../funciones/productosPublicos";
import Header from "@/components/Header";
import TarjetasL from "@/components/tarjetasL";
import TarjetasP from "@/components/tarjetasP";
import Estadisticas from '@/components/estadisticas';
import Footer from "@/components/footer";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const maxContentWidth = 1100;
const usableWidth =
  screenWidth >= 768 ? Math.min(screenWidth, maxContentWidth) : screenWidth;

const cardWidth =
  screenWidth >= 768 ? usableWidth / 3 - 20 : usableWidth / 2 - 20;

export default function HomeScreen() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile>({ type: null, data: null });
  const [productos, setProductos] = useState<ProductoPublico[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await detectUserType();
          setUserProfile(profile);
          
          // Si es un comercio, redirigir al dashboard de comercio
          if (profile.type === "comercio") {
            router.replace("/dashboardComercio");
            return;
          }
        } catch (error) {
          console.error("Error detectando tipo de usuario:", error);
        }
      } else {
        setUserProfile({ type: null, data: null });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      console.log("🔄 Cargando productos para página principal...");
      
      // Usar función super simple para debug
      const productosData = await obtenerTodosLosProductos();
      console.log("📦 Productos obtenidos:", productosData.length);
      
      // Tomar solo los primeros 6 para la página principal
      const productosLimitados = productosData.slice(0, 6);
      setProductos(productosLimitados);
      
    } catch (error: any) {
      console.error("❌ Error cargando productos:", error);
      console.error("❌ Detalles del error:", error.stack);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarProductos();
    setRefreshing(false);
  };

  const convertirProductoParaTarjeta = (producto: ProductoPublico) => {
    return {
      id: producto.id,
      title: producto.nombre,
      description: producto.descripcion,
      expirationDate: producto.fecha_vencimiento.toLocaleDateString(),
      deliveryType: producto.tipo_entrega?.recogida && producto.tipo_entrega?.domicilio 
        ? "Recogida y Envío" 
        : producto.tipo_entrega?.domicilio 
          ? "Envío a domicilio" 
          : "Recogida en local",
      image: producto.imagen_url ? { uri: producto.imagen_url } : require("@/assets/images/arroz.jpg"),
      rating: 4.5, // Por ahora fijo, se puede implementar sistema de ratings después
      reviews: producto.visualizaciones || 0,
      store: producto.comercio_nombre || "Comercio",
      location: producto.comercio_direccion || "Panamá",
      price: producto.precio_descuento.toFixed(2),
      oldPrice: producto.precio_original.toFixed(2),
      discount: `${producto.porcentaje_descuento}%`,
      top: producto.porcentaje_descuento > 0,
    };
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#166534" />
        <Text style={{ marginTop: 16, color: "#6b7280" }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header/>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#166534"]} />
        }
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>¡Bienvenido a AhorraFood!</Text>
          <Text style={styles.welcomeSubtitle}>
            Descubre productos deliciosos con descuentos increíbles y ayuda a
            reducir el desperdicio alimentario
          </Text>
        </View>
        
        <TarjetasL/>
        
        <Text style={styles.heading}>Productos Mejor Valorados</Text>
        <Text style={styles.subheading}>
          Los favoritos de nuestros usuarios, tanto de fondas como supermercados
        </Text>

        {productos.length > 0 ? (
          <View style={styles.grid}>
            {productos.map((producto) => (
              <TarjetasP 
                key={producto.id} 
                product={convertirProductoParaTarjeta(producto)} 
                width={cardWidth}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? "Cargando productos..." : "No hay productos disponibles en este momento"}
            </Text>
          </View>
        )}
        
        <Estadisticas/>
      </ScrollView>
      <Footer/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    alignItems: "center",
  },
  welcomeContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
    textAlign: "center",
    marginTop: 5,
  },
  subheading: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 1100,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});
