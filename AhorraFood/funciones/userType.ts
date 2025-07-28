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
      console.log("❌ No hay usuario autenticado");
      return { type: null, data: null };
    }

    const uid = auth.currentUser.uid;
    console.log("🔍 Detectando tipo para UID:", uid);

    // Primero verificar si es comercio
    const comercioDoc = await getDoc(doc(db, "comercios", uid));
    console.log("🏪 Documento comercio existe:", comercioDoc.exists());
    if (comercioDoc.exists()) {
      console.log("✅ Es comercio:", comercioDoc.data());
      return { 
        type: "comercio", 
        data: { id: uid, ...comercioDoc.data() } 
      };
    }

    // Si no es comercio, verificar si es usuario normal
    const usuarioDoc = await getDoc(doc(db, "usuarios", uid));
    console.log("👤 Documento usuario existe:", usuarioDoc.exists());
    if (usuarioDoc.exists()) {
      console.log("✅ Es usuario normal:", usuarioDoc.data());
      return { 
        type: "usuario", 
        data: { id: uid, ...usuarioDoc.data() } 
      };
    }

    // Si no existe en ninguna colección
    console.log("❌ No se encontró en ninguna colección");
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
