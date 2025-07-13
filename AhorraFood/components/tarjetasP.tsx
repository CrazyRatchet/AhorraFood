import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function TarjetasP({
  product,
  width,
}: {
  product: any;
  width: number;
}) {
  return (
    <View style={[styles.card, { width }]}>
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} resizeMode="cover" />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.badgeText}>{product.discount}</Text>
          </View>
        )}
        {product.top && (
          <View style={styles.topBadge}>
            <Text style={styles.badgeText}>TOP</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.ratingRow}>
        <FontAwesome name="star" color="#facc15" />
        <Text style={styles.rating}>{product.rating}</Text>
        <Text style={styles.reviews}>({product.reviews} reseñas)</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5
          name="store"
          size={12}
          color="#cfd0d1ff"
          style={styles.icon}
        />
        <Text style={styles.store}>{product.store}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="location-on"
          size={12}
          color="#cfd0d1ff"
          style={styles.icon}
        />
        <Text style={styles.location}>{product.location}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.oldPrice}>${product.oldPrice}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <FontAwesome name="shopping-cart" color="#fff" />
        <Text style={styles.buttonText}> Agregar al Carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    elevation: 3,
    marginBottom: 15,
    overflow: "hidden",
  },
  imageContainer: {
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "#f97316",
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  topBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#EAB308",
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: "bold",
  },
  reviews: {
    fontSize: 12,
    color: "#6b7280",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  icon: {
    marginRight: 4,
  },
  store: {
    fontSize: 12,
    color: "#334155",
  },
  location: {
    fontSize: 12,
    color: "#6b7280",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginVertical: 4,
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#16a34a",
  },
  oldPrice: {
    fontSize: 12,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  button: {
    marginTop: 4,
    backgroundColor: "#15803d",
    padding: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
