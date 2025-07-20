// app/productosC.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import ProductoCard from "@/components/productoCard";
import ModalEditarProducto from "@/components/editarP";

const productosIniciales = [
  {
    id: "1",
    nombre: "Arroz con Pollo",
    precioDescuento: 2.7,
    precioOriginal: 4.5,
    descuento: 40,
    stock: 15,
    vendidos: 45,
    categoria: "Platos Principales",
    fechaVencimiento: "12/30/2024",
    image: require("@/assets/images/arroz.jpg"),
  },
  {
    id: "2",
    nombre: "Bistec Encebollado",
    precioDescuento: 3.85,
    precioOriginal: 5.5,
    descuento: 30,
    stock: 8,
    vendidos: 32,
    categoria: "Platos Principales",
    fechaVencimiento: "12/25/2024",
    image: require("@/assets/images/bistec.jpg"),
  },
  {
    id: "3",
    nombre: "Pescado Frito",
    precioDescuento: 4.2,
    precioOriginal: 6,
    descuento: 30,
    stock: 0,
    vendidos: 28,
    categoria: "Mariscos",
    fechaVencimiento: "12/28/2024",
    image: require("@/assets/images/pescado.jpg"),
  },
];

export default function ProductosC() {
  const [productos, setProductos] = useState(productosIniciales);
  const [productoEditando, setProductoEditando] = useState(null);
  const router = useRouter();

  const handleEditar = (producto) => {
    setProductoEditando(producto);
  };

  const handleGuardarProducto = (actualizado) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === actualizado.id ? actualizado : p))
    );
    setProductoEditando(null);
  };

  const handleEliminar = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <Header />
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Gestión de Productos</Text>
          <Text style={styles.subtitle}>Administra tu menú y productos</Text>
        </View>
        <View style={styles.actionsRight}>
          <TouchableOpacity style={styles.commentButton}>
            <Feather name="message-square" size={16} color="#1e3a8a" />
            <Text style={styles.commentText}>Ver Comentarios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/agregarP")}
          >
            <Feather name="plus" size={16} color="white" />
            <Text style={styles.addText}>Agregar Producto</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.metricsContainer}>
        <Metric label="Total Productos" value={productos.length} />
        <Metric
          label="Activos"
          value={productos.filter((p) => p.stock > 0).length}
        />
        <Metric
          label="Stock Bajo"
          value={productos.filter((p) => p.stock === 0).length}
        />
        <Metric
          label="Total Vendidos"
          value={productos.reduce((acc, p) => acc + p.vendidos, 0)}
          color="#f59e0b"
        />
      </View>

      <View style={styles.listaContainer}>
        <Text style={styles.sectionTitle}>Lista de Productos</Text>
        
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductoCard
              producto={item}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          )}
        />
      </View>

      {productoEditando && (
        <ModalEditarProducto
          visible={!!productoEditando} // o visible={true} si quieres que siempre se muestre
          producto={productoEditando}
          onSave={handleGuardarProducto}
          onClose={() => setProductoEditando(null)}
        />
      )}
    </View>
  );
}

function Metric({ label, value, color = "#16a34a" }) {
  return (
    <View style={styles.metricCard}>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  actionsRight: {
    flexDirection: "row",
    gap: 8,
  },
  commentButton: {
    flexDirection: "row",
    backgroundColor: "#e0e7ff",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    gap: 6,
  },
  commentText: {
    color: "#1e3a8a",
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#15803d",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    gap: 6,
  },
  addText: {
    color: "white",
    fontWeight: "bold",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  metricCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "23%",
  },
  metricValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  metricLabel: {
    fontSize: 12,
    color: "#475569",
  },
  listaContainer: {
    padding: 16,
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
});
