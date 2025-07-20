// funciones/auth.ts
import { auth, db } from "../FirebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export interface ComercioProfile {
  id_negocio: string;
  nombre: string;
  propietario: string;
  email: string;
  telefono: string;
  direccion: string;
  categoria: string;
  estado: string;
  tipo_entrega: {
    recogida: boolean;
    domicilio: boolean;
  };
}

export const loginComercio = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Verificar si es un comercio
    const comercioDoc = await getDoc(doc(db, "comercios", uid));
    
    if (!comercioDoc.exists()) {
      throw new Error("Esta cuenta no está registrada como comercio");
    }

    const comercioData = comercioDoc.data() as ComercioProfile;
    
    if (comercioData.estado !== "activo" && comercioData.estado !== "pendiente por auth") {
      throw new Error("Tu cuenta está pendiente de aprobación");
    }

    return { success: true, comercio: comercioData };
  } catch (error: any) {
    console.error("Error en login:", error);
    
    let mensaje = "Error desconocido";
    
    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        mensaje = "Email o contraseña incorrectos";
        break;
      case "auth/invalid-email":
        mensaje = "Email inválido";
        break;
      case "auth/user-disabled":
        mensaje = "Esta cuenta ha sido deshabilitada";
        break;
      default:
        mensaje = error.message || "Error al iniciar sesión";
    }

    throw new Error(mensaje);
  }
};

export const getCurrentComercio = async (): Promise<ComercioProfile | null> => {
  try {
    if (!auth.currentUser) {
      return null;
    }

    const comercioDoc = await getDoc(doc(db, "comercios", auth.currentUser.uid));
    
    if (!comercioDoc.exists()) {
      return null;
    }

    return comercioDoc.data() as ComercioProfile;
  } catch (error) {
    console.error("Error obteniendo perfil del comercio:", error);
    return null;
  }
};

export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
