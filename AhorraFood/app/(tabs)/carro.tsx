import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function Carrito() {
  const { product } = useLocalSearchParams();
  const router = useRouter();

  if (!product) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Tu carrito está vacío 🛒</Text>
        <Text style={styles.subText}>
          Selecciona un producto para continuar
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/principal")}
        >
          <Text style={styles.buttonText}>Ir a productos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  let parsedProduct;
  try {
    parsedProduct = JSON.parse(product as string);
  } catch (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Error al cargar el producto</Text>
      </View>
    );
  }

  const ahorro = (
    parseFloat(parsedProduct.oldPrice) - parseFloat(parsedProduct.price)
  ).toFixed(2);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.page}>
        <Text style={styles.title}>Mi Carrito y Pago</Text>
        <Text style={styles.subText}>1 producto en tu carrito</Text>

        <View style={styles.row}>
          <View style={styles.cartBox}>
            <Text style={styles.sectionTitle}>Productos en tu carrito</Text>
            <View style={styles.item}>
              <Image source={parsedProduct.image} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productTitle}>{parsedProduct.title}</Text>
                <Text style={styles.productStore}>{parsedProduct.store}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>USD {parsedProduct.price}</Text>
                  <Text style={styles.oldPrice}>
                    USD {parsedProduct.oldPrice}
                  </Text>
                </View>
              </View>
              <View style={styles.controls}>
                <TouchableOpacity style={styles.qtyBtn}>
                  <Text style={styles.qtySymbol}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>1</Text>
                <TouchableOpacity style={styles.qtyBtn}>
                  <Text style={styles.qtySymbol}>＋</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.trashBtn}>
                  <Feather name="trash-2" size={18} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.sectionTitle}>Resumen del pedido</Text>
            <View style={styles.summaryRow}>
              <Text>Subtotal</Text>
              <Text>USD {parsedProduct.price}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.ahorro}>Ahorro total</Text>
              <Text style={styles.ahorro}>-USD {ahorro}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>USD {parsedProduct.price}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>🔵 Información de recogida</Text>
              <Text style={styles.infoDesc}>
                Deberás recoger tus productos directamente en cada fonda antes
                de las 2:00 PM
              </Text>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.payBtn}
                onPress={() => router.push("/pago")}
              >
                <Text style={styles.payText}>Continuar al pago</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buyMoreBtn}
                onPress={() => router.push("/fonda")}
              >
                <Text>Continuar comprando</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    backgroundColor: "#f3f4f6",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 13,
    color: "#4b5563",
    marginBottom: 12,
  },
  row: {
    flexDirection: "column",
    gap: 16,
    alignItems: "center", // centrado horizontal
  },
  cartBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    width: "100%",
    maxWidth: 800,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  productStore: {
    fontSize: 11,
    color: "#6b7280",
  },
  priceRow: {
    flexDirection: "row",
    gap: 8,
  },
  price: {
    color: "#16a34a",
    fontWeight: "bold",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  qtySymbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    alignItems: "center",
  },
  qtyValue: {
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  trashBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#fca5a5",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  trashIcon: {
    color: "#dc2626",
    fontSize: 16,
  },
  summaryBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    gap: 10,
    width: "100%",
    maxWidth: 800,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ahorro: {
    color: "#ea580c",
  },
  totalText: {
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#dbeafe",
    padding: 10,
    borderRadius: 6,
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1e3a8a",
  },
  infoDesc: {
    fontSize: 12,
    color: "#1e3a8a",
  },
  btnRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 8,
  },
  payBtn: {
    backgroundColor: "#15803d",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  payText: {
    color: "white",
    fontWeight: "bold",
  },
  buyMoreBtn: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
