import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const pedidosIniciales = [
  {
    id: "ORD-001",
    cliente: "María González",
    telefono: "+507 6123-4567",
    productos: "Arroz con Pollo, Refresco",
    total: "$3.2",
    hora: "10:30 AM",
    pickup: "11:00 AM",
    pago: "Tarjeta",
    estado: "Completado",
  },
  {
    id: "ORD-002",
    cliente: "Carlos Ruiz",
    telefono: "+507 6789-1234",
    productos: "Bistec Encebollado, Jugo",
    total: "$4.85",
    hora: "10:45 AM",
    pickup: "11:15 AM",
    pago: "Yappy",
    estado: "Listo",
  },
  {
    id: "ORD-003",
    cliente: "Ana Torres",
    telefono: "+507 6555-8888",
    productos: "Pescado Frito",
    total: "$4.2",
    hora: "09:30 AM",
    pickup: "10:00 AM",
    pago: "Efectivo",
    estado: "Pendiente",
  },
  {
    id: "ORD-004",
    cliente: "Roberto Silva",
    telefono: "+507 6111-2222",
    productos: "Pollo Guisado Criollo, Arroz, Refresco",
    total: "$8.3",
    hora: "11:00 AM",
    pickup: "11:30 AM",
    pago: "Tarjeta",
    estado: "Pendiente",
  },
];

export default function PedidosC() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  const cambiarEstado = (id) => {
    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === id) {
          const nuevoEstado =
            pedido.estado === "Pendiente"
              ? "Preparando"
              : pedido.estado === "Preparando"
              ? "Listo"
              : pedido.estado === "Listo"
              ? "Completado"
              : pedido.estado;
          return { ...pedido, estado: nuevoEstado };
        }
        return pedido;
      })
    );
  };

  const resumen = pedidos.reduce(
    (acc, p) => {
      acc.Total++;
      acc[p.estado]++;
      return acc;
    },
    {
      Total: 0,
      Pendiente: 0,
      Preparando: 0,
      Listo: 0,
      Completado: 0,
    }
  );

  const getColor = (estado) => {
    switch (estado) {
      case "Pendiente":
        return { backgroundColor: "#fde68a", color: "#92400e" };
      case "Preparando":
        return { backgroundColor: "#fef08a", color: "#92400e" };
      case "Listo":
        return { backgroundColor: "#dbeafe", color: "#1e40af" };
      case "Completado":
        return { backgroundColor: "#bbf7d0", color: "#166534" };
      default:
        return { backgroundColor: "#e5e7eb", color: "#374151" };
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView
        style={{ backgroundColor: "#f8fafc" }}
        horizontal={isSmallScreen}
      >
        <View style={{ padding: 16, width: isSmallScreen ? 800 : "100%" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
            Gestión de Pedidos
          </Text>
          <Text style={{ marginBottom: 12, color: "#6b7280" }}>
            Administra todos los pedidos de tu fonda
          </Text>

          {/* Resumen */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 16,
            }}
          >
            {Object.entries(resumen).map(([key, value]) => (
              <View
                key={key}
                style={{
                  flex: 1,
                  minWidth: 130,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 2,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#16a34a" }}
                >
                  {value}
                </Text>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>{key}</Text>
              </View>
            ))}
          </View>

          {/* Tabla */}
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "#f1f5f9",
              }}
            >
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Pedido
              </Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Cliente
              </Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Productos
              </Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Total
              </Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Hora
              </Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Pickup
              </Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Pago
              </Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Estado
              </Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>
                Acciones
              </Text>
            </View>
            {pedidos.map((p) => (
              <View
                key={p.id}
                style={{
                  flexDirection: "row",
                  padding: 10,
                  borderTopWidth: 1,
                  borderColor: "#e5e7eb",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>
                  {p.id}
                </Text>
                <View style={[styles.td, { flex: 1 }]}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: isSmallScreen ? 11 : 13,
                    }}
                  >
                    {p.cliente}
                  </Text>
                  <Text style={{ fontSize: 11, color: "#6b7280" }}>
                    {p.telefono}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.td,
                    { flex: 1 },
                    isSmallScreen && styles.tdSmall,
                  ]}
                >
                  {p.productos}
                </Text>
                <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>
                  {p.total}
                </Text>
                <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>
                  {p.hora}
                </Text>
                <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>
                  {p.pickup}
                </Text>
                <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>
                  {p.pago}
                </Text>
                <View style={[styles.td, { flexDirection: "row" }]}>
                  <Text
                    style={{
                      fontSize: isSmallScreen ? 10 : 12,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      ...getColor(p.estado),
                    }}
                  >
                    {p.estado}
                  </Text>
                </View>
                <View style={[styles.td, { flexDirection: "row", gap: 4 }]}>
                  {p.estado !== "Completado" && (
                    <Pressable
                      onPress={() => cambiarEstado(p.id)}
                      style={{
                        backgroundColor:
                          p.estado === "Pendiente"
                            ? "#facc15"
                            : p.estado === "Preparando"
                            ? "#3b82f6"
                            : "#22c55e",
                        paddingHorizontal: isSmallScreen ? 8 : 10,
                        paddingVertical: isSmallScreen ? 4 : 6,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: isSmallScreen ? 10 : 13,
                        }}
                      >
                        {p.estado === "Pendiente"
                          ? "Confirmar"
                          : p.estado === "Preparando"
                          ? "Marcar Listo"
                          : "Completar"}
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  th: {
    flex: 1,
    fontWeight: "bold",
    color: "#0f172a",
    fontSize: 12,
  },
  thSmall: {
    fontSize: 10,
  },
  td: {
    flex: 1,
    fontSize: 12,
    color: "#0f172a",
  },
  tdSmall: {
    fontSize: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});
