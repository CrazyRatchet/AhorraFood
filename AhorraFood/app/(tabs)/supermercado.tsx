import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
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
const router = useRouter();
const products = [
  {
    title: "Tomates Frescos",
    description:
      "Tomates frescos y jugosos, perfectos para ensaladas y cocinar.",
    expirationDate: "30-7-2025",
    image: require("@/assets/images/tomates.jpg"),
    rating: 4.9,
    reviews: 127,
    store: "Super Fresco Central",
    location: "Vía España",
    price: "2.45",
    oldPrice: "3.5",
    discount: "30%",
    top: true,
  },
  {
    title: "Pan Integral",
    description: "Pan integral, rico en fibra y perfecto para el desayuno.",
    expirationDate: "30-7-2025",
    image: require("@/assets/images/pan.jpg"),
    rating: 4.7,
    reviews: 95,
    store: "Super San Jose",
    location: "El Cangrejo",
    price: "1.58",
    oldPrice: "2.25",
    discount: "30%",
    top: true,
  },
  {
    title: "Manzanas Rojas",
    description: "Manzanas rojas dulces.",
    expirationDate: "2024-06-2025",
    image: require("@/assets/images/manzana.jpg"),
    rating: 4.7,
    reviews: 95,
    store: " Super 99",
    location: "Cabima",
    price: "3.36",
    oldPrice: "4.8",
    discount: "30%",
    top: true,
  },
  {
    title: "Bananos Orgánicos",
    description: "Bananos orgánicos.",
    expirationDate: "2024-06-30",
    image: require("@/assets/images/Bananas.jpg"),
    rating: 4.5,
    reviews: 68,
    store: "Super 99",
    location: "Cabima",
    price: "1.26",
    oldPrice: "1.8",
    discount: "30%",
    top: true,
  },
];
export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/principal")}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Volver al inicio</Text>
        </TouchableOpacity>
        <View style={styles.mainContainer}>
          <View style={styles.content}>
            <Text style={styles.welcomeTitle}>Supermercados</Text>
            <Text style={styles.welcomeSubtitle}>
              Productos con descuentos especiales
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
});
