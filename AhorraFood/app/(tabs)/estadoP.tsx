import Header from "@/components/Header";
import Footer from "@/components/footer";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../FirebaseConfig";

interface Pedido {
  id: string;
  usuario: string;
  negocio: string;
  productos: string;
  total: string;
  hora: string;
  metodoPago?: string;
  estado: string;
  codigoRecogida?: string;
}

export default function EstadoPedido() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Convertir id a string si es array y verificar que existe
    const pedidoId = Array.isArray(id) ? id[0] : id;
    console.log("ID recibido:", pedidoId);

    if (!pedidoId) {
      console.log("No hay ID del pedido");
      Alert.alert("Error", "No se encontró el ID del pedido");
      return;
    }

    const docRef = doc(db, "pedidos", pedidoId);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Datos del pedido:", data);

          // Procesar productos según la estructura real
          const productosArray = data.productos
            ? Object.values(data.productos).map(
              (prod: any) => `${prod.nombre} x${prod.cantidad}`
            )
            : [];

          const totalNum = typeof data.total === "number" ? data.total : 0;

          let horaStr = "";
          if (data.fechaPedido?.seconds) {
            horaStr = new Date(data.fechaPedido.seconds * 1000).toLocaleTimeString();
          } else if (data.fechaPedido?.toDate) {
            horaStr = data.fechaPedido.toDate().toLocaleTimeString();
          }

          setPedido({
            id: docSnap.id,
            usuario: data.usuario || "Usuario",
            negocio: data.negocio || "Negocio Desconocido",
            productos: productosArray.join(", "),
            total: `${totalNum.toFixed(2)}`,
            hora: horaStr,
            metodoPago: data.metodoPago || "",
            estado: data.estado || "pendiente",
            codigoRecogida: data.codigoRecogida || "",
          });
        } else {
          console.log("No se encontró el pedido en Firestore");
          Alert.alert("Error", "No se encontró el pedido");
          setPedido(null);
        }
      },
      (error) => {
        console.error("Error al escuchar el pedido:", error);
        Alert.alert("Error", "Error al cargar el pedido: " + error.message);
      }
    );

    return () => unsubscribe();
  }, [id]);

  const marcarComoRecogido = async () => {
    if (!pedido) {
      Alert.alert("Error", "No hay información del pedido");
      return;
    }

    console.log("Estado actual del pedido:", pedido.estado);

    // Verificar que el pedido esté en estado "listo"
    if (pedido.estado.toLowerCase() !== "listo") {
      Alert.alert(
        "No disponible",
        `Tu pedido debe estar listo para poder marcarlo como recogido. Estado actual: ${pedido.estado}`
      );
      return;
    }

    Alert.alert(
      "Confirmar recogida",
      "¿Confirmas que has recogido tu pedido? Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, lo recogí",
          onPress: async () => {
            try {
              console.log("Iniciando actualización del pedido...");
              setIsUpdating(true);

              const docRef = doc(db, "pedidos", pedido.id);

              await updateDoc(docRef, {
                estado: "completado",
                fechaRecogida: new Date()
              });

              console.log("Pedido actualizado a completado");

              // Mostrar mensaje de éxito
              Alert.alert(
                "¡Perfecto!",
                "Has confirmado que recogiste tu pedido. ¡Gracias por tu compra!",
                [
                  {
                    text: "Ver mis pedidos",
                    onPress: () => router.replace("/historialP")
                  },
                  {
                    text: "Explorar más",
                    onPress: () => router.replace("/principal")
                  }
                ]
              );

            } catch (error) {
              console.error("Error al marcar como recogido:", error);
              Alert.alert(
                "Error",
                "No se pudo confirmar la recogida. Inténtalo de nuevo.\n\nDetalle: " + error.message
              );
            } finally {
              setIsUpdating(false);
            }
          }
        }
      ]
    );
  };

  if (!pedido) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
            Cargando información del pedido...
          </Text>
          <TouchableOpacity
            style={styles.lightButton}
            onPress={() => router.back()}
          >
            <Text>Volver</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Estado del pedido</Text>
          <Text style={styles.subtitle}>#{pedido.id.slice(-8)}</Text>

          <View style={styles.card}>
            <Text style={styles.statusTitle}>
              {pedido.estado === "listo" ? "🧍🏻‍♂️ ¡Listo para recoger!" :
                pedido.estado === "completado" ? "✅ ¡Pedido completado!" :
                  pedido.estado === "preparando" ? "👨‍🍳 Preparando tu pedido" :
                    pedido.estado === "cancelado" ? "❌ Pedido cancelado" :
                      `Estado: ${pedido.estado}`}
            </Text>
            <Text style={styles.statusSubtitle}>
              {pedido.estado === "listo"
                ? "Tu pedido está listo. Ve a la fonda y presenta tu código."
                : pedido.estado === "completado"
                  ? "¡Pedido completado! Gracias por tu compra."
                  : pedido.estado === "preparando"
                    ? "Tu pedido se está preparando. Te notificaremos cuando esté listo."
                    : pedido.estado === "cancelado"
                      ? "Este pedido ha sido cancelado."
                      : `Estado actual: ${pedido.estado}`}
            </Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressStep, !["pendiente"].includes(pedido.estado.toLowerCase()) && styles.activeStep]}>
                <Text style={styles.stepLabel}>Confirmado</Text>
              </View>
              <View style={[styles.progressStep, ["preparando", "listo", "completado"].includes(pedido.estado.toLowerCase()) && styles.activeStep]}>
                <Text style={styles.stepLabel}>Preparando</Text>
              </View>
              <View style={[styles.progressStep, ["listo", "completado"].includes(pedido.estado.toLowerCase()) && styles.activeStep]}>
                <Text style={styles.stepLabel}>Listo</Text>
              </View>
              <View style={[styles.progressStep, pedido.estado.toLowerCase() === "completado" && styles.activeStep]}>
                <Text style={styles.stepLabel}>Entregado</Text>
              </View>
            </View>

            <Text style={{ marginVertical: 8, fontWeight: "bold" }}>Productos:</Text>
            <Text style={{ marginBottom: 12 }}>{pedido.productos}</Text>
            <Text style={{ fontWeight: "bold" }}>Total: ${pedido.total}</Text>

            {pedido.codigoRecogida && pedido.estado.toLowerCase() === "listo" && (
              <View style={styles.box}>
                <View style={styles.txt}>
                  <Text style={styles.codeLabel}>Tu código de recogida es:</Text>
                </View>
                <View style={styles.codeBox}>
                  <Text style={styles.codeValue}>{pedido.codigoRecogida}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={styles.codeDesc}>Presenta este código en la fonda</Text>
                </View>
              </View>
            )}

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>📍 Información de la fonda</Text>
              <Text style={styles.fondaName}>{pedido.negocio}</Text>
              <Text style={styles.fondaAddress}>Dirección de la fonda</Text>
              <Text style={styles.fondaPhone}>📞 +507 6123-4567</Text>
              <Text style={styles.fondaHours}>⏰ Recoge antes de las 2:00 PM</Text>
              <Text style={styles.fondaHours}>💳 Método de pago: {pedido.metodoPago}</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.whiteButton}>
                  <Ionicons name="call-outline" size={16} />
                  <Text style={styles.btnText}>Llamar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteButton}>
                  <Ionicons name="location-outline" size={16} />
                  <Text style={styles.btnText}>Ver ubicación</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Mensaje cuando está completado */}
            {pedido.estado.toLowerCase() === "completado" && (
              <View style={styles.completedMessage}>
                <Text style={styles.completedText}>
                  ✅ Pedido completado exitosamente
                </Text>
                <Text style={styles.completedSubtext}>
                  Gracias por confirmar la recogida de tu pedido
                </Text>
              </View>
            )}

            {/* Mensaje cuando está cancelado */}
            {pedido.estado.toLowerCase() === "cancelado" && (
              <View style={styles.cancelledMessage}>
                <Text style={styles.cancelledText}>
                  ❌ Pedido cancelado
                </Text>
                <Text style={styles.cancelledSubtext}>
                  Este pedido ha sido cancelado. Si tienes dudas, contacta a la fonda.
                </Text>
              </View>
            )}

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.lightButton}
                onPress={() => router.push("/principal")}
              >
                <Text>Explorar más productos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.lightButton}
                onPress={() => router.push("/historialP")}
              >
                <Text>Ver mis pedidos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  progressStep: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 2,
    borderRadius: 8,
  },
  activeStep: {
    backgroundColor: "#e8f5e8",
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    alignItems: "center",
  },
  txt: {
    marginBottom: 8,
  },
  codeLabel: {
    fontSize: 13,
    color: "#4b5563",
  },
  codeBox: {
    backgroundColor: "#ecfdf5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  codeValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#15803d",
  },
  codeDesc: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  fondaName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  fondaAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  fondaPhone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  fondaHours: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  whiteButton: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    flex: 0.48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  btnText: {
    marginLeft: 8,
    fontSize: 14,
  },
  greenButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  greenButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  lightButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    flex: 0.48,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  completedMessage: {
    backgroundColor: "#dcfce7",
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#22c55e",
  },
  completedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 4,
  },
  completedSubtext: {
    fontSize: 14,
    color: "#166534",
    textAlign: "center",
  },
  cancelledMessage: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f87171",
  },
  cancelledText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 4,
  },
  cancelledSubtext: {
    fontSize: 14,
    color: "#dc2626",
    textAlign: "center",
  },
});