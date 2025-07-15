import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
export default function FilterSidebar() {
  const [price, setPrice] = useState(10);
  const [location, setLocation] = useState("all");
  const [deliveryType, setDeliveryType] = useState("todos");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filtros</Text>
      <Text style={styles.description}>
        Permite refinar los resultados por precio, ubicación, tipo de entrega y
        fecha de vencimiento.
      </Text>

      {/* Rango de Precios */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Rango de precios</Text>
        <Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={price}
          onValueChange={setPrice}
          minimumTrackTintColor="#2E7D32"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#2E7D32"
        />
        <View style={styles.priceLabels}>
          <Text>USD 0</Text>
          <Text>USD {price}</Text>
        </View>
      </View>

      {/* Ubicación */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ubicación</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Todas las ubicaciones" value="all" />
            <Picker.Item label="Panamá" value="panama" />
            <Picker.Item label="Colón" value="colon" />
            {/* Agrega más opciones si es necesario */}
          </Picker>
        </View>
      </View>

      {/* Tipo de entrega */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tipo de entrega</Text>
        <RadioButton.Group
          onValueChange={(value) => setDeliveryType(value)}
          value={deliveryType}
        >
          <RadioButton.Item label="Todos" value="todos" color="#2E7D32" />
          <RadioButton.Item
            label="Recogida en el local"
            value="local"
            color="#2E7D32"
          />
          <RadioButton.Item
            label="Envío a domicilio"
            value="domicilio"
            color="#2E7D32"
          />
        </RadioButton.Group>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8fafc",
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 6,
  },
  picker: {
    height: 40,
    width: "100%",
  },
});
