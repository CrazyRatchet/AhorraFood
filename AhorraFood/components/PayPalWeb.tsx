import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { PayPalOrder, PayPalPaymentResult, PayPalService } from '../funciones/paypalService';

interface PayPalWebProps {
  visible: boolean;
  order: PayPalOrder | null;
  onSuccess: (result: PayPalPaymentResult) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

const PayPalWeb: React.FC<PayPalWebProps> = ({
  visible,
  order,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!order) return null;

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Crear orden en PayPal
      const paypalOrder = await PayPalService.createOrder(order);
      
      if (Platform.OS === 'web') {
        // Para web: usar popup
        const paypalHTML = PayPalService.generatePayPalHTML(paypalOrder.id);
        const popup = window.open('', 'PayPal', 'width=500,height=700,scrollbars=yes,resizable=yes');
        
        if (popup) {
          popup.document.write(paypalHTML);
          popup.document.close();
          
          // Escuchar mensajes del popup
          const messageHandler = (event: MessageEvent) => {
            if (event.source !== popup) return;
            
            const { type, data } = event.data;
            
            switch (type) {
              case 'SUCCESS':
                popup.close();
                window.removeEventListener('message', messageHandler);
                setIsProcessing(false);
                onSuccess(data);
                break;
                
              case 'ERROR':
                popup.close();
                window.removeEventListener('message', messageHandler);
                setIsProcessing(false);
                onError(data || 'Error en el pago');
                break;
                
              case 'CANCELLED':
                popup.close();
                window.removeEventListener('message', messageHandler);
                setIsProcessing(false);
                onCancel();
                break;
            }
          };
          
          window.addEventListener('message', messageHandler);
          
          // Verificar si el popup se cerró manualmente
          const checkClosed = setInterval(() => {
            if (popup.closed) {
              clearInterval(checkClosed);
              window.removeEventListener('message', messageHandler);
              setIsProcessing(false);
              onCancel();
            }
          }, 1000);
        }
      } else {
        // Para móvil: usar WebBrowser
        const paypalUrl = paypalOrder.links?.find((link: any) => link.rel === 'approve')?.href;
        
        if (paypalUrl) {
          const result = await WebBrowser.openBrowserAsync(paypalUrl, {
            dismissButtonStyle: 'cancel',
            presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
          });
          
          setIsProcessing(false);
          
          if (result.type === 'cancel') {
            onCancel();
          } else {
            // Simular éxito para móvil
            const mockResult: PayPalPaymentResult = {
              id: paypalOrder.id,
              status: 'COMPLETED',
              payer: {
                email_address: 'user@example.com',
                name: {
                  given_name: 'Usuario',
                  surname: 'Test'
                }
              },
              purchase_units: [{
                amount: {
                  currency_code: order.currency,
                  value: order.amount.toString()
                },
                payments: {
                  captures: [{
                    id: `CAP_${Date.now()}`,
                    status: 'COMPLETED',
                    amount: {
                      currency_code: order.currency,
                      value: order.amount.toString()
                    }
                  }]
                }
              }]
            };
            
            Alert.alert(
              'Confirmar Pago',
              '¿Completaste el pago en PayPal exitosamente?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: onCancel
                },
                {
                  text: 'Sí',
                  onPress: () => onSuccess(mockResult)
                }
              ]
            );
          }
        } else {
          throw new Error('No se pudo obtener URL de PayPal');
        }
      }
    } catch (error) {
      setIsProcessing(false);
      onError(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pago con PayPal</Text>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <Feather name="x" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.orderSummary}>
            <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
            
            {order.items?.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                <Text style={styles.itemPrice}>${item.unit_amount.toFixed(2)}</Text>
              </View>
            ))}
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${order.amount.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.paymentSection}>
            <Text style={styles.paymentTitle}>🔒 Pago Seguro con PayPal</Text>
            <Text style={styles.paymentDescription}>
              Serás redirigido a PayPal para completar tu pago de forma segura.
            </Text>
          </View>

          <View style={styles.actions}>
            {isProcessing ? (
              <View style={styles.processingContainer}>
                <ActivityIndicator size="large" color="#0070f3" />
                <Text style={styles.processingText}>Procesando pago...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.payButton}
                  onPress={handlePayPalPayment}
                >
                  <Text style={styles.payButtonText}>
                    Continuar con PayPal
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  closeButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  orderSummary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6c757d',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#dee2e6',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  paymentSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  actions: {
    marginTop: 'auto',
  },
  processingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  processingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
  payButton: {
    backgroundColor: '#0070f3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PayPalWeb;
