import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  useWindowDimensions,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function InfoComercio({ comercio, productosSimilares }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [show, setShow] = useState(!isMobile);

  const toggleShow = () => {
    LayoutAnimation.easeInEaseOut();
    setShow(!show);
  };

  return (
    <View style={[styles.container, isMobile && styles.mobileContainer]}>
      {isMobile && (
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleShow}>
          <Text style={styles.dropdownText}>
            {show
              ? "Ocultar información del comercio"
              : "Mostrar información del comercio"}
          </Text>
          <Feather
            name={show ? "chevron-up" : "chevron-down"}
            size={20}
            color="#1e293b"
          />
        </TouchableOpacity>
      )}

      {show && (
        <>
          {/* Información del comercio */}
          <View style={styles.card}>
            <Text style={styles.header}>Información del Comercio</Text>
            <Text style={styles.name}>{comercio.nombre}</Text>
            <View style={styles.row}>
              <FontAwesome name="map-marker" size={14} color="#64748b" />
              <Text style={styles.text}>{comercio.direccion}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="phone" size={14} color="#64748b" />
              <Text style={styles.text}>{comercio.telefono}</Text>
            </View>
            <View style={styles.row}>
              {[...Array(5)].map((_, i) => (
                <FontAwesome
                  key={i}
                  name={i < Math.round(comercio.rating) ? "star" : "star-o"}
                  size={16}
                  color="#facc15"
                  style={{ marginRight: 2 }}
                />
              ))}
              <Text style={styles.ratingText}>{comercio.rating} estrellas</Text>
            </View>
          </View>

          {/* Sección de queja */}
          <View style={styles.card}>
            <Text style={styles.header}>¿Algún problema?</Text>
            <TouchableOpacity style={styles.quejaButton}>
              <Feather name="flag" size={16} color="red" />
              <Text style={styles.quejaText}>Enviar Queja</Text>
            </TouchableOpacity>
            <Text style={styles.helpText}>
              Tu queja será enviada directamente al equipo de administración.
            </Text>
          </View>

          {/* Productos similares */}
          <View style={styles.card}>
            <Text style={styles.header}>Productos Similares</Text>
            {productosSimilares.map((item, index) => (
              <View key={index} style={styles.similarItem}>
                <Image source={item.image} style={styles.similarImage} />
                <View>
                  <Text style={styles.name}>{item.nombre}</Text>
                  <Text style={styles.text}>${item.precio}</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
    width: "100%",
    maxWidth: 320,
    alignSelf: "flex-start",
  },
  mobileContainer: {
    width: "100%",
    maxWidth: "100%",
    paddingHorizontal: 16,
  },
  dropdownButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginVertical: 2,
  },
  text: {
    fontSize: 13,
    color: "#334155",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#334155",
  },
  quejaButton: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 6,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginBottom: 6,
  },
  quejaText: {
    color: "red",
    fontWeight: "600",
  },
  helpText: {
    fontSize: 12,
    color: "#64748b",
  },
  similarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 6,
  },
  similarImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
});
