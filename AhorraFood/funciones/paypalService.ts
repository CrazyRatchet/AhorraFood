import { PAYPAL_CONFIG } from '../constants/PayPalConfig';

export interface PayPalOrder {
  id: string;
  amount: number;
  currency: string;
  description: string;
  items?: Array<{
    name: string;
    quantity: number;
    unit_amount: number;
  }>;
}

export interface PayPalPaymentResult {
  id: string;
  status: string;
  payer: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    payments: {
      captures: Array<{
        id: string;
        status: string;
        amount: {
          currency_code: string;
          value: string;
        };
      }>;
    };
  }>;
}

export class PayPalService {
  private static getApiUrl(): string {
    return PAYPAL_CONFIG.ENVIRONMENT === 'sandbox' 
      ? PAYPAL_CONFIG.SANDBOX_API_URL 
      : PAYPAL_CONFIG.PRODUCTION_API_URL;
  }

  static async getAccessToken(): Promise<string> {
    try {
      const response = await fetch(`${this.getApiUrl()}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US',
          'Authorization': `Basic ${btoa(`${PAYPAL_CONFIG.CLIENT_ID}:`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al obtener token: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('❌ Error en getAccessToken:', error);
      throw error;
    }
  }

  static async createOrder(order: PayPalOrder): Promise<any> {
    try {
      const accessToken = await this.getAccessToken();
      
      const orderData = {
        intent: 'CAPTURE',
        application_context: {
          ...PAYPAL_CONFIG.APPLICATION_CONTEXT,
          return_url: PAYPAL_CONFIG.RETURN_URL,
          cancel_url: PAYPAL_CONFIG.CANCEL_URL,
        },
        purchase_units: [{
          amount: {
            currency_code: order.currency,
            value: order.amount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: order.currency,
                value: order.amount.toFixed(2)
              }
            }
          },
          description: order.description,
          items: order.items?.map(item => ({
            name: item.name,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: order.currency,
              value: item.unit_amount.toFixed(2)
            }
          }))
        }]
      };

      const response = await fetch(`${this.getApiUrl()}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': Date.now().toString(),
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear orden: ${response.status} ${errorText}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('❌ Error en createOrder:', error);
      throw error;
    }
  }

  static async captureOrder(orderId: string): Promise<PayPalPaymentResult> {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.getApiUrl()}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al capturar orden: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error en captureOrder:', error);
      throw error;
    }
  }

  static generatePayPalHTML(orderId: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pago con PayPal - AhorraFood</title>
    <script src="https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.CLIENT_ID}&currency=${PAYPAL_CONFIG.CURRENCY}&intent=capture"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            max-width: 500px;
            width: 100%;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #718096;
            margin-bottom: 30px;
            font-size: 16px;
        }
        #paypal-button-container {
            margin: 30px 0;
        }
        .loading {
            color: #4a5568;
            font-size: 16px;
            margin: 20px 0;
        }
        .error {
            color: #e53e3e;
            background: #fed7d7;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 14px;
        }
        .success {
            color: #38a169;
            background: #c6f6d5;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 14px;
        }
        .order-info {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
        }
        .order-id {
            font-family: monospace;
            background: #edf2f7;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🍽️ AhorraFood</div>
        <div class="subtitle">Completa tu pago de forma segura</div>
        
        <div class="order-info">
            <strong>ID de Orden:</strong><br>
            <div class="order-id">${orderId}</div>
        </div>
        
        <div id="loading" class="loading">Cargando PayPal...</div>
        <div id="error-container"></div>
        <div id="success-container"></div>
        <div id="paypal-button-container"></div>
        
        <script>
            console.log('🚀 Iniciando PayPal con orden:', '${orderId}');
            
            function showError(message) {
                document.getElementById('error-container').innerHTML = 
                    '<div class="error">❌ ' + message + '</div>';
                document.getElementById('loading').style.display = 'none';
            }
            
            function showSuccess(message) {
                document.getElementById('success-container').innerHTML = 
                    '<div class="success">✅ ' + message + '</div>';
            }
            
            function sendMessage(type, data) {
                // Para React Native WebView
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
                }
                
                // Para ventana popup web
                if (window.opener) {
                    window.opener.postMessage({ type, data }, '*');
                }
                
                // Para iframe
                if (window.parent !== window) {
                    window.parent.postMessage({ type, data }, '*');
                }
            }
            
            // Verificar que PayPal SDK se cargó
            if (typeof paypal === 'undefined') {
                showError('No se pudo cargar PayPal SDK. Verifica tu conexión a internet.');
                sendMessage('ERROR', 'PayPal SDK no se cargó');
            } else {
                document.getElementById('loading').style.display = 'none';
                
                paypal.Buttons({
                    // Crear orden (ya existe en el servidor)
                    createOrder: function(data, actions) {
                        return '${orderId}';
                    },
                    
                    // Aprobar pago
                    onApprove: function(data, actions) {
                        showSuccess('Pago aprobado. Procesando...');
                        sendMessage('APPROVED', {
                            orderID: data.orderID,
                            payerID: data.payerID
                        });
                        
                        // Capturar el pago
                        return actions.order.capture().then(function(details) {
                            showSuccess('¡Pago completado exitosamente!');
                            sendMessage('SUCCESS', details);
                        });
                    },
                    
                    // Manejar errores
                    onError: function(err) {
                        showError('Error en el proceso de pago: ' + (err.message || 'Error desconocido'));
                        sendMessage('ERROR', err.message || 'Error en PayPal');
                    },
                    
                    // Cancelar pago
                    onCancel: function(data) {
                        showError('Pago cancelado por el usuario');
                        sendMessage('CANCELLED', data);
                    }
                }).render('#paypal-button-container');
            }
            
            // Mensaje inicial para confirmar que la página se cargó
            sendMessage('LOADED', { orderId: '${orderId}' });
        </script>
    </div>
</body>
</html>`;
  }
}

export default PayPalService;
