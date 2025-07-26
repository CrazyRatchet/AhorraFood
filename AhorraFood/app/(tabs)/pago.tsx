import Header from "@/components/Header";
import Footer from "@/components/footer";
import PayPalWeb from "@/components/PayPalWeb";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PayPalOrder, PayPalPaymentResult } from "@/funciones/paypalService";

export default function Pago() {
  const [method, setMethod] = useState("tarjeta");
  const [showPayPal, setShowPayPal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<PayPalOrder | null>(null);
  const router = useRouter();

  const handlePayNow = async () => {
    if (method === "paypal") {
      // Crear orden de PayPal
      const order: PayPalOrder = {
        id: '', // Se generará en el servidor
        amount: 2.70,
        currency: 'USD',
        description: 'Pedido AhorraFood',
        items: [
          {
            name: 'Pedido de comida',
            quantity: 1,
            unit_amount: 2.70
          }
        ]
      };
      
      setCurrentOrder(order);
      setShowPayPal(true);
    } else {
      // Pago con tarjeta (mantener funcionalidad existente)
      router.push("/confirmacionP");
    }
  };

  const handlePayPalSuccess = (result: PayPalPaymentResult) => {
    setShowPayPal(false);
    router.push("/confirmacionP");
  };

  const handlePayPalError = (error: string) => {
    Alert.alert('Error de Pago', `Hubo un problema con el pago: ${error}`);
    setShowPayPal(false);
  };

  const handlePayPalCancel = () => {
    setShowPayPal(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Finalizar compra</Text>
          <Text style={styles.subtitle}>Completa tu información de pago</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de pago</Text>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre completo</Text>
                <TextInput style={styles.input} placeholder="Juan Pérez" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={styles.input}
                  placeholder="juan@example.com"
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Método de pago</Text>

            <TouchableOpacity
              style={[
                styles.methodBox,
                method === "tarjeta" && styles.selectedMethod,
              ]}
              onPress={() => setMethod("tarjeta")}
            >
              <FontAwesome5
                name="credit-card"
                size={16}
                color={method === "tarjeta" ? "#15803d" : "#6b7280"}
              />
              <Text style={styles.methodText}>Tarjeta de crédito/débito</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodBox,
                method === "paypal" && styles.selectedMethod,
              ]}
              onPress={() => setMethod("paypal")}
            >
              <FontAwesome5
                name="paypal"
                size={16}
                color={method === "paypal" ? "#15803d" : "#6b7280"}
              />
              <Text style={styles.methodText}>PayPal</Text>
            </TouchableOpacity>

            {method === "tarjeta" && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Número de tarjeta</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.row}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Fecha de expiración</Text>
                    <TextInput style={styles.input} placeholder="12/26" />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      keyboardType="numeric"
                      secureTextEntry
                    />
                  </View>
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.payBtn}
            onPress={handlePayNow}
          >
            <Text style={styles.payText}>
              {method === "paypal" ? "Pagar con PayPal USD 2.70" : "Pagar ahora USD 2.70"}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Modal de PayPal */}
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
