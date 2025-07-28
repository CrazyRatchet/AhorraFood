// Script para corregir métodos de pago existentes
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

// Tu configuración de Firebase
const firebaseConfig = {
  // Aquí va tu configuración de Firebase
  // Por seguridad no la incluyo aquí
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixPaymentMethods() {
  try {
    console.log('🔧 Iniciando corrección de métodos de pago...');
    
    const pedidosRef = collection(db, 'pedidos');
    const snapshot = await getDocs(pedidosRef);
    
    let count = 0;
    
    for (const pedidoDoc of snapshot.docs) {
      const data = pedidoDoc.data();
      
      // Si el método de pago no es "paypal", actualizarlo
      if (data.metodoPago && data.metodoPago !== 'paypal') {
        await updateDoc(doc(db, 'pedidos', pedidoDoc.id), {
          metodoPago: 'paypal'
        });
        count++;
        console.log(`✅ Actualizado pedido ${pedidoDoc.id}: ${data.metodoPago} -> paypal`);
      }
    }
    
    console.log(`🎉 Corrección completada. ${count} pedidos actualizados.`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixPaymentMethods();
