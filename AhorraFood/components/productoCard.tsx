import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio_original: number;
  precio_descuento: number;
  porcentaje_descuento: number;
  cantidad_disponible: number;
  fecha_vencimiento: Date;
  imagen_url: string;
  estado: "activo" | "inactivo" | "agotado";
  ventas: number;
}

interface ProductoCardProps {
  producto: Producto;
  onEditar: (producto: Producto) => void;
  onEliminar: (productoId: string) => void;
  onCambiarEstado: (productoId: string, nuevoEstado: "activo" | "inactivo") => void;
}

export default function ProductoCard({ producto, onEditar, onEliminar, onCambiarEstado }: ProductoCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.flex2, styles.leftAlign]}>Producto</Text>

        <Text style={styles.headerText}>Precio</Text>
        <Text style={styles.headerText}>Descuento</Text>
        <Text style={styles.headerText}>Stock</Text>
        <Text style={styles.headerText}>Vendidos</Text>
        <Text style={styles.headerText}>Estado</Text>
        <Text style={styles.headerText}>Acciones</Text>
      </View>

      {/* Fila de producto */}
      <View style={styles.row}>
        {/* Producto */}
        <View style={[styles.flex2, styles.productoInfo]}>
          <Image 
            source={{ uri: producto.imagen_url }} 
            style={styles.imagen}
            defaultSource={require("@/assets/images/logooo.png")} 
          />
          <View>
            <Text style={styles.nombre}>{producto.nombre}</Text>
            <Text style={styles.categoria} numberOfLines={1}>{producto.descripcion}</Text>
          </View>
        </View>

        {/* Precio */}
        <View style={styles.celda}>
          <Text style={styles.precio}>${producto.precio_descuento.toFixed(2)}</Text>
          <Text style={styles.tachado}>${producto.precio_original.toFixed(2)}</Text>
        </View>

        {/* Descuento */}
        <View style={styles.celda}>
          <Text style={styles.descuento}>-{producto.porcentaje_descuento}%</Text>
        </View>

        {/* Stock */}
        <View style={styles.celda}>
          <Text style={[producto.cantidad_disponible === 0 && styles.stockRojo]}>
            {producto.cantidad_disponible}
          </Text>
        </View>

        {/* Vendidos */}
        <View style={styles.celda}>
          <Text>{producto.ventas}</Text>
        </View>

        {/* Estado */}
        <View style={styles.celda}>
          <View
            style={[
              styles.estado,
              {
                backgroundColor: producto.cantidad_disponible === 0 ? "#fee2e2" : 
                                producto.estado === "activo" ? "#dcfce7" : "#f3f4f6",
              },
            ]}
          >
            <Text
              style={{
                color: producto.cantidad_disponible === 0 ? "#b91c1c" : 
                      producto.estado === "activo" ? "#15803d" : "#6b7280",
                fontWeight: "bold",
              }}
            >
              {producto.cantidad_disponible === 0 ? "Agotado" : 
               producto.estado === "activo" ? "Activo" : "Inactivo"}
            </Text>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.acciones}>
          <TouchableOpacity onPress={() => onEditar(producto)}>
            <Feather name="edit" size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onCambiarEstado(
              producto.id, 
              producto.estado === "activo" ? "inactivo" : "activo"
            )}
          >
            <Feather 
              name={producto.estado === "activo" ? "eye-off" : "eye"} 
              size={18} 
              color="#1e3a8a" 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onEliminar(producto.id)}>
            <Feather name="trash" size={18} color="#dc2626" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    color: "#475569",
    fontSize: 12,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  celda: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  productoInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imagen: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 6,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#0f172a",
  },
  categoria: {
    fontSize: 12,
    color: "#64748b",
  },
  precio: {
    fontSize: 13,
    fontWeight: "500",
  },
  tachado: {
    fontSize: 11,
    color: "#64748b",
    textDecorationLine: "line-through",
  },
  descuento: {
    backgroundColor: "#fb923c",
    paddingHorizontal: 6,
    borderRadius: 8,
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  estado: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: "center",
  },
  acciones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    flex: 1,
  },
  stockRojo: {
    color: "#dc2626",
    fontWeight: "bold",
  },
  flex2: {
    flex: 2,
  },
  leftAlign: {
  textAlign: "left",
  paddingLeft: 4,
},

});
