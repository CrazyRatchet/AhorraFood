import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Inicia sesión con correo y contraseña
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    let mensaje = "Error desconocido";
    switch (error.code) {
      case "auth/user-not-found":
        mensaje = "Usuario no encontrado";
        break;
      case "auth/wrong-password":
        mensaje = "Contraseña incorrecta";
        break;
      case "auth/invalid-email":
        mensaje = "Email inválido";
        break;
      case "auth/operation-not-allowed":
        mensaje = "Esta operacion no esta permitida"
        break;
    }
    throw new Error(mensaje);
  }
};

/**
 * Registra un nuevo usuario con email, password, nombre y teléfono
 */
export const registerUser = async (
  nombre: string,
  email: string,
  telefono: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Opcional: actualizar nombre en el perfil
    await updateProfile(user, {
      displayName: nombre,
    });

    // Crear documento en Firestore
    const userRef = doc(db, "usuarios", user.uid);
    await setDoc(userRef, {
      nombre,
      email,
      telefono,
      creadoEn: serverTimestamp(),
    });

    return user;
  } catch (error: any) {
    let mensaje = "Error desconocido";
    switch (error.code) {
      case "auth/email-already-in-use":
        mensaje = "Este correo ya está registrado";
        break;
      case "auth/invalid-email":
        mensaje = "Correo inválido";
        break;
      case "auth/weak-password":
        mensaje = "Contraseña débil (mínimo 6 caracteres)";
        break;
    }
    throw new Error(mensaje);
  }
};
