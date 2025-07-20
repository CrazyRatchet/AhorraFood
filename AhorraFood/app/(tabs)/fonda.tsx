import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Header from "@/components/Header";
import TarjetasP from "@/components/tarjetasP";
import Filtro from "@/components/filtro";
import Footer from "@/components/footer";

const screenWidth = Dimensions.get("window").width;
const isMobile = screenWidth < 768;



const maxContentWidth = 1100;
const usableWidth =
  screenWidth >= 768 ? Math.min(screenWidth, maxContentWidth) : screenWidth;

const cardWidth =
  screenWidth >= 768 ? usableWidth / 3 - 20 : usableWidth / 2 - 20;



const products = [
  {
    title: "Arroz con Pollo",
    description:
      "Tradicional arroz con pollo acompañado de frijoles negros, tajadas maduras y ensalada fresca.",
    expirationDate: "2024-06-Jun 2025",
    deliveryType: "Recogida en local",
    image: require("@/assets/images/arroz.jpg"),
    rating: 4.9,
    reviews: 127,
    store: "Fonda Doña Carmen",
    location: "Vía España",
    price: "2.70",
    oldPrice: "4.50",
    discount: "40%",
    top: true,
  },
  {
    title: "Pescado Frito",
    description:
      "Fresco pescado frito acompañado de patacones crujientes, arroz de coco y ensalada.",
    expirationDate: "2024-06-20",
    deliveryType: "Recogida en local",
    image: require("@/assets/images/pescado.jpg"),
    rating: 4.7,
    reviews: 95,
    store: "Fonda La Maria",
    location: "Casco Viejo",
    price: "4.2",
    oldPrice: "6",
    discount: "30%",
    top: true,
  },
  {
    title: "Bistec Encebollado",
    description:
      "Jugoso bistec de res encebollado con arroz blanco, frijoles rojos y tajadas maduras.",
    expirationDate: "2024-06-2025",
    deliveryType: "Envío disponible",
    image: require("@/assets/images/bistec.jpg"),
    rating: 4.7,
    reviews: 95,
    store: " Fonda El Buen Sabor",
    location: "Casco Viejo",
    price: "3.85",
    oldPrice: "5.50",
    discount: "30%",
    top: true,
  },
  {
    title: "Pollo Guisado Criollo",
    description: "Pollo guisado estilo criollo con arroz blanco y vegetales.",
    expirationDate: "2024-06-30",
    deliveryType: "Envío disponible",
    image: require("@/assets/images/polloguisado.jpg"),
    rating: 4.5,
    reviews: 68,
    store: "Fonda Mi Ranchito",
    location: "Rio Abajo",
    price: "2.8",
    oldPrice: "4",
    discount: "30%",
    top: true,
  },
];
export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContainer}>
          <View style={styles.content}>
            <Text style={styles.welcomeTitle}>
              Fondas/Restaurantes
            </Text>
            <Text style={styles.welcomeSubtitle}>
              Evita el desperdicio; disfruta platos caseros que aún pueden ser tuyos.
            </Text>

            {/* Mostrar el filtro debajo del título solo en móvil */}
            {isMobile && (
              <View style={styles.mobileFilter}>
                <Filtro />
              </View>
            )}

            <Text style={styles.resultText}>
              {products.length} productos encontrados
            </Text>

            <View style={styles.gridContainer}>
              {/* Mostrar el filtro al lado izquierdo solo en pantallas grandes */}
              {!isMobile && (
                <View style={styles.sidebar}>
                  <Filtro />
                </View>
              )}

              <View style={styles.grid}>
                {products.map((product, idx) => (
                  <TarjetasP key={idx} product={product} width={cardWidth} />
                ))}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    alignItems: "center",
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
