import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isMobile = width < 600;

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        {/* Sección de columnas */}
        <View style={[styles.columns, isMobile && styles.columnsMobile]}>
          <View style={styles.column}>
            <Text style={styles.heading}>Aceptar</Text>
            <Text style={styles.text}>Términos de Servicio</Text>
            <Text style={styles.text}>Política de Privacidad</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.heading}>Contacto</Text>
            <Text style={styles.text}>
              ¿Tienes preguntas? Contáctanos en info@ahorrafood.com
            </Text>
          </View>
        </View>

        <View style={styles.separator} />
        <Text style={styles.copyright}>
          © 2024 AhorraFood. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#0f172a",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 1100,
    justifyContent: "space-between",
  },
  contentMobile: {
    alignItems: "center",
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 20,
  },
  columnsMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  column: {
    flex: 1,
    minWidth: 160,
  },
  heading: {
    color: "#f9fafb",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 6,
  },
  text: {
    color: "#cbd5e1",
    fontSize: 12,
    lineHeight: 18,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#1e293b",
    marginTop: 10,
    marginBottom: 10,
  },
  copyright: {
    color: "#94a3b8",
    fontSize: 11,
    textAlign: "center",
  },
});
