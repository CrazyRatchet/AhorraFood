import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function ProductoCard({ producto, onEditar, onEliminar }) {
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
          <Image source={producto.image} style={styles.imagen} />
          <View>
            <Text style={styles.nombre}>{producto.nombre}</Text>
            <Text style={styles.categoria}>{producto.categoria}</Text>
          </View>
        </View>

        {/* Precio */}
        <View style={styles.celda}>
          <Text style={styles.precio}>${producto.precio}</Text>
          <Text style={styles.tachado}>${producto.precioOriginal}</Text>
        </View>

        {/* Descuento */}
        <View style={styles.celda}>
          <Text style={styles.descuento}>-{producto.descuento}%</Text>
        </View>

        {/* Stock */}
        <View style={styles.celda}>
          <Text style={[producto.stock === 0 && styles.stockRojo]}>
            {producto.stock}
          </Text>
        </View>

        {/* Vendidos */}
        <View style={styles.celda}>
          <Text>{producto.vendidos}</Text>
        </View>

        {/* Estado */}
        <View style={styles.celda}>
          <View
            style={[
              styles.estado,
              {
                backgroundColor: producto.stock === 0 ? "#fee2e2" : "#dcfce7",
              },
            ]}
          >
            <Text
              style={{
                color: producto.stock === 0 ? "#b91c1c" : "#15803d",
                fontWeight: "bold",
              }}
            >
              {producto.stock === 0 ? "Agotado" : "Activo"}
            </Text>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.acciones}>
          <TouchableOpacity onPress={onEditar}>
            <Feather name="edit" size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="comments-o" size={18} color="#1e3a8a" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onEliminar}>
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
