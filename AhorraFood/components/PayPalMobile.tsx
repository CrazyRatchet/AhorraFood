import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  Linking,
  AppState,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { PayPalOrder, PayPalPaymentResult, PayPalService } from '../funciones/paypalService';

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
  const [isLoading, setIsLoading] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState<string>('');
  const [hasProcessedPayment, setHasProcessedPayment] = useState(false);
  const appStateRef = useRef(AppState.currentState);
  const linkingSubscriptionRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  if (!order) return null;

  // Reset states when modal closes
  useEffect(() => {
    if (!visible) {
      setIsLoading(false);
      setPaypalOrderId('');
      setHasProcessedPayment(false);
      
      // Limpiar listeners y timeouts
      if (linkingSubscriptionRef.current) {
        linkingSubscriptionRef.current.remove();
        linkingSubscriptionRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [visible]);

  // Setup deep link listener para detectar retorno de PayPal
  useEffect(() => {
    if (!isLoading || !paypalOrderId) return;

    const handleDeepLink = async (url: string) => {
      if (hasProcessedPayment) return;

      if (url.includes('ahorrafood://payment/success')) {
        setHasProcessedPayment(true);
        setIsLoading(false);
        
        try {
          const captureResult = await PayPalService.captureOrder(paypalOrderId);
          onSuccess(captureResult);
        } catch (error) {
          onError('Error al capturar el pago');
        }
      } else if (url.includes('ahorrafood://payment/cancel')) {
        setHasProcessedPayment(true);
        setIsLoading(false);
        onCancel();
      }
    };

    // Listener para URLs entrantes
    const handleUrlEvent = (event: { url: string }) => {
      handleDeepLink(event.url);
    };

    // Listener para cambios de estado de la app
    const handleAppStateChange = async (nextAppState: any) => {
      if (nextAppState === 'active' && appStateRef.current !== 'active') {
        // La app volvió al primer plano, verificar URL inicial
        try {
          const initialUrl = await Linking.getInitialURL();
          if (initialUrl) {
            handleDeepLink(initialUrl);
          }
        } catch (error) {
          // Ignorar errores de URL inicial
        }
      }
      appStateRef.current = nextAppState;
    };

    // Registrar listeners
    linkingSubscriptionRef.current = Linking.addEventListener('url', handleUrlEvent);
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    // Cleanup
    return () => {
      if (linkingSubscriptionRef.current) {
        linkingSubscriptionRef.current.remove();
      }
      appStateSubscription?.remove();
    };
  }, [isLoading, paypalOrderId, hasProcessedPayment, onSuccess, onError, onCancel]);

  // Timeout de seguridad para evitar carga infinita
  useEffect(() => {
    if (isLoading && paypalOrderId) {
      timeoutRef.current = setTimeout(async () => {
        if (hasProcessedPayment) return;
        
        setIsLoading(false);
        
        // Intentar verificar el pago una última vez antes de timeout
        try {
          const captureResult = await PayPalService.captureOrder(paypalOrderId);
          setHasProcessedPayment(true);
          onSuccess(captureResult);
        } catch (error) {
          onError('El pago ha excedido el tiempo límite. Si completaste el pago, verifica tu historial.');
        }
      }, 300000); // 5 minutos
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isLoading, paypalOrderId, hasProcessedPayment, onSuccess, onError]);

  const handlePayPalPayment = async () => {
    if (isLoading || hasProcessedPayment) return;
    
    setIsLoading(true);
    setHasProcessedPayment(false);
    
    try {
      // Crear orden en PayPal
      const paypalOrder = await PayPalService.createOrder(order);
      setPaypalOrderId(paypalOrder.id);
      
      // Buscar la URL de aprobación
      const approvalUrl = paypalOrder.links?.find((link: any) => link.rel === 'approve')?.href;
      
      if (!approvalUrl) {
        throw new Error('No se pudo obtener URL de PayPal');
      }
      
      // Abrir PayPal con expo-web-browser (más confiable para detección de cierre)
      const result = await WebBrowser.openBrowserAsync(approvalUrl, {
        dismissButtonStyle: 'close',
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
        controlsColor: '#0070ba',
        showTitle: false,
        toolbarColor: '#ffffff',
        secondaryToolbarColor: '#f7f7f7',
        enableBarCollapsing: false,
        showInRecents: false,
      });

      setIsLoading(false);

      if (result.type === 'cancel') {
        setHasProcessedPayment(true);
        onCancel();
      } else if (result.type === 'dismiss') {
        // El usuario cerró el navegador - verificar el estado del pago
        if (hasProcessedPayment) return;
        
        setHasProcessedPayment(true);
        
        try {
          // Pequeña pausa para asegurar que PayPal procesó el pago
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const captureResult = await PayPalService.captureOrder(paypalOrder.id);
          onSuccess(captureResult);
        } catch (captureError) {
          // Si falla la captura, asumir cancelación
          onCancel();
        }
      }
      
    } catch (error) {
      setIsLoading(false);
      setHasProcessedPayment(false);
      onError(error instanceof Error ? error.message : 'Error al abrir PayPal');
    }
  };

  const handleClose = () => {
    if (isLoading) {
      Alert.alert(
        'Pago en proceso',
        'El pago está siendo procesado en PayPal. ¿Quieres cancelar?',
        [
          {
            text: 'Esperar',
            style: 'cancel'
          },
          {
            text: 'Cancelar',
            onPress: () => {
              setIsLoading(false);
              onCancel();
            }
          }
        ]
      );
    } else {
      onCancel();
    }
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

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.paymentCard}>
            <Text style={styles.title}>💳 Pago con PayPal</Text>
            <Text style={styles.subtitle}>Serás redirigido al navegador para completar el pago</Text>
            
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Resumen del pedido:</Text>
              {order.items?.map((item, index) => (
                <View key={index} style={styles.summaryItem}>
                  <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
                  <Text style={styles.itemPrice}>${item.unit_amount.toFixed(2)}</Text>
                </View>
              ))}
              <View style={[styles.summaryItem, styles.totalItem]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>${order.amount.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>📱 Cómo funciona:</Text>
              <Text style={styles.infoText}>
                1. Presiona "Continuar con PayPal"{'\n'}
                2. Se abrirá PayPal en tu navegador{'\n'}
                3. Completa el pago en PayPal{'\n'}
                4. Automáticamente regresarás a la app{'\n'}
                5. ¡Tu pedido será confirmado!
              </Text>
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0070ba" />
                <Text style={styles.loadingText}>
                  Procesando pago con PayPal...{'\n'}Regresarás automáticamente al completar
                </Text>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.paypalButton}
                onPress={handlePayPalPayment}
              >
                <Text style={styles.paypalButtonText}>
                  💳 Continuar con PayPal
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderSummary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 8,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0070ba',
  },
  infoBox: {
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#0070ba',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0070ba',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#0070ba',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  paypalButton: {
    backgroundColor: '#0070ba',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  paypalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
