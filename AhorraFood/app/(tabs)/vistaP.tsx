import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/Header";
import Reseña from "@/components/reseñas";
import Footer from "@/components/footer";
import InfoComercio from "@/components/infoComercio";
import { Dimensions } from "react-native";

export default function VistaP() {
  const { product } = useLocalSearchParams();
  const parsedProduct = JSON.parse(product as string);
  const router = useRouter();
  const isMobile = Dimensions.get("window").width < 768;
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/principal")}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Volver al inicio</Text>
        </TouchableOpacity>
        {isMobile && (
          <InfoComercio
            comercio={{
              nombre: "Fonda Doña Carmen",
              direccion: "Vía España, Plaza Carolina",
              telefono: "+507 6789-1234",
              rating: 4.8,
            }}
            productosSimilares={[
              {
                nombre: "Bistec Encebollado",
                precio: "3.85",
                image: require("@/assets/images/bistec.jpg"),
              },
              {
                nombre: "Pollo Guisado",
                precio: "2.80",
                image: require("@/assets/images/polloguisado.jpg"),
              },
            ]}
          />
        )}
        <View style={styles.mainContent}>
          <View style={styles.leftContent}>
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image source={parsedProduct.image} style={styles.image} />
                {parsedProduct.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {parsedProduct.discount}
                    </Text>
                  </View>
                )}
                {parsedProduct.expirationDate && (
                  <View style={styles.expiryBadge}>
                    <Text style={styles.expiryText}>
                      Vence: {parsedProduct.expirationDate}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.title}>{parsedProduct.title}</Text>

              <View style={styles.ratingRow}>
                <FontAwesome name="star" size={14} color="#facc15" />
                <Text style={styles.ratingText}>
                  {parsedProduct.rating} ({parsedProduct.reviews} reseñas)
                </Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.price}>${parsedProduct.price}</Text>
                <Text style={styles.oldPrice}>${parsedProduct.oldPrice}</Text>
              </View>

              <Text style={styles.savingsText}>
                ¡Ahorras $
                {(
                  parseFloat(parsedProduct.oldPrice) -
                  parseFloat(parsedProduct.price)
                ).toFixed(2)}
                !
              </Text>

              <Text style={styles.description}>
                {parsedProduct.description}
              </Text>

              <View style={styles.infoRow}>
                <MaterialIcons name="schedule" size={16} color="#475569" />
                <Text style={styles.infoText}>
                  Preparación: {parsedProduct.prepTime ?? "15-20 min"}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <FontAwesome5 name="store" size={14} color="#475569" />
                <Text style={styles.infoText}>{parsedProduct.store}</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="location-on" size={16} color="#475569" />
                <Text style={styles.infoText}>{parsedProduct.location}</Text>
              </View>

              <Text style={styles.sectionLabel}>Opciones de entrega:</Text>
              <View style={styles.deliveryRow}>
                {parsedProduct.deliveryType?.includes("local") && (
                  <View style={styles.deliveryTag}>
                    <Text style={styles.deliveryText}>🏪 Recoger en local</Text>
                  </View>
                )}
                {parsedProduct.deliveryType?.includes("Envío disponible") && (
                  <View
                    style={[styles.deliveryTag, { backgroundColor: "#dbeafe" }]}
                  >
                    <Text style={[styles.deliveryText, { color: "#1e40af" }]}>
                      🚚 Envío a domicilio
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push({
                    pathname: "/carro",
                    params: {
                      product: JSON.stringify(parsedProduct),
                    },
                  })
                }
              >
                <FontAwesome name="shopping-cart" color="#fff" />
                <Text style={styles.buttonText}> Agregar al carrito</Text>
              </TouchableOpacity>
            </View>

            <Reseña />
          </View>

          <InfoComercio
            comercio={{
              nombre: "Fonda Doña Carmen",
              direccion: "Vía España, Plaza Carolina",
              telefono: "+507 6789-1234",
              rating: 4.8,
            }}
            productosSimilares={[
              {
                nombre: "Bistec Encebollado",
                precio: "3.85",
                image: require("@/assets/images/bistec.jpg"),
              },
              {
                nombre: "Pollo Guisado",
                precio: "2.80",
                image: require("@/assets/images/polloguisado.jpg"),
              },
            ]}
          />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 16,
    padding: 16,
  },
  leftContent: {
    flex: 1,
    minWidth: 320,
    maxWidth: 640,
  },
  rightSidebar: {
    width: 320,
    alignSelf: "flex-start",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    elevation: 3,
    marginBottom: 16,
  },
  imageWrapper: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#f97316",
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  discountText: {
    color: "white",
    fontSize: 12,
  },
  expiryBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#dc2626",
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  expiryText: {
    color: "white",
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#334155",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 4,
    gap: 8,
  },
  price: {
    fontSize: 18,
    color: "#16a34a",
    fontWeight: "bold",
  },
  oldPrice: {
    fontSize: 14,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  savingsText: {
    fontSize: 13,
    color: "#15803d",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#334155",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#475569",
  },
  sectionLabel: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  deliveryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  deliveryTag: {
    backgroundColor: "#dcfce7",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  deliveryText: {
    fontSize: 13,
  },
  button: {
    backgroundColor: "#15803d",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 6,
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
    marginTop: 10,
    marginLeft: 10,
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
