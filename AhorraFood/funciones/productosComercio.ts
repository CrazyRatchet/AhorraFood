// funciones/productosComercio.ts
import { auth, db } from "../FirebaseConfig";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  Timestamp 
} from "firebase/firestore";

export interface Producto {
  id: string;
  comercio_id: string;
  nombre: string;
  descripcion: string;
  precio_original: number;
  precio_descuento: number;
  porcentaje_descuento: number;
  cantidad_disponible: number;
  fecha_vencimiento: Date;
  imagen_url: string;
  estado: "activo" | "inactivo" | "agotado";
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  ventas: number;
  visualizaciones: number;
}

export const obtenerProductosComercio = async (): Promise<Producto[]> => {
  try {
    if (!auth.currentUser) {
      throw new Error("Debes estar autenticado");
    }

    const comercioId = auth.currentUser.uid;
    
    const q = query(
      collection(db, "productos"),
      where("comercio_id", "==", comercioId),
      orderBy("fecha_creacion", "desc")
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        fecha_vencimiento: data.fecha_vencimiento instanceof Timestamp 
          ? data.fecha_vencimiento.toDate() 
          : new Date(data.fecha_vencimiento),
        fecha_creacion: data.fecha_creacion instanceof Timestamp 
          ? data.fecha_creacion.toDate() 
          : new Date(data.fecha_creacion),
        fecha_actualizacion: data.fecha_actualizacion instanceof Timestamp 
          ? data.fecha_actualizacion.toDate() 
          : new Date(data.fecha_actualizacion),
      } as Producto;
    });

  } catch (error: any) {
    console.error("Error obteniendo productos:", error);
    throw new Error(error.message || "Error al cargar productos");
  }
};

export const actualizarProducto = async (
  productoId: string, 
  updates: Partial<Producto>
): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error("Debes estar autenticado");
    }

    const productoRef = doc(db, "productos", productoId);
    
    // Calcular nuevo porcentaje de descuento si se actualizan precios
    const updateData: any = { ...updates };
    
    if (updates.precio_original && updates.precio_descuento) {
      updateData.porcentaje_descuento = Math.round(
        ((updates.precio_original - updates.precio_descuento) / updates.precio_original) * 100
      );
    }
    
    updateData.fecha_actualizacion = new Date();

    await updateDoc(productoRef, updateData);
    
  } catch (error: any) {
    console.error("Error actualizando producto:", error);
    throw new Error(error.message || "Error al actualizar producto");
  }
};

export const eliminarProducto = async (productoId: string): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error("Debes estar autenticado");
    }

    await deleteDoc(doc(db, "productos", productoId));
    
  } catch (error: any) {
    console.error("Error eliminando producto:", error);
    throw new Error(error.message || "Error al eliminar producto");
  }
};

export const cambiarEstadoProducto = async (
  productoId: string, 
  nuevoEstado: "activo" | "inactivo"
): Promise<void> => {
  try {
    await actualizarProducto(productoId, { estado: nuevoEstado });
  } catch (error) {
    throw error;
  }
};
