import Header from "@/components/Header";
import Filtro from "@/components/filtro";
import Footer from "@/components/footer";
import TarjetasP from "@/components/tarjetasP";
import { obtenerProductosDeFondas, ProductoPublico } from "@/funciones/obtenerProductosDeFondas";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const isMobile = screenWidth < 768;
const maxContentWidth = 1100;
const usableWidth = screenWidth >= 768 ? Math.min(screenWidth, maxContentWidth) : screenWidth;
const cardWidth = screenWidth >= 768 ? usableWidth / 3 - 20 : usableWidth / 2 - 20;

export default function FondasScreen() {
  const router = useRouter();
  const [productosOriginales, setProductosOriginales] = useState<ProductoPublico[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<ProductoPublico[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    try {
      const productos = await obtenerProductosDeFondas();
      setProductosOriginales(productos);
      setProductosFiltrados(productos);
    } catch (error) {
      console.error("Error cargando productos de fondas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const aplicarFiltros = (filtros: {
    precioMin: number;
    precioMax: number;
    recogida: boolean;
    domicilio: boolean;
    orden: string;
  }) => {
    console.log("Aplicando filtros:", filtros);

    let resultado = [...productosOriginales];

    // DEBUG: Mostrar estructura de los primeros productos
    if (productosOriginales.length > 0) {
      console.log("Estructura de tipo_entrega del primer producto:", productosOriginales[0].tipo_entrega);
      console.log("Producto completo:", productosOriginales[0]);
      console.log("Productos originales total:", productosOriginales.length);
    }

    // Filtro por precio
    resultado = resultado.filter(
      (p) =>
        p.precio_descuento >= filtros.precioMin &&
        p.precio_descuento <= filtros.precioMax
    );

    // Filtro por tipo de entrega - LÓGICA CORREGIDA
    if (!filtros.recogida || !filtros.domicilio) {
      // Solo filtrar si no están ambos seleccionados (todos)
      resultado = resultado.filter((p) => {
        console.log(`Producto ${p.nombre}: recogida=${p.tipo_entrega?.recogida}, domicilio=${p.tipo_entrega?.domicilio}`);

        // Si solo recogida está seleccionada
        if (filtros.recogida && !filtros.domicilio) {
          return p.tipo_entrega?.recogida === true;
        }
        // Si solo domicilio está seleccionado
        if (!filtros.recogida && filtros.domicilio) {
          return p.tipo_entrega?.domicilio === true;
        }
        return false;
      });
    }
    // Si ambos están true (todos), no aplicar filtro de entrega

    console.log(`Productos después del filtro de entrega: ${resultado.length}`);

    // Orden
    if (filtros.orden === "precio_asc") {
      resultado.sort((a, b) => a.precio_descuento - b.precio_descuento);
    } else if (filtros.orden === "precio_desc") {
      resultado.sort((a, b) => b.precio_descuento - a.precio_descuento);
    } else if (filtros.orden === "descuento") {
      resultado.sort((a, b) => b.porcentaje_descuento - a.porcentaje_descuento);
    }

    console.log(`Productos finales después de todos los filtros: ${resultado.length}`);
    setProductosFiltrados(resultado);
  };

  const convertirProductoParaTarjeta = (producto: ProductoPublico) => ({
    id: producto.id,
    title: producto.nombre,
    description: producto.descripcion,
    expirationDate: producto.fecha_vencimiento.toLocaleDateString(),
    deliveryType:
      producto.tipo_entrega?.recogida && producto.tipo_entrega?.domicilio
        ? "Recogida y Envío"
        : producto.tipo_entrega?.domicilio
          ? "Envío a domicilio"
          : "Recogida en local",
    image: producto.imagen_url
      ? { uri: producto.imagen_url }
      : require("@/assets/images/arroz.jpg"),
    rating: 4.5,
    reviews: producto.visualizaciones || 0,
    store: producto.comercio_nombre || "Fonda",
    location: producto.comercio_direccion || "Panamá",
    price: producto.precio_descuento.toFixed(2),
    oldPrice: producto.precio_original.toFixed(2),
    discount: `${producto.porcentaje_descuento}%`,
    top: producto.porcentaje_descuento > 0,
  });

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/principal")}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Volver al inicio</Text>
        </TouchableOpacity>

        <View style={styles.mainContainer}>
          <View style={styles.content}>
            <Text style={styles.welcomeTitle}>Fondas/Restaurantes</Text>
            <Text style={styles.welcomeSubtitle}>
              Evita el desperdicio; disfruta platos caseros que aún pueden ser tuyos.
            </Text>

            {isMobile && (
              <View style={styles.mobileFilter}>
                <Filtro onFilterChange={aplicarFiltros} />
              </View>
            )}

            <Text style={styles.resultText}>{productosFiltrados.length} productos encontrados</Text>

            <View style={styles.gridContainer}>
              {!isMobile && (
                <View style={styles.sidebar}>
                  <Filtro onFilterChange={aplicarFiltros} />
                </View>
              )}
              <View style={styles.grid}>
                {loading ? (
                  <ActivityIndicator size="large" color="#166534" />
                ) : (
                  productosFiltrados.map((producto) => (
                    <TarjetasP
                      key={producto.id}
                      product={convertirProductoParaTarjeta(producto)}
                      width={cardWidth}
                    />
                  ))
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    gap: 6,
    marginTop: 5,
  },
  backIcon: {
    fontSize: 16,
    color: "#0f172a",
  },
  backText: {
    fontSize: 14,
    color: "#0f172a",
    fontWeight: "500",
  },
  mainContainer: {
    width: "100%",
    maxWidth: 1200,
  },
  content: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
    marginTop: 10,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 16,
  },
  resultText: {
    fontSize: 14,
    color: "#1e293b",
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: screenWidth >= 768 ? "row" : "column",
    gap: 16,
  },
  sidebar: {
    width: 280,
  },
  mobileFilter: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: 1100,
  },
});