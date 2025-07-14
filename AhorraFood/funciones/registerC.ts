// funciones/registerComercio.ts
import { auth, db } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

export const registerComercio = async (data: any) => {
  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const uid = userCredential.user.uid;

    // Crear documento en Firestore
    const comercioRef = doc(collection(db, "comercios"), uid);
    await setDoc(comercioRef, {
      id_negocio: uid,
      nombre: data.nombre,
      propietario: data.propietario,
      email: data.email,
      telefono: data.telefono,
      direccion: data.direccion,
      categoria: data.categoria,
      descripcion: data.descripcion,
      horarios: data.horarios,
      tipo_entrega: data.tipo_entrega,
      documentos: data.documentos,
      estado: "pendiente por auth",
      ventas_totales: 0,
      productos_activos: 0,
      fecha_registro: serverTimestamp()
    });

    return { success: true };
  } catch (error: any) {
    let mensaje = "Error desconocido";
    switch (error.code) {
      case "auth/email-already-in-use":
        mensaje = "Este correo ya está en uso";
        break;
      case "auth/invalid-email":
        mensaje = "Correo inválido";
        break;
      case "auth/weak-password":
        mensaje = "Contraseña muy débil";
        break;
    }
    throw new Error(mensaje);
  }
};
