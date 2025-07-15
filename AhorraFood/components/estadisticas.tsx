import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function Estadisticas() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const maxContentWidth = width >= 1100 ? 1100 : width - 32; // igual que productos
  const cardWidth = isTablet ? (maxContentWidth - 32) / 3 : maxContentWidth;

  return (
   
      <View style={[styles.inner, { width: maxContentWidth }]}>
        <View
          style={[
            styles.container,
            isTablet ? styles.containerRow : styles.containerColumn,
          ]}
        >
          <View style={[styles.card, { width: cardWidth }]}>
            <View style={styles.iconContainer}>
              <FontAwesome name="line-chart" size={28} color="#16a34a" />
            </View>
            <Text style={styles.number}>15,230</Text>
            <Text style={styles.label}>Comidas salvadas del desperdicio</Text>
          </View>

          <View style={[styles.card, { width: cardWidth }]}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="store" size={28} color="#2563eb" />
            </View>
            <Text style={styles.number}>179</Text>
            <Text style={styles.label}>Comercios activos</Text>
          </View>

          <View style={[styles.card, { width: cardWidth }]}>
            <View style={styles.iconContainer}>
              <Entypo name="medal" size={28} color="#f59e0b" />
            </View>
            <Text style={styles.number}>4.7</Text>
            <Text style={styles.label}>Calificación promedio</Text>
          </View>
        </View>
      </View>
  
  );
}

const styles = StyleSheet.create({
  
  inner: {
    maxWidth: 1100,
    marginTop:15,
  },
  container: {
    gap: 16,
    flexWrap: 'wrap',
  },
  containerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  iconContainer: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  label: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginTop: 4,
  },
});
