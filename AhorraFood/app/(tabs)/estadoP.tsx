import Header from "@/components/Header";
import Footer from "@/components/footer";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EstadoPedido() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Estado del pedido</Text>
          <Text style={styles.subtitle}>#ORD-2024-001</Text>

          <View style={styles.card}>
            <Text style={styles.statusTitle}>🧍🏻‍♂️ ¡Listo para recoger!</Text>
            <Text style={styles.statusSubtitle}>
              Tu pedido está listo. Ve a la fonda y presenta tu código.
            </Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressStep, styles.activeStep]}>
                <Text style={styles.stepLabel}>Confirmado</Text>
              </View>
              <View style={[styles.progressStep, styles.activeStep]}>
                <Text style={styles.stepLabel}>Preparando</Text>
              </View>
              <View style={[styles.progressStep, styles.activeStep]}>
                <Text style={styles.stepLabel}>Listo</Text>
              </View>
              <View style={styles.progressStep}>
                <Text style={styles.stepLabel}>Entregado</Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <Feather name="check-circle" color="#22c55e" size={16} />
              <Text style={styles.stepText}>Pedido confirmado</Text>
            </View>
            <Text style={styles.stepDesc}>
              Tu pedido ha sido enviado a la fonda
            </Text>

            <View style={styles.stepItem}>
              <Feather name="check-circle" color="#22c55e" size={16} />
              <Text style={styles.stepText}>En preparación</Text>
            </View>
            <Text style={styles.stepDesc}>
              La fonda está preparando tu pedido
            </Text>

            <View style={styles.stepItem}>
              <Feather name="check-circle" color="#22c55e" size={16} />
              <Text style={styles.stepText}>Listo para recoger</Text>
            </View>
            <Text style={styles.stepDesc}>
              Tu pedido está listo para recoger
            </Text>

            <View style={styles.stepItem}>
              <Feather name="circle" color="#d1d5db" size={16} />
              <Text style={styles.stepTextMuted}>Entregado</Text>
            </View>
            <Text style={styles.stepDescMuted}>
              Pedido entregado exitosamente
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.txt}>
              <Text style={styles.codeLabel}>Tu código de recogida es:</Text>
            </View>
            <View style={styles.codeBox}>
              <Text style={styles.codeValue}>ABC123</Text>
            </View>
            <View style={styles.txt}>
              <Text style={styles.codeDesc}>
                Presenta este código en la fonda
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>📍 Información de la fonda</Text>
            <Text style={styles.fondaName}>Fonda Doña Carmen</Text>
            <Text style={styles.fondaAddress}>Vía España, frente al Metro</Text>
            <Text style={styles.fondaPhone}>📞 +507 6123-4567</Text>
            <Text style={styles.fondaHours}>
              ⏰ Recoge antes de las 2:00 PM
            </Text>

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

          <TouchableOpacity style={styles.greenButton}>
            <Text style={styles.greenButtonText}>Marcar como recogido</Text>
          </TouchableOpacity>

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
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  container: {
    width: "94%",
    maxWidth: 480,

    paddingBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 16,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  txt: {
    alignItems: "center",
  },
  statusTitle: {
    fontWeight: "bold",
    color: "#16a34a",
    fontSize: 16,
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 2,
    borderRadius: 2,
  },
  activeStep: {
    backgroundColor: "#22c55e",
  },
  stepLabel: {
    fontSize: 1,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  stepText: {
    fontWeight: "bold",
    color: "#111827",
  },
  stepTextMuted: {
    fontWeight: "bold",
    color: "#9ca3af",
  },
  stepDesc: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 22,
  },
  stepDescMuted: {
    fontSize: 12,
    color: "#d1d5db",
    marginLeft: 22,
  },
  codeBox: {
    backgroundColor: "#f0fdf4",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  codeLabel: {
    fontSize: 14,
    color: "#4b5563",
  },
  codeValue: {
    fontSize: 24,
    color: "#16a34a",
    fontWeight: "bold",
    marginVertical: 4,
  },
  codeDesc: {
    fontSize: 14,
    color: "#6b7280",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  fondaName: {
    fontWeight: "600",
  },
  fondaAddress: {
    fontSize: 13,
    color: "#4b5563",
  },
  fondaPhone: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 6,
  },
  fondaHours: {
    fontSize: 13,
    color: "#4b5563",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    justifyContent: "space-between",
  },
  whiteButton: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    flex: 1,
    backgroundColor: "#fff",
  },
  btnText: {
    fontSize: 13,
    fontWeight: "500",
  },
  greenButton: {
    backgroundColor: "#15803d",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
  },
  greenButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  lightButton: {
    backgroundColor: "#ffff",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});
