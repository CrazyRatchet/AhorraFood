import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const pedidosEjemplo = [
  {
    id: "ORD-001",
    fecha: "2024-01-14",
    hora: "12:30",
    productos: [
      { nombre: "Arroz con Pollo Panameño", cantidad: 1, precio: 2.7 },
    ],
    total: 2.7,
    estado: "Completado",
  },
  {
    id: "ORD-002",
    fecha: "2024-01-12",
    hora: "13:00",
    productos: [{ nombre: "Bistec Encebollado", cantidad: 1, precio: 3.85 }],
    total: 3.85,
    estado: "Completado",
  },
];

export default function HistorialPedidos() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/principal")}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Volver al inicio</Text>
        </TouchableOpacity>

        <View style={styles.wrapper}>
          <Text style={styles.title}>Historial de pedidos</Text>
          <Text style={styles.subtitle}>
            Revisa todos tus pedidos anteriores
          </Text>

          {pedidosEjemplo.map((pedido) => (
            <View key={pedido.id} style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.pedidoId}>Pedido {pedido.id}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pedido.estado}</Text>
                </View>
              </View>
              <Text style={styles.fecha}>
                📅 {pedido.fecha} • 🕒 Recogido a las {pedido.hora}
              </Text>
              <View style={styles.productosContainer}>
                {pedido.productos.map((p, idx) => (
                  <View key={idx} style={styles.productoRow}>
                    <Text style={styles.productoCantidad}>{p.cantidad}x</Text>
                    <Text style={styles.productoNombre}>{p.nombre}</Text>
                    <Text style={styles.productoPrecio}>
                      USD {p.precio.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={styles.total}>
                Total: USD {pedido.total.toFixed(2)}
              </Text>
              <View style={styles.botonesRow}>
                <TouchableOpacity style={styles.verDetalles}>
                  <Text style={styles.botonTexto}>Ver detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pedirNuevo}>
                  <Text style={styles.botonTextoBlanco}>Pedir de nuevo</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <Footer />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    paddingBottom: 40,
  },
  wrapper: {
    width: "100%",
    maxWidth: 900,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pedidoId: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1f2937",
  },
  badge: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: "#059669",
    fontSize: 12,
    fontWeight: "bold",
  },
  fecha: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 10,
  },
  productosContainer: {
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    paddingTop: 8,
    marginBottom: 8,
  },
  productoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  productoCantidad: {
    fontWeight: "500",
    color: "#111827",
  },
  productoNombre: {
    flex: 1,
    marginLeft: 8,
    color: "#374151",
  },
  productoPrecio: {
    color: "#10b981",
    fontWeight: "bold",
  },
  total: {
    fontWeight: "bold",
    color: "#111827",
    marginTop: 6,
    marginBottom: 12,
  },
  botonesRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  verDetalles: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
  },
  pedirNuevo: {
    backgroundColor: "#10b981",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botonTexto: {
    color: "#374151",
    fontWeight: "500",
  },
  botonTextoBlanco: {
    color: "white",
    fontWeight: "500",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    gap: 6,
    marginTop: 10,
    marginLeft: 10,
  },
  backIcon: {
    fontSize: 16,
    color: "#0f172a",
  },
  backText: {
    fontSize: 14,
    color: "#0f172a",
    fontWeight: "500",
  },
});
