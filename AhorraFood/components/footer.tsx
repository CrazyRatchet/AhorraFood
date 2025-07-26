import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Footer() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isDesktop = width >= 768;
  const maxContentWidth = 1100;
  const contentWidth = isDesktop ? Math.min(width * 0.95, maxContentWidth) : width - 20;

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
      <View style={[styles.container, { width: contentWidth }]}>
        <View style={[styles.columns, { flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'flex-start' : 'center' }]}>
          <View style={[styles.column, { marginBottom: isDesktop ? 0 : 16 }]}>
            <Text style={styles.heading}>AhorraFood</Text>
            <Text style={[styles.text, { textAlign: isDesktop ? 'left' : 'center' }]}>
              Mata el hambre, salva el bolsillo, hacerlo con AhorraFood es sencillo.
            </Text>
          </View>

          <View style={[styles.column, { marginBottom: isDesktop ? 0 : 16 }]}>
            <Text style={styles.highlight}>¡Únete al movimiento contra el desperdicio!</Text>
            <Text style={[styles.text, { textAlign: isDesktop ? 'left' : 'center' }]}>
              Cada producto que compras ayuda a reducir el desperdicio alimentario y apoya a comercios locales.
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.heading}>Contacto</Text>
            <Text style={[styles.text, { textAlign: isDesktop ? 'left' : 'center' }]}>
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
    backgroundColor: '#0f172a',
    paddingTop: 16,
    alignItems: 'center',
    width: '110%',
    marginTop: 20,
    marginHorizontal: -40,// Contrarresta el padding: 16 del contenedor padre
    marginBottom: -32,     // Contrarresta el paddingBottom: 32 del contenedor padre
    paddingHorizontal: 20, // Mantiene el padding interno para el contenido

  },
  container: {
    alignItems: 'center',
  },
  columns: {
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  heading: {
    color: '#f9fafb',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 6,
  },
  highlight: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    color: '#cbd5e1',
    fontSize: 12,
    lineHeight: 18,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#1e293b',
    marginBottom: 10,
  },
  copyright: {
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'center',
  },
});