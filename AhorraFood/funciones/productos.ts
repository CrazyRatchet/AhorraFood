// funciones/productos.ts
import { auth, db, storage } from "../FirebaseConfig";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface ProductoData {
  nombre: string;
  descripcion: string;
  precioOriginal: number;
  precioDescuento?: number; // Ahora es opcional
  cantidad: number;
  fechaVencimiento: Date;
  imagen?: string;
}

export const subirProducto = async (productData: ProductoData, imagenUri?: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Debes estar autenticado para subir productos");
    }

    const comercioId = auth.currentUser.uid;
    let imagenUrl = "";

    // Subir imagen si existe
    if (imagenUri) {
      const timestamp = Date.now();
      const imagenRef = ref(storage, `FotosProducto/${comercioId}/${timestamp}.jpg`);
      
      const response = await fetch(imagenUri);
      if (!response.ok) {
        throw new Error("No se pudo cargar la imagen");
      }
      
      const blob = await response.blob();
      const uploadResult = await uploadBytes(imagenRef, blob);
      imagenUrl = await getDownloadURL(uploadResult.ref);
    }

    // Calcular porcentaje de descuento solo si hay descuento
    const precioFinal = productData.precioDescuento || productData.precioOriginal;
    const porcentajeDescuento = (productData.precioDescuento && productData.precioOriginal > 0) 
      ? Math.round(((productData.precioOriginal - productData.precioDescuento) / productData.precioOriginal) * 100)
      : 0;

    // Crear el documento del producto
    const productoDoc = {
      comercio_id: comercioId,
      nombre: productData.nombre,
      descripcion: productData.descripcion,
      precio_original: productData.precioOriginal,
      precio_descuento: precioFinal,
      porcentaje_descuento: porcentajeDescuento,
      cantidad_disponible: productData.cantidad,
      fecha_vencimiento: productData.fechaVencimiento,
      imagen_url: imagenUrl,
      estado: "activo",
      fecha_creacion: serverTimestamp(),
      fecha_actualizacion: serverTimestamp(),
      ventas: 0,
      visualizaciones: 0,
    };

    // Agregar el producto a la colección
    const productoId = `${comercioId}_${Date.now()}`;
    await setDoc(doc(db, "productos", productoId), productoDoc);
    return { success: true, id: productoId };

  } catch (error: any) {
    if (error.code === "permission-denied") {
      throw new Error("No tienes permisos para crear productos");
    } else if (error.code === "storage/unauthorized") {
      throw new Error("Error al subir la imagen");
    } else {
      throw new Error(error.message || "Error al crear el producto");
    }
  }
};

export const validarProducto = (data: Partial<ProductoData>): string[] => {
  const errores: string[] = [];

  if (!data.nombre?.trim()) {
    errores.push("El nombre del producto es requerido");
  }

  if (!data.descripcion?.trim()) {
    errores.push("La descripción es requerida");
  }

  if (!data.precioOriginal || data.precioOriginal <= 0) {
    errores.push("El precio debe ser mayor a 0");
  }

  // Validar descuento solo si se proporciona
  if (data.precioDescuento !== undefined && data.precioDescuento !== null) {
    if (data.precioDescuento <= 0) {
      errores.push("El precio con descuento debe ser mayor a 0");
    }
    
    if (data.precioOriginal && data.precioDescuento >= data.precioOriginal) {
      errores.push("El precio con descuento debe ser menor al precio original");
    }
  }

  if (!data.cantidad || data.cantidad <= 0) {
    errores.push("La cantidad debe ser mayor a 0");
  }

  if (!data.fechaVencimiento) {
    errores.push("La fecha de vencimiento es requerida");
  } else if (data.fechaVencimiento <= new Date()) {
    errores.push("La fecha de vencimiento debe ser futura");
  }

  return errores;
};
