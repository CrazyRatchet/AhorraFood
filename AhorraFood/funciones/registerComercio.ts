// funciones/registerComercio.ts
import { auth, db } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

interface ComercioData {
  nombre: string;
  propietario: string;
  email: string;
  password: string;
  telefono: string;
  direccion: string;
  categoria: string; // "Fonda" o "Supermercado"
  recogerLocal: boolean;
  envioDomicilio: boolean;
  documentos: {
    licencia: string;
    permisos_salud: string;
    ruc: string;
  };
}

export const registerComercio = async (data: ComercioData) => {
  try {
    // Verificar si el usuario ya está logueado y desloguearlo
    if (auth.currentUser) {
      await signOut(auth);
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const uid = userCredential.user.uid;
    
    console.log("Usuario creado exitosamente:", uid);
    console.log("Usuario autenticado actual:", auth.currentUser?.uid);

    // Escribir a Firestore MIENTRAS el usuario está autenticado
    await setDoc(doc(db, "comercios", uid), {
      id_negocio: uid,
      nombre: data.nombre,
      propietario: data.propietario,
      email: data.email,
      telefono: data.telefono,
      direccion: data.direccion,
      categoria: data.categoria,
      descripcion: "", // puedes llenarlo después
      horarios: [],    // puedes llenarlo después
      tipo_entrega: {
        recogida: data.recogerLocal,
        domicilio: data.envioDomicilio
      },
      documentos: {
        licencia: data.documentos.licencia,
        permisos_salud: data.documentos.permisos_salud,
        ruc: data.documentos.ruc,
      },
      estado: "pendiente por auth",
      ventas_totales: 0,
      productos_activos: 0,
      fecha_registro: serverTimestamp()
    });

    console.log("Documento de comercio creado exitosamente");

    // Desloguear al usuario después del registro exitoso
    await signOut(auth);

    return { success: true };
  } catch (error: any) {
    console.error("Error en registerComercio:", error);
    let mensaje = "Error desconocido";

    switch (error.code) {
      case "auth/email-already-in-use":
        mensaje = "Este correo ya está registrado. Si acabas de registrarte, puedes intentar iniciar sesión.";
        break;
      case "auth/invalid-email":
        mensaje = "Correo electrónico inválido";
        break;
      case "auth/weak-password":
        mensaje = "La contraseña debe tener al menos 6 caracteres";
        break;
      case "auth/network-request-failed":
        mensaje = "Error de conexión. Verifica tu internet e inténtalo de nuevo.";
        break;
      case "permission-denied":
        mensaje = "Error de permisos. Inténtalo de nuevo.";
        break;
      default:
        mensaje = error.message || "Error al registrar el comercio";
    }

    throw new Error(mensaje);
  }
};
