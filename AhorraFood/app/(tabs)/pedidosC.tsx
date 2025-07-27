import Header from "@/components/Header";
import Footer from "@/components/footer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { collection, doc, getDoc, getDocs, increment, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

import Toast from 'react-native-toast-message';

interface Pedido {
  id: string;
  cliente: string;
  telefono: string;
  productos: string;
  total: string;
  hora: string;
  pickup: string;
  pago: string;
  estado: string;
}


export default function PedidosC() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isUpdating, setIsUpdating] = useState<string>("");
  const prevEstados = useRef<Record<string, string>>({});


  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  useEffect(() => {
    const q = query(collection(db, "pedidos"), orderBy("fechaPedido", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pedidosFirestore: Pedido[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        const productosArray = data.productos
          ? Object.values(data.productos).map(
            (prod: any) => `${prod.nombre} x${prod.cantidad}`
          )
          : [];

        const totalNum = typeof data.total === "number" ? data.total : 0;

        let horaStr = "";
        if (data.fechaPedido && (data.fechaPedido as Timestamp).seconds) {
          const fecha = new Date((data.fechaPedido as Timestamp).seconds * 1000);
          horaStr = fecha.toLocaleTimeString();
        }

        return {
          id: doc.id,
          cliente: typeof data.usuario === "string" ? data.usuario : "Cliente",
          telefono: "",
          productos: productosArray.join(", "),
          total: `$${totalNum.toFixed(2)}`,
          hora: horaStr,
          pickup: data.negocio || "",
          pago: typeof data.metodoPago === "string" ? data.metodoPago : "",
          estado: typeof data.estado === "string" ? data.estado : "pendiente",
        };
      });

      // Detectar cambios de estado para notificaciones
      pedidosFirestore.forEach((p) => {
        const estadoPrevio = prevEstados.current[p.id];

        // Notificar cuando cambia a "listo"
        if (p.estado.toLowerCase() === "listo" && estadoPrevio !== "listo") {
          Toast.show({
            type: 'success',
            text1: 'Pedido listo',
            text2: `El pedido de ${p.cliente} está listo para recoger.`,
            position: 'top',
            visibilityTime: 4000,
          });
        }

        // Notificar cuando el usuario confirma la recogida
        if (p.estado.toLowerCase() === "completado" && estadoPrevio === "listo") {
          Toast.show({
            type: 'success',
            text1: 'Pedido completado',
            text2: `${p.cliente} confirmó que recogió su pedido.`,
            position: 'top',
            visibilityTime: 4000,
          });
        }

        prevEstados.current[p.id] = p.estado;
      });

      setPedidos(pedidosFirestore);
    });

    return () => unsubscribe();
  }, []);

  const cambiarEstado = async (id: string) => {
    try {
      setIsUpdating(id);

      const pedido = pedidos.find(p => p.id === id);
      if (!pedido) return;

      let nuevoEstado = "";
      switch (pedido.estado.toLowerCase()) {
        case "pendiente":
          nuevoEstado = "preparando";
          break;
        case "preparando":
          nuevoEstado = "listo";
          break;
        case "listo":
          nuevoEstado = "completado";
          break;
        default:
          setIsUpdating("");
          return;
      }

      const docRef = doc(db, "pedidos", id);
      const updateData: any = { estado: nuevoEstado };

      if (nuevoEstado === "completado") {
        updateData.fechaRecogida = new Date();
        updateData.completadoPor = "comercio";

        const pedidoSnap = await getDoc(docRef);
        const pedidoDoc = pedidoSnap.data();

        const negocioNombre = pedidoDoc?.negocio;
        const totalPedido = typeof pedidoDoc?.total === "number" ? pedidoDoc.total : 0;

        // Buscar el documento del comercio por nombreNegocio
        const comercioSnap = await getDoc(docRef); // esto lo puedes quitar si ya tienes pedidoDoc
        const q = query(collection(db, "comercio"));
        const snapshot = await getDocs(q);

        const negocioDoc = snapshot.docs.find(
          (d) => d.data().nombreNegocio === negocioNombre
        );

        if (negocioDoc) {
          const comercioRef = doc(db, "comercio", negocioDoc.id);
          await updateDoc(comercioRef, {
            ventasTotales: increment(1),
            ingresosTotales: increment(totalPedido),
          });

          await AsyncStorage.setItem("pedidoCompletado", "true");
        } else {
          console.warn("No se encontró el negocio con nombre:", negocioNombre);
        }
      }



      await updateDoc(docRef, updateData);

      Toast.show({
        type: "success",
        text1: "Estado actualizado",
        text2:
          nuevoEstado === "completado"
            ? "El pedido se ha marcado como completado."
            : nuevoEstado === "listo"
              ? "Pedido listo - Cliente será notificado"
              : "Pedido en preparación",
        position: "bottom",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      Alert.alert("Error", "No se pudo actualizar el estado del pedido");
    } finally {
      setIsUpdating("");
    }
  };



  const cancelarPedido = async (id: string) => {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    Alert.alert(
      "Cancelar pedido",
      `¿Estás seguro que deseas cancelar el pedido de ${pedido.cliente}?`,
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: async () => {
            try {
              setIsUpdating(id);

              const docRef = doc(db, "pedidos", id);
              await updateDoc(docRef, {
                estado: "cancelado",
                fechaCancelacion: new Date(),
                canceladoPor: "comercio"
              });

              Toast.show({
                type: 'error',
                text1: 'Pedido cancelado',
                text2: `El pedido de ${pedido.cliente} ha sido cancelado.`,
                position: 'bottom',
                visibilityTime: 3000,
              });

            } catch (error) {
              console.error("Error al cancelar pedido:", error);
              Alert.alert("Error", "No se pudo cancelar el pedido");
            } finally {
              setIsUpdating("");
            }
          }
        }
      ]
    );
  };

  const resumen = pedidos.reduce(
    (acc, p) => {
      acc.Total++;
      const estado = p.estado.charAt(0).toUpperCase() + p.estado.slice(1).toLowerCase();
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    },
    {
      Total: 0,
      Pendiente: 0,
      Preparando: 0,
      Listo: 0,
      Completado: 0,
      Cancelado: 0,
    }
  );

  const getColor = (estado: string) => {
    const estadoLower = estado.toLowerCase();
    switch (estadoLower) {
      case "pendiente":
        return { backgroundColor: "#fde68a", color: "#92400e" };
      case "preparando":
        return { backgroundColor: "#fef08a", color: "#92400e" };
      case "listo":
        return { backgroundColor: "#dbeafe", color: "#1e40af" };
      case "completado":
        return { backgroundColor: "#bbf7d0", color: "#166534" };
      case "cancelado":
        return { backgroundColor: "#fecaca", color: "#dc2626" };
      default:
        return { backgroundColor: "#e5e7eb", color: "#374151" };
    }
  };

  const getButtonText = (estado: string) => {
    const estadoLower = estado.toLowerCase();
    switch (estadoLower) {
      case "pendiente":
        return "Confirmar";
      case "preparando":
        return "Marcar Listo";
      case "listo":
        return "Completar"; // ← Aquí el cambio
      default:
        return "";
    }
  };


  const getButtonColor = (estado: string) => {
    const estadoLower = estado.toLowerCase();
    switch (estadoLower) {
      case "pendiente":
        return "#facc15";
      case "preparando":
        return "#3b82f6";
      case "listo":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const canChangeState = (estado: string) => {
    const estadoLower = estado.toLowerCase();
    return estadoLower === "pendiente" || estadoLower === "preparando" || estadoLower === "listo";
  };

  const canCancel = (estado: string) => {
    const estadoLower = estado.toLowerCase();
    return estadoLower === "pendiente" || estadoLower === "preparando" || estadoLower === "listo";
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

          {/* Información importante */}
          <View style={{
            backgroundColor: "#e0f2fe",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            borderLeftWidth: 4,
            borderLeftColor: "#0ea5e9"
          }}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#0369a1", marginBottom: 4 }}>
              ℹ️ Información importante
            </Text>
            <Text style={{ fontSize: 12, color: "#0369a1" }}>
              Una vez que marques un pedido como Listo, el cliente debe confirmar que lo recogió.
              Solo entonces se marcará como Completado automáticamente.
            </Text>
          </View>

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
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: key === "Cancelado" ? "#dc2626" : "#16a34a"
                  }}
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
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Pedido</Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Cliente</Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Productos</Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Total</Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Hora</Text>
              {/* <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Negocio</Text>  <-- Eliminado */}
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Pago</Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Estado</Text>
              <Text style={[styles.th, isSmallScreen && styles.thSmall]}>Acciones</Text>
            </View>

            {/* Filas */}
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
                  #{p.id.slice(-6)}
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
                  <Text style={{ fontSize: 11, color: "#6b7280" }}>{p.telefono}</Text>
                </View>
                <Text style={[styles.td, { flex: 1 }, isSmallScreen && styles.tdSmall]}>
                  {p.productos}
                </Text>
                <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>{p.total}</Text>
                <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>{p.hora}</Text>
                {/* <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>{p.pickup}</Text>  <-- Eliminado */}
                <Text style={[styles.td, isSmallScreen && styles.tdSmall]}>{p.pago}</Text>
                <View style={[styles.td, { flexDirection: "row" }]}>
                  <Text
                    style={{
                      fontSize: isSmallScreen ? 10 : 12,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      ...getColor(p.estado),
                      textTransform: "capitalize",
                    }}
                  >
                    {p.estado}
                  </Text>
                </View>
                <View style={[styles.td, { flexDirection: "row", gap: 4, flex: 1.2 }]}>
                  {/* Botón principal de cambio de estado */}
                  {canChangeState(p.estado) && (
                    <Pressable
                      onPress={() => cambiarEstado(p.id)}
                      disabled={isUpdating === p.id}
                      style={{
                        backgroundColor: isUpdating === p.id ? "#9ca3af" : getButtonColor(p.estado),
                        paddingHorizontal: isSmallScreen ? 8 : 10,
                        paddingVertical: isSmallScreen ? 4 : 6,
                        borderRadius: 6,
                        opacity: isUpdating === p.id ? 0.7 : 1,
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: isSmallScreen ? 10 : 12,
                          textAlign: "center",
                          fontWeight: "bold"
                        }}
                      >
                        {isUpdating === p.id ? "..." : getButtonText(p.estado)}
                      </Text>
                    </Pressable>
                  )}

                  {/* Botón de cancelar */}
                  {canCancel(p.estado) && (
                    <Pressable
                      onPress={() => cancelarPedido(p.id)}
                      disabled={isUpdating === p.id}
                      style={{
                        backgroundColor: isUpdating === p.id ? "#9ca3af" : "#dc2626",
                        paddingHorizontal: isSmallScreen ? 6 : 8,
                        paddingVertical: isSmallScreen ? 4 : 6,
                        borderRadius: 6,
                        opacity: isUpdating === p.id ? 0.7 : 1,
                        minWidth: isSmallScreen ? 40 : 50,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: isSmallScreen ? 10 : 12,
                          textAlign: "center",
                          fontWeight: "bold"
                        }}
                      >
                        {isUpdating === p.id ? "..." : "❌"}
                      </Text>
                    </Pressable>
                  )}

                  {/* Mostrar estado final para completados y cancelados */}
                  {(p.estado.toLowerCase() === "completado" || p.estado.toLowerCase() === "cancelado") && (
                    <View style={{
                      backgroundColor: p.estado.toLowerCase() === "completado" ? "#bbf7d0" : "#fecaca",
                      paddingHorizontal: isSmallScreen ? 8 : 10,
                      paddingVertical: isSmallScreen ? 4 : 6,
                      borderRadius: 6,
                      flex: 1,
                    }}>
                      <Text style={{
                        color: p.estado.toLowerCase() === "completado" ? "#166534" : "#dc2626",
                        fontSize: isSmallScreen ? 10 : 12,
                        fontWeight: "bold",
                        textAlign: "center"
                      }}>
                        {p.estado.toLowerCase() === "completado" ? "✅" : "❌"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Footer />
      <Toast />
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