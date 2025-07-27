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
  const [method, setMethod] = useState("tarjeta");
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

    const pedido = {
      negocio: parsedProduct.negocio || "desconocido",
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
      metodoPago: method,
    };

    try {
      await registrarPedido(pedido);

      if (method === "paypal") {
        const order: PayPalOrder = {
          id: '',
          amount: pedido.total,
          currency: 'USD',
          description: 'Pedido AhorraFood',
          items: [
            {
              name: pedido.productos[0].nombre,
              quantity: 1,
              unit_amount: pedido.productos[0].precio,
            }
          ]
        };
        setCurrentOrder(order);
        setShowPayPal(true);
      } else {
        router.push({
          pathname: "/confirmacionP",
          params: { product: JSON.stringify(parsedProduct) },
        });
      }
    } catch (e) {
      Alert.alert("Error", "No se pudo registrar el pedido.");
    }
  };


  const handlePayPalSuccess = async (result: PayPalPaymentResult) => {
    setShowPayPal(false);
    router.push({
      pathname: "/confirmacionP",
      params: { product: JSON.stringify(parsedProduct) },
    });
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
          <Text style={styles.subtitle}>Completa tu información de pago</Text>

          {/* Info de pago */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de pago</Text>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre completo</Text>
                <TextInput style={styles.input} placeholder="Juan Pérez" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput style={styles.input} placeholder="juan@example.com" />
              </View>
            </View>
          </View>

          {/* Método de pago */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Método de pago</Text>

            <TouchableOpacity
              style={[styles.methodBox, method === "tarjeta" && styles.selectedMethod]}
              onPress={() => setMethod("tarjeta")}
            >
              <FontAwesome5 name="credit-card" size={16} color={method === "tarjeta" ? "#15803d" : "#6b7280"} />
              <Text style={styles.methodText}>Tarjeta de crédito/débito</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodBox, method === "paypal" && styles.selectedMethod]}
              onPress={() => setMethod("paypal")}
            >
              <FontAwesome5 name="paypal" size={16} color={method === "paypal" ? "#15803d" : "#6b7280"} />
              <Text style={styles.methodText}>PayPal</Text>
            </TouchableOpacity>

            {method === "tarjeta" && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Número de tarjeta</Text>
                  <TextInput style={styles.input} placeholder="1234 5678 9012 3456" keyboardType="numeric" />
                </View>
                <View style={styles.row}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Fecha de expiración</Text>
                    <TextInput style={styles.input} placeholder="12/26" />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput style={styles.input} placeholder="123" keyboardType="numeric" secureTextEntry />
                  </View>
                </View>
              </>
            )}
          </View>

          <TouchableOpacity style={styles.payBtn} onPress={handlePayNow}>
            <Text style={styles.payText}>
              {method === "paypal"
                ? `Pagar con PayPal USD ${parsedProduct.price}`
                : `Pagar ahora USD ${parsedProduct.price}`}
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
