import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { subirProducto, validarProducto } from "../../funciones/productos";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function PublicarProducto() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioOriginal, setPrecioOriginal] = useState("");
  const [precioDescuento, setPrecioDescuento] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [fecha, setFecha] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  ); // Mañana por defecto
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imagen, setImagen] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Se necesitan permisos para acceder a la galería");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagen(result.assets[0].uri);
    }
  };

  const handlePublicar = async () => {
    if (isSubmitting) return;

    // Validar datos
    const productData = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precioOriginal: parseFloat(precioOriginal) || 0,
      precioDescuento:
        precioDescuento && precioDescuento.trim()
          ? parseFloat(precioDescuento)
          : undefined,
      cantidad: parseInt(cantidad) || 0,
      fechaVencimiento: fecha,
    };

    const errores = validarProducto(productData);

    if (errores.length > 0) {
      const mensaje = errores.join("\n");
      if (Platform.OS === "web") {
        window.alert(`Errores de validación:\n${mensaje}`);
      } else {
        Alert.alert("Errores de validación", mensaje);
      }
      return;
    }

    if (!imagen) {
      const mensaje = "Por favor selecciona una imagen para el producto";
      if (Platform.OS === "web") {
        window.alert(mensaje);
      } else {
        Alert.alert("Error", mensaje);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const resultado = await subirProducto(productData, imagen);

      if (resultado.success) {
        const mensaje = "Tu producto ha sido publicado exitosamente";

        const limpiarYNavegar = () => {
          setNombre("");
          setDescripcion("");
          setPrecioOriginal("");
          setPrecioDescuento("");
          setCantidad("1");
          setFecha(new Date(Date.now() + 24 * 60 * 60 * 1000));
          setImagen(null);
          router.push("/productosC");
        };

        if (Platform.OS === "web") {
          window.alert(mensaje);
          limpiarYNavegar();
        } else {
          Alert.alert("¡Éxito!", mensaje, [
            {
              text: "OK",
              onPress: limpiarYNavegar,
            },
          ]);
        }
      }
    } catch (error: any) {
      const mensaje = error.message || "No se pudo publicar el producto";
      if (Platform.OS === "web") {
        window.alert(`Error: ${mensaje}`);
      } else {
        Alert.alert("Error", mensaje);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancelar = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "¿Estás seguro de que quieres cancelar?"
      );
      if (confirmed) {
        router.replace("/dashboardComercio");
      }
    } else {
      Alert.alert(
        "Cancelar",
        "¿Estás seguro de que quieres cancelar? Se perderán todos los datos ingresados.",
        [
          { text: "No", style: "cancel" },
          {
            text: "Sí",
            onPress: () => router.replace("/dashboardComercio"),
            style: "destructive",
          },
        ]
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {/* Información Básica */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Información básica</Text>
            <Text style={styles.label}>Nombre del producto *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Arroz con Pollo Panameño"
              value={nombre}
              onChangeText={setNombre}
              editable={!isSubmitting}
            />
            <Text style={styles.label}>Descripción *</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Describe los ingredientes y características especiales del platillo..."
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              editable={!isSubmitting}
            />
          </View>

          {/* Imagen */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Imagen del producto *</Text>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={seleccionarImagen}
              disabled={isSubmitting}
            >
              {imagen ? (
                <Image source={{ uri: imagen }} style={styles.previewImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>📷</Text>
                  <Text style={styles.imagePlaceholderText}>
                    Seleccionar imagen
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Precios */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Precio *</Text>
            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Precio normal *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="$ 0.00"
                  keyboardType="numeric"
                  value={precioOriginal}
                  onChangeText={setPrecioOriginal}
                  editable={!isSubmitting}
                />
              </View>
              <View style={styles.flex1}>
                <Text style={styles.label}>
                  Precio con descuento (opcional)
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="$ 0.00 (opcional)"
                  keyboardType="numeric"
                  value={precioDescuento}
                  onChangeText={setPrecioDescuento}
                  editable={!isSubmitting}
                />
              </View>
            </View>
            {precioOriginal &&
              precioDescuento &&
              parseFloat(precioDescuento) > 0 &&
              parseFloat(precioOriginal) > parseFloat(precioDescuento) && (
                <Text style={styles.discountText}>
                  Descuento:{" "}
                  {Math.round(
                    ((parseFloat(precioOriginal) -
                      parseFloat(precioDescuento)) /
                      parseFloat(precioOriginal)) *
                      100
                  )}
                  %
                </Text>
              )}
          </View>

          {/* Disponibilidad */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Disponibilidad *</Text>
            <View style={styles.row}>
              <View style={styles.flex1}>
                <Text style={styles.label}>Cantidad disponible</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1"
                  keyboardType="numeric"
                  value={cantidad}
                  onChangeText={setCantidad}
                  editable={!isSubmitting}
                />
              </View>
              <View style={styles.flex1}>
                <Text style={styles.label}>Fecha de vencimiento</Text>
                <TouchableOpacity
                  style={[styles.input, { justifyContent: "center" }]}
                  onPress={() => setShowDatePicker(true)}
                  disabled={isSubmitting}
                >
                  <Text style={styles.dateText}>
                    {fecha.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={fecha}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setFecha(selectedDate);
                }}
              />
            )}
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.btnPublicar, isSubmitting && { opacity: 0.5 }]}
              onPress={handlePublicar}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.btnPublicarText}>Publicar producto</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={handleCancelar}
              disabled={isSubmitting}
            >
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8fafc",
    flex: 1,
  },
  wrapper: {
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
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
    color: "#1f2937",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
  },
  imagePicker: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#64748b",
    fontSize: 16,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  discountText: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#374151",
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 20,
    marginTop: 8,
  },
  btnPublicar: {
    backgroundColor: "#15803d",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  btnPublicarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  btnCancelar: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  btnCancelarText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
  },
});
