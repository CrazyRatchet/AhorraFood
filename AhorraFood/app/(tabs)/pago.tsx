import Footer from "@/components/footer";
import Header from "@/components/Header";
import PayPalWeb from "@/components/PayPalWeb";
import { PayPalOrder, PayPalPaymentResult } from "@/funciones/paypalService";
import { registrarPedido } from "@/funciones/registrarPedido";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Pago() {
  const { product } = useLocalSearchParams();
  const router = useRouter();

  const [parsedProduct, setParsedProduct] = useState<any>(null);
  const [method, setMethod] = useState("paypal"); // Solo PayPal
  const [showPayPal, setShowPayPal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<PayPalOrder | null>(null);

  useEffect(() => {
    if (product) {
      try {
        const data = JSON.parse(product as string);
        setParsedProduct(data);
      } catch (e) {
        setParsedProduct(null);
      }
    }
  }, [product]);

  const handlePayNow = async () => {
    if (!parsedProduct) return;

    // Solo PayPal como método de pago
    const order: PayPalOrder = {
      id: '',
      amount: parseFloat(parsedProduct.price),
      currency: 'USD',
      description: 'Pedido AhorraFood',
      items: [
        {
          name: parsedProduct.title,
          quantity: 1,
          unit_amount: parseFloat(parsedProduct.price),
        }
      ]
    };
    setCurrentOrder(order);
    setShowPayPal(true);
  };


  const handlePayPalSuccess = async (result: PayPalPaymentResult) => {
    try {
      console.log("=== DEBUGGING PAGO ===");
      console.log("Producto completo:", parsedProduct);
      console.log("comercio_id del producto:", parsedProduct.comercio_id);
      console.log("negocio del producto:", parsedProduct.negocio);
      console.log("precio del producto:", parsedProduct.price);
      
      // Registrar el pedido después del pago exitoso
      const pedido = {
        negocio: parsedProduct.negocio || "desconocido",
        comercio_id: parsedProduct.comercio_id || parsedProduct.negocio, // Usar comercio_id si existe
        productos: [
          {
            id: parsedProduct.id,
            nombre: parsedProduct.title,
            precio: parseFloat(parsedProduct.price),
            cantidad: 1,
            tipoEntrega: parsedProduct.tipoEntrega || "recogida",
          },
        ],
        total: parseFloat(parsedProduct.price),
        metodoPago: "paypal",
        paypalPaymentId: result.id,
      };

      console.log("Pedido a registrar:", pedido);
      console.log("comercio_id final:", pedido.comercio_id);
      await registrarPedido(pedido);
      setShowPayPal(false);
      
      router.push({
        pathname: "/confirmacionP",
        params: { 
          product: JSON.stringify(parsedProduct),
          paymentMethod: "paypal",
          paymentId: result.id
        },
      });
    } catch (error) {
      setShowPayPal(false);
      Alert.alert("Error", "Pago realizado pero hubo un problema al registrar el pedido. Contacta soporte.");
    }
  };


  const handlePayPalError = (error: string) => {
    Alert.alert("Error de Pago", `Hubo un problema con el pago: ${error}`);
    setShowPayPal(false);
  };

  const handlePayPalCancel = () => {
    setShowPayPal(false);
  };

  if (!parsedProduct) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No hay productos para pagar.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Finalizar compra</Text>
          <Text style={styles.subtitle}>Pago seguro con PayPal</Text>

          {/* Método de pago - Solo PayPal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Método de pago</Text>

            <View style={[styles.methodBox, styles.selectedMethod]}>
              <FontAwesome5 name="paypal" size={16} color="#15803d" />
              <Text style={styles.methodText}>PayPal - Pago seguro</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.payBtn} onPress={handlePayNow}>
            <Text style={styles.payText}>
              Pagar con PayPal USD ${parsedProduct.price}
            </Text>
          </TouchableOpacity>
        </View>

        <PayPalWeb
          visible={showPayPal}
          order={currentOrder}
          onSuccess={handlePayPalSuccess}
          onError={handlePayPalError}
          onCancel={handlePayPalCancel}
        />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#f9fafb",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    width: "100%",
    maxWidth: 600,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "left",
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  methodBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  selectedMethod: {
    backgroundColor: "#ecfdf5",
    borderColor: "#15803d",
  },
  methodText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#111827",
  },
  payBtn: {
    backgroundColor: "#15803d",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
  },
  payText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
