import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";

interface FiltroProps {
  onFilterChange: (filtros: {
    precioMin: number;
    precioMax: number;
    recogida: boolean;
    domicilio: boolean;
    orden: string;
  }) => void;
}

export default function Filtro({ onFilterChange }: FiltroProps) {
  const [price, setPrice] = useState(10);
  const [location, setLocation] = useState("all");
  const [deliveryType, setDeliveryType] = useState<"todos" | "local" | "domicilio">("todos");
  const [order, setOrder] = useState("precio_asc");
  const [showFilters, setShowFilters] = useState(false);

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  useEffect(() => {
    let recogida = false;
    let domicilio = false;

    if (deliveryType === "todos") {
      recogida = true;
      domicilio = true;
    } else if (deliveryType === "local") {
      recogida = true;
      domicilio = false;
    } else if (deliveryType === "domicilio") {
      recogida = false;
      domicilio = true;
    }

    console.log("Filtro aplicado:", { precioMin: 0, precioMax: price, recogida, domicilio, orden: order });

    onFilterChange({
      precioMin: 0,
      precioMax: price,
      recogida,
      domicilio,
      orden: order,
    });
  }, [price, deliveryType, order]);

  return (
    <View style={styles.container}>
      {isMobile && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.toggleButtonText}>
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </Text>
          <Text style={{ color: "#64748b", fontSize: 16 }}>
            {showFilters ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      )}

      {(!isMobile || showFilters) && (
        <>
          <Text style={styles.header}>Filtros</Text>
          <Text style={styles.description}>
            Permite refinar los resultados por precio, ubicación, tipo de entrega y fecha de vencimiento.
          </Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Rango de precios</Text>
            <Slider
              style={{ width: "100%" }}
              minimumValue={0}
              maximumValue={30}
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

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Ubicación</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={location}
                onValueChange={setLocation}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Todas las ubicaciones" value="all" />
                <Picker.Item label="Panamá" value="Panamá" />
                <Picker.Item label="Colón" value="Colón" />
              </Picker>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Tipo de entrega</Text>
            <RadioButton.Group
              onValueChange={(value) => {
                // Casteo seguro con check explícito para evitar warning TS
                if (value === "todos" || value === "local" || value === "domicilio") {
                  setDeliveryType(value);
                }
              }}
              value={deliveryType}
            >
              <RadioButton.Item label="Todos" value="todos" color="#2E7D32" />
              <RadioButton.Item label="Recogida en el local" value="local" color="#2E7D32" />
              <RadioButton.Item label="Envío a domicilio" value="domicilio" color="#2E7D32" />
            </RadioButton.Group>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f8fafc",
    flex: 1,
    borderRadius: 9,
    marginBottom: 10,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  toggleButtonText: {
    color: "#1e293b",
    fontSize: 16,
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
    height: 40,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: Platform.OS === "web" ? 40 : 50,
    fontSize: 14,
  },
  pickerItem: {
    fontSize: 14,
    height: 40,
  },
});