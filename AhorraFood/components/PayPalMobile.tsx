import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import { PayPalOrder, PayPalPaymentResult, PayPalService } from '../funciones/paypalService';
import { PAYPAL_CONFIG } from '../constants/PayPalConfig';

interface PayPalMobileProps {
  visible: boolean;
  order: PayPalOrder | null;
  onSuccess: (result: PayPalPaymentResult) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export default function PayPalMobile({
  visible,
  order,
  onSuccess,
  onError,
  onCancel,
}: PayPalMobileProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [webViewKey, setWebViewKey] = useState(0);
  const [paypalHTML, setPaypalHTML] = useState<string>('');

  if (!order) return null;

  // Generate PayPal HTML when component loads
  useEffect(() => {
    const generateHTML = async () => {
      try {
        const paypalOrder = await PayPalService.createOrder(order);
        const html = PayPalService.generatePayPalHTML(paypalOrder.id);
        setPaypalHTML(html);
      } catch (error) {
        onError('Error al crear orden de PayPal');
      }
    };
    
    if (visible) {
      generateHTML();
    }
  }, [visible, order]);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'SUCCESS') {
        onSuccess(data.data);
      } else if (data.type === 'ERROR') {
        onError(data.data || 'Error en el pago');
      } else if (data.type === 'CANCELLED') {
        onCancel();
      }
    } catch (error) {
      onError('Error procesando respuesta de PayPal');
    }
  };

  const handleWebViewError = (error: any) => {
    Alert.alert(
      'Error de conexión',
      'No se pudo cargar PayPal. ¿Quieres intentar de nuevo?',
      [
        {
          text: 'Reintentar',
          onPress: () => {
            setWebViewKey(prev => prev + 1);
            setIsLoading(true);
          }
        },
        {
          text: 'Cancelar',
          onPress: onCancel,
          style: 'cancel'
        }
      ]
    );
  };

  const handleWebViewLoadEnd = () => {
    setIsLoading(false);
  };

  const handleClose = () => {
    Alert.alert(
      'Cancelar pago',
      '¿Estás seguro de que quieres cancelar el pago?',
      [
        {
          text: 'No, continuar',
          style: 'cancel'
        },
        {
          text: 'Sí, cancelar',
          onPress: onCancel
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Feather name="x" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PayPal - ${order.amount.toFixed(2)}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>🔄 Cargando PayPal...</Text>
          </View>
        )}

        {/* WebView */}
        <WebView
          key={webViewKey}
          source={{ html: paypalHTML }}
          style={styles.webview}
          onMessage={handleWebViewMessage}
          onError={handleWebViewError}
          onLoadEnd={handleWebViewLoadEnd}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          bounces={false}
          scrollEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
          userAgent="Mozilla/5.0 (Mobile; PayPal/AhorraFood) AppleWebKit/537.36"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0070ba',
    paddingTop: Platform.OS === 'ios' ? 50 : 12,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#0070ba',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 8,
  },
  webview: {
    flex: 1,
  },
});
