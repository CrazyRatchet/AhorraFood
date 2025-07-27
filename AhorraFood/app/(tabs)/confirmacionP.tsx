import Header from "@/components/Header";
import Footer from "@/components/footer";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { registrarPedido } from "../../funciones/registrarPedido"; // Ajusta la ruta según tu estructura

export default function Confirmacion() {
  const router = useRouter();
  const { product } = useLocalSearchParams();
  const [parsedProduct, setParsedProduct] = useState<any>(null);
  const [codigoRecogida, setCodigoRecogida] = useState("");
  const [pedidoId, setPedidoId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Función para generar código alfanumérico aleatorio de 6 caracteres
  const generarCodigo = (longitud = 6) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let resultado = "";
    for (let i = 0; i < longitud; i++) {
      resultado += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return resultado;
  };

  // Función para procesar el pedido
  const procesarPedido = async (productData: any, codigo: string) => {
    try {
      setIsProcessing(true);

      const pedidoData = {
        negocio: productData.store || "Fonda Desconocida",
        productos: [{
          id: productData.id || "prod_001",
          nombre: productData.title || "Producto",
          precio: parseFloat(productData.price) || 0,
          cantidad: 1,
          tipoEntrega: "recogida"
        }],
        total: parseFloat(productData.price) || 0,
        metodoPago: "tarjeta", // Puedes ajustar esto según tu lógica
        estado: "pendiente",
        codigoRecogida: codigo
      };

      const resultado = await registrarPedido(pedidoData);

      if (resultado.success) {
        setPedidoId(resultado.pedidoId);
        console.log("Pedido procesado correctamente:", resultado.pedidoId);
      }
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (product) {
      try {
        const data = JSON.parse(product as string);
        setParsedProduct(data);

        // Generar código al montar el componente
        const codigo = generarCodigo();
        setCodigoRecogida(codigo);

        // Procesar el pedido automáticamente
        procesarPedido(data, codigo);
      } catch (e) {
        setParsedProduct(null);
        console.error("Error al parsear product:", e);
      }
    }
  }, [product]);

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.successCard}>
            <FontAwesome5
              name="check-circle"
              size={36}
              color="#16a34a"
              style={styles.icon}
            />
            <Text style={styles.successTitle}>¡Pago exitoso!</Text>
            <Text style={styles.successSubtitle}>
              Tu pedido ha sido confirmado y enviado a la fonda
            </Text>
            <View style={styles.orderIdBox}>
              <Text style={styles.orderId}>
                {pedidoId ? `Pedido #${pedidoId.slice(-6)}` : "Procesando..."}
              </Text>
            </View>
          </View>

          <View style={styles.sectionBox}>
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name="place"
                size={18}
                color="#1e40af"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.sectionTitle}>Información de recogida</Text>
            </View>

            <View style={styles.codeBox}>
              <Text style={styles.codeLabel}>Tu código de recogida es:</Text>
              <Text style={styles.codeValue}>{codigoRecogida}</Text>
              <Text style={styles.codeNote}>Presenta este código en la fonda</Text>
            </View>

            <Text style={styles.storeName}>
              {parsedProduct?.store || "Fonda Desconocida"}
            </Text>
            <Text style={styles.storeAddress}>
              {parsedProduct?.address || "Dirección no disponible"}
            </Text>

            <View style={styles.instructionsBox}>
              <Text style={styles.instructionTitle}>📢 Instrucciones importantes</Text>
              <Text style={styles.instructionText}>• Tu pedido se reserva por máximo 2 horas</Text>
              <Text style={styles.instructionText}>• Lleva tu código de confirmación</Text>
              <Text style={styles.instructionText}>• No olvides recoger antes de las 2:00 PM</Text>
            </View>
          </View>

          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Resumen del pedido</Text>
            <View style={styles.summaryRow}>
              <Text>1x {parsedProduct?.title || "Producto"}</Text>
              <Text style={styles.greenText}>
                USD {parsedProduct?.price || "0.00"}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ fontWeight: "bold" }}>Total pagado</Text>
              <Text style={styles.greenText}>
                USD {parsedProduct?.price || "0.00"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, (!pedidoId || isProcessing) && styles.disabledBtn]}
            onPress={() => {
              if (pedidoId && !isProcessing) {
                router.push({
                  pathname: "/estadoP",
                  params: { id: pedidoId }, // Usar el ID real del pedido de Firebase
                });
              }
            }}
            disabled={!pedidoId || isProcessing}
          >
            <Text style={styles.primaryBtnText}>
              {isProcessing ? "Procesando..." : "Ver estado del pedido"}
            </Text>
          </TouchableOpacity>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push("/principal")}
            >
              <Text>Seguir comprando</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push("/historialP")}
            >
              <Text>Mis pedidos</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    maxWidth: 640,
    paddingHorizontal: 16,
  },
  successCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 10,
  },
  orderIdBox: {
    backgroundColor: "#15803d",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  orderId: {
    color: "white",
    fontWeight: "bold",
  },
  sectionBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#1e3a8a",
  },
  codeBox: {
    backgroundColor: "#ecfdf5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  codeLabel: {
    fontSize: 13,
    color: "#4b5563",
  },
  codeValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#15803d",
  },
  codeNote: {
    fontSize: 12,
    color: "#6b7280",
  },
  storeName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  storeAddress: {
    fontSize: 13,
    color: "#4b5563",
    marginBottom: 10,
  },
  instructionsBox: {
    backgroundColor: "#fef9c3",
    padding: 10,
    borderRadius: 8,
  },
  instructionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#92400e",
  },
  instructionText: {
    fontSize: 13,
    color: "#92400e",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  greenText: {
    color: "#15803d",
    fontWeight: "500",
  },
  primaryBtn: {
    backgroundColor: "#15803d",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
  },
  disabledBtn: {
    backgroundColor: "#9ca3af",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});