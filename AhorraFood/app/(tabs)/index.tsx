import { StyleSheet, Text, View, ScrollView } from "react-native";
import Header from "@/components/Header";
import TarjetasL from "@/components/tarjetasL";
import TarjetasP from "@/components/tarjetasP";
import Estadisticas from "@/components/funcion";
import Footer from "@/components/footer";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const maxContentWidth = 1100;
const usableWidth =
  screenWidth >= 768 ? Math.min(screenWidth, maxContentWidth) : screenWidth;

const cardWidth =
  screenWidth >= 768 ? usableWidth / 3 - 20 : usableWidth / 2 - 20;

const products = [
  {
    title: "Arroz con Pollo",
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
    title: "Tomates Frescos",
    image: require("@/assets/images/tomates.jpg"),
    rating: 4.8,
    reviews: 89,
    store: "Super Fresco Central",
    location: "Vía España",
    price: "2.45",
    oldPrice: "3.50",
    discount: "30%",
    top: true,
  },
  {
    title: "Pescado Frito",
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
    title: "Pan Integral",
    image: require("@/assets/images/pan.jpg"),
    rating: 4.6,
    reviews: 73,
    store: "Super San José",
    location: "El Cangrejo",
    price: "1.58",
    oldPrice: "1.25",
    discount: "30%",
    top: true,
  },
  {
    title: "Pollo Guisado Criollo",
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
  {
    title: "Manzanas Rojas",
    image: require("@/assets/images/manzana.jpg"),
    rating: 4.4,
    reviews: 56,
    store: "Super ",
    location: "Casco Viejo",
    price: "3.36",
    oldPrice: "4.8",
    discount: "30%",
    top: true,
  },
];
export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>¡Bienvenido a AhorraFood!</Text>
          <Text style={styles.welcomeSubtitle}>
            Descubre productos deliciosos con descuentos increíbles y ayuda a
            reducir el desperdicio alimentario
          </Text>
        </View>
        <TarjetasL />
        <Text style={styles.heading}>Productos Mejor Valorados</Text>
        <Text style={styles.subheading}>
          Los favoritos de nuestros usuarios, tanto de fondas como supermercados
        </Text>

        <View style={styles.grid}>
          {products.map((product, idx) => (
            <TarjetasP key={idx} product={product} width={cardWidth} />
          ))}
        </View>
        <Estadisticas />
        
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

  welcomeContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 18,
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
});
