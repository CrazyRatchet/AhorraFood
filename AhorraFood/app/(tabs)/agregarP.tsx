import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PublicarProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioOriginal, setPrecioOriginal] = useState("");
  const [precioDescuento, setPrecioDescuento] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imagen, setImagen] = useState(null);

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Información Básica */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información básica</Text>
        <Text>Nombre del producto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Arroz con Pollo Panameño"
          value={nombre}
          onChangeText={setNombre}
        />
        <Text>Descripción</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Describe los ingredientes y características especiales del platillo..."
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />
      </View>

      {/* Imagen */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Imagen del producto</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={seleccionarImagen}>
          {imagen ? (
            <Image source={{ uri: imagen }} style={{ width: 100, height: 100 }} />
          ) : (
            <Text style={{ color: '#64748b' }}>Seleccionar imagen</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Precios */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Precios y descuento</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1]}
            placeholder="$ 0.00"
            keyboardType="numeric"
            value={precioOriginal}
            onChangeText={setPrecioOriginal}
          />
          <TextInput
            style={[styles.input, styles.flex1]}
            placeholder="$ 0.00"
            keyboardType="numeric"
            value={precioDescuento}
            onChangeText={setPrecioDescuento}
          />
        </View>
      </View>

      {/* Disponibilidad */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Disponibilidad</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1]}
            placeholder="1"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
          <TouchableOpacity
            style={[styles.input, styles.flex1, { justifyContent: "center" }]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{fecha.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setFecha(selectedDate);
            }}
          />
        )}
      </View>

      {/* Botones */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.btnPublicar}>
          <Text style={{ color: "white" }}>Publicar producto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCancelar}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8fafc",
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 10,
  },
  imagePicker: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  btnPublicar: {
    backgroundColor: "#15803d",
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginRight: 6,
  },
  btnCancelar: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
});
