import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export interface IngresoComercio {
  comercio_id: string;
  monto: number;
  metodoPago: string;
  pedido_id: string;
  fecha: Date;
}

export const registrarIngreso = async (
  comercio_id: string, 
  monto: number, 
  metodoPago: string, 
  pedido_id: string
) => {
  try {
    const ingreso = {
      comercio_id,
      monto,
      metodoPago,
      pedido_id,
      fecha: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "ingresos_comercio"), ingreso);
    
    return { success: true, ingresoId: docRef.id };
  } catch (error) {
    console.error("Error registrando ingreso:", error);
    throw error;
  }
};
