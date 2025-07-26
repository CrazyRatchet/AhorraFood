const https = require('https');

const CLIENT_ID = 'AcOAk4zl8KS80uL_71vLkf9YeT60xQz2NA9rXRbYb4yljS4nARyVhMYwrslF2Fp3hlWHRKNwhwHdconl';
const SANDBOX_URL = 'https://api-m.sandbox.paypal.com';

function testPayPalConnection() {
  return new Promise((resolve, reject) => {
    console.log('🔑 Probando conexión con PayPal...');
    
    const postData = 'grant_type=client_credentials';
    
    const options = {
      hostname: 'api-m.sandbox.paypal.com',
      port: 443,
      path: '/v1/oauth2/token',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200 && response.access_token) {
            console.log('✅ Conexión exitosa con PayPal');
            console.log('🔑 Token obtenido:', response.access_token.substring(0, 20) + '...');
            console.log('⏰ Expira en:', response.expires_in, 'segundos');
            resolve(response);
          } else {
            console.error('❌ Error en respuesta:', response);
            reject(new Error(`Error ${res.statusCode}: ${data}`));
          }
        } catch (error) {
          console.error('❌ Error parseando respuesta:', error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Error de conexión:', error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  try {
    console.log('🚀 Iniciando test de PayPal...');
    console.log('🆔 Client ID:', CLIENT_ID);
    console.log('🌐 Environment: Sandbox');
    console.log('');
    
    await testPayPalConnection();
    
    console.log('');
    console.log('✅ Test completado exitosamente!');
    console.log('🎉 PayPal está configurado correctamente y listo para usar.');
  } catch (error) {
    console.log('');
    console.error('❌ Test falló:', error.message);
    console.log('💡 Verifica que el Client ID esté correcto y que tengas conexión a internet.');
  }
}

main();
