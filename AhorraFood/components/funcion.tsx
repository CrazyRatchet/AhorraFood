import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const isDesktop = screenWidth >= 768;
const contentWidth = isDesktop ? Math.min(screenWidth * 0.95, 1100) : screenWidth - 20;
const cardWidth = isDesktop ? contentWidth / 3 - 20 : contentWidth - 20;

export default function FuncionaSection() {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { width: contentWidth }]}>
        <Text style={styles.title}>¿Cómo funciona AhorraFood?</Text>
        <Text style={styles.subtitle}>Súper fácil en 3 pasos</Text>
        <View style={styles.cardContainer}>
          <View style={[styles.card, { width: cardWidth }]}>
            <Feather name="map-pin" size={28} color="#166534" style={styles.icon} />
            <Text style={styles.cardTitle}>1. Explora</Text>
            <Text style={styles.cardText}>
              Descubre platos disponibles cerca de ti con descuentos especiales
            </Text>
          </View>
          <View style={[styles.card, { width: cardWidth }]}>
            <FontAwesome5 name="heartbeat" size={28} color="#ea580c" style={styles.icon} />
            <Text style={styles.cardTitle}>2. Ahorra</Text>
            <Text style={styles.cardText}>
              Compra comida deliciosa a precios reducidos y ayuda a reducir el desperdicio
            </Text>
          </View>
          <View style={[styles.card, { width: cardWidth }]}>
            <Feather name="clock" size={28} color="#166534" style={styles.icon} />
            <Text style={styles.cardTitle}>3. Recoge</Text>
            <Text style={styles.cardText}>
              Pasa por la fonda en el horario indicado y disfruta tu comida
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 30,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  icon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
    color: '#1f2937',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#374151',
  },
});
