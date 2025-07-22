import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useRouter } from "expo-router";

export default function Confirmacion() {
  const router = useRouter();
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
              <Text style={styles.orderId}>Pedido #ORD-2024-001</Text>
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
              <Text style={styles.codeValue}>ABC123</Text>
              <Text style={styles.codeNote}>
                Presenta este código en la fonda
              </Text>
            </View>

            <Text style={styles.storeName}>Fonda Doña Carmen</Text>
            <Text style={styles.storeAddress}>Vía España, frente al Metro</Text>

            <View style={styles.instructionsBox}>
              <Text style={styles.instructionTitle}>
                📢 Instrucciones importantes
              </Text>
              <Text style={styles.instructionText}>
                • Tu pedido se reserva por máximo 2 horas
              </Text>
              <Text style={styles.instructionText}>
                • Lleva tu código de confirmación
              </Text>
              <Text style={styles.instructionText}>
                • No olvides recoger antes de las 2:00 PM
              </Text>
            </View>
          </View>

          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Resumen del pedido</Text>
            <View style={styles.summaryRow}>
              <Text>1x Arroz con Pollo Panameño</Text>
              <Text style={styles.greenText}>USD 2.70</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ fontWeight: "bold" }}>Total pagado</Text>
              <Text style={styles.greenText}>USD 2.70</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push("/estadoP")}
          >
            <Text style={styles.primaryBtnText}>Ver estado del pedido</Text>
          </TouchableOpacity>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text>Seguir comprando</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text>Mis pedidos</Text>
            </TouchableOpacity>
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
