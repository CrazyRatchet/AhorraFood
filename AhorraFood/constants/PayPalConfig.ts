export const PAYPAL_CONFIG = {
  CLIENT_ID: 'AcOAk4zl8KS80uL_71vLkf9YeT60xQz2NA9rXRbYb4yljS4nARyVhMYwrslF2Fp3hlWHRKNwhwHdconl',
  ENVIRONMENT: 'sandbox', // 'sandbox' para pruebas, 'production' para producción
  CURRENCY: 'USD',
  SANDBOX_API_URL: 'https://api-m.sandbox.paypal.com',
  PRODUCTION_API_URL: 'https://api-m.paypal.com',
  
  // URLs de redirect para mobile
  RETURN_URL: 'https://example.com/success',
  CANCEL_URL: 'https://example.com/cancel',
  
  // Configuración de la aplicación
  APPLICATION_CONTEXT: {
    brand_name: 'AhorraFood',
    landing_page: 'BILLING',
    user_action: 'PAY_NOW',
    return_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel'
  }
};
