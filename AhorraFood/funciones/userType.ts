// funciones/userType.ts
import { auth, db } from "../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export type UserType = "comercio" | "usuario" | null;

export interface UserProfile {
  type: UserType;
  data: any;
}

export const detectUserType = async (): Promise<UserProfile> => {
  try {
    if (!auth.currentUser) {
      return { type: null, data: null };
    }

    const uid = auth.currentUser.uid;

    // Primero verificar si es comercio
    const comercioDoc = await getDoc(doc(db, "comercios", uid));
    if (comercioDoc.exists()) {
      return { 
        type: "comercio", 
        data: { id: uid, ...comercioDoc.data() } 
      };
    }

    // Si no es comercio, verificar si es usuario normal
    const usuarioDoc = await getDoc(doc(db, "usuarios", uid));
    if (usuarioDoc.exists()) {
      return { 
        type: "usuario", 
        data: { id: uid, ...usuarioDoc.data() } 
      };
    }

    // Si no existe en ninguna colección
    return { type: null, data: null };

  } catch (error) {
    console.error("Error detectando tipo de usuario:", error);
    return { type: null, data: null };
  }
};

export const isComercio = async (): Promise<boolean> => {
  const userProfile = await detectUserType();
  return userProfile.type === "comercio";
};
