import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const maxContentWidth = 1100;
  const contentWidth = Math.min(width * 0.95, maxContentWidth);

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
      <View style={[styles.container, { width: contentWidth }]}>
        <View
          style={[
            styles.columns,
            { flexDirection: "row", alignItems: "flex-start" },
          ]}
        >
          <View style={[styles.column]}>
            <Text style={styles.highlight}>Aceptar</Text>
            <Text style={styles.text}>Términos de Servicio y </Text>
            <Text style={styles.text}>Política de Privacidad</Text>
          </View>

          {width >= 768 && (
            <View style={[styles.column]}>
              <Text style={styles.highlight}>
                ¡Únete al movimiento contra el desperdicio!
              </Text>
              <Text style={styles.text}>
                Cada producto que compras ayuda a reducir el desperdicio
                alimentario y apoya a comercios locales.
              </Text>
            </View>
          )}

          <View style={[styles.column]}>
            <Text style={styles.highlight}>Contacto</Text>
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
    paddingTop: 16,
    alignItems: "center",
    width: "110%",
    marginTop: 20,
    marginHorizontal: -40,
    marginBottom: -32,
    paddingHorizontal: 20,
  },
  container: {
    alignItems: "center",
  },
  columns: {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  column: {
    flex: 1,
  },
  highlight: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",

    textAlign: "left",
  },
  text: {
    color: "#cbd5e1",
    fontSize: 12,

    textAlign: "left",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#1e293b",
    marginBottom: 10,
  },
  copyright: {
    color: "#94a3b8",
    fontSize: 11,
    textAlign: "center",
  },
});
