import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ModalEditarProducto({
  visible,
  producto,
  onClose,
  onSave,
}) {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [precio, setPrecio] = useState(producto?.precio || "");
  const [descuento, setDescuento] = useState(producto?.descuento || "");
  const [stock, setStock] = useState(producto?.stock || "");
  const [categoria, setCategoria] = useState(producto?.categoria || "");
  const [fechaVencimiento, setFechaVencimiento] = useState(
    producto?.fechaVencimiento || ""
  );

  const handleGuardar = () => {
    const actualizado = {
      ...producto,
      nombre,
      precio,
      descuento,
      stock,
      categoria,
      fechaVencimiento,
      estado: Number(stock) > 0 ? "Activo" : "Agotado",
    };
    onSave(actualizado);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Editar Producto</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={20} color="#334155" />
            </TouchableOpacity>
          </View>
        
          <Text style={styles.label}>Nombre del Producto</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Precio ($)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={precio.toString()}
                onChangeText={setPrecio}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descuento (%)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={descuento.toString()}
                onChangeText={setDescuento}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Stock</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={stock.toString()}
                onChangeText={setStock}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Categoría</Text>
              <TextInput
                style={styles.input}
                value={categoria}
                onChangeText={setCategoria}
              />
            </View>
          </View>
          <Text style={styles.label}>Fecha de Vencimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/DD/YYYY"
            value={fechaVencimiento}
            onChangeText={setFechaVencimiento}
          />
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#22c55e" }]}
              onPress={handleGuardar}
            >
              <Text style={styles.buttonText}>Actualizar Producto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#e5e7eb" }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: "#1e293b" }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    padding: 20,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0f172a",
  },
  label: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    backgroundColor: "#f8fafc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
