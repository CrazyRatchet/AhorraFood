// registerC3.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function RegisterC3() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Comercio - Paso 3</Text>
        <Text style={styles.subtitle}>
          Documentos finales - Sube la documentación requerida
        </Text>

        <View style={styles.stepsContainer}>
          <View style={[styles.stepCircle, styles.completedStep]}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepCircle, styles.completedStep]}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={[styles.stepLine]} />
          <View style={[styles.stepCircle, styles.activeStep]}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Documentos Requeridos</Text>
        <Text style={styles.sectionSubtitle}>
          Sube los documentos necesarios para verificar tu negocio
        </Text>

        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={28} color="#6b7280" />
            <Text style={styles.uploadText}>
              Haz clic para subir tu licencia de funcionamiento
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={28} color="#6b7280" />
            <Text style={styles.uploadText}>
              Sube tu permiso de salud vigente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={28} color="#6b7280" />
            <Text style={styles.uploadText}>
              Sube tu registro tributario (RUC)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={styles.checkboxBox}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            {termsAccepted && <View style={styles.checkboxChecked} />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Acepto los <Text style={styles.link}>términos y condiciones</Text>{" "}
            de AhorraFood
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/registerC2")}
          >
            <Text style={styles.backButtonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, !termsAccepted && { opacity: 0.5 }]}
            disabled={!termsAccepted}
          >
            <Text style={styles.submitButtonText}>Enviar Registro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafb",
    padding: 20,
    alignItems: "center",
    gap: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 12,
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  completedStep: {
    backgroundColor: "#166534",
  },
  activeStep: {
    backgroundColor: "#166534",
  },
  stepNumber: {
    color: "white",
    fontWeight: "bold",
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: "#d1d5db",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 10,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
 uploadContainer: {
  width: "100%",
  maxWidth: 500,
  alignSelf: "center",
  gap: 16,
},
uploadBox: {
  width: "100%",
  padding: 18,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: "#d1d5db",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffff",
},

  uploadText: {
    fontSize: 13,
    color: "#374151",
    marginTop: 8,
    textAlign: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    width: 10,
    height: 10,
    backgroundColor: "#166534",
  },
  termsText: {
    fontSize: 13,
    color: "#374151",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  link: {
    color: "#166534",
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: 500,
    marginTop: 24,
    gap: 10,
  },
  backButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 14,
    color: "#333",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#166534",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
});
