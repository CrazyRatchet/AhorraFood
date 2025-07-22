import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";

export default function TarjetasP({
  product,
  width,
}: {
  product: any;
  width: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isIndex = pathname === "/";
  const isFonda = pathname === "/fonda";
  const isSuper = pathname === "/supermercado";

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i < fullStars ? "star" : "star-o"}
          size={14}
          color="#facc15"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const handlePress = () => {
    if (isIndex) {
      if (Platform.OS === "web") {
        window.alert("Debes iniciar sesión para ver más detalles.");
      } else {
        Alert.alert(
          "Iniciar sesión",
          "Debes iniciar sesión para ver más detalles."
        );
      }
    } else {
      router.push({
        pathname: "/vistaP",
        params: { product: JSON.stringify(product) },
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      style={{ width }}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.image}
            resizeMode="cover"
          />
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.badgeText}>{product.discount.trim()}</Text>
            </View>
          )}
          {isIndex && product.top && (
            <View style={styles.topBadge}>
              <Text style={styles.badgeText}>★ TOP</Text>
            </View>
          )}
          {(isFonda || isSuper) && (
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconCircle}>
                <FontAwesome name="heart-o" size={14} color="#0f172a" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle}>
                <FontAwesome name="share-alt" size={14} color="#0f172a" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.title}>{product.title.trim()}</Text>
        <View style={styles.ratingRow}>
          {renderStars(product.rating)}
          <Text style={styles.ratingText}>
            {product.rating} ({product.reviews} reseñas)
          </Text>
        </View>
        {product.description && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description.trim()}
          </Text>
        )}
        <View style={styles.infoRow}>
          <FontAwesome5
            name="store"
            size={12}
            color="#cfd0d1"
            style={styles.icon}
          />
          <Text style={styles.store}>{product.store.trim()}</Text>
        </View>
        {product.expirationDate && (
          <View style={styles.infoRow}>
            <MaterialIcons
              name="event"
              size={12}
              color="#cfd0d1"
              style={styles.icon}
            />
            <Text style={styles.store}>Vence: {product.expirationDate}</Text>
          </View>
        )}
        {product.deliveryType && (
          <View style={styles.infoRow}>
            <MaterialIcons
              name="local-shipping"
              size={12}
              color="#cfd0d1"
              style={styles.icon}
            />
            <Text style={styles.store}>{product.deliveryType}</Text>
          </View>
        )}
        {product.location && (
          <View style={styles.infoRow}>
            <MaterialIcons
              name="location-on"
              size={12}
              color="#cfd0d1"
              style={styles.icon}
            />
            <Text style={styles.store}>{product.location}</Text>
          </View>
        )}
        <View style={styles.priceRow}>
          <Text style={styles.price}>USD {product.price}</Text>
          <Text style={styles.oldPrice}>USD {product.oldPrice}</Text>
        </View>

        {!isIndex && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/carro",
                params: {
                  product: JSON.stringify(product),
                },
              })
            }
          >
            <FontAwesome name="shopping-cart" color="#fff" />
            <Text style={styles.buttonText}> Agregar al carrito</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
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
    position: "relative",
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
    fontWeight: "bold",
  },
  iconRow: {
    position: "absolute",
    top: 4,
    right: 4,
    flexDirection: "row",
    gap: 6,
  },
  iconCircle: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  ratingText: {
    fontSize: 12,
    color: "#334155",
    marginLeft: 4,
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
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
