// funciones/productosPublicos.ts
import { db } from "../FirebaseConfig";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  Timestamp,
  orderBy,
  limit,
  doc,
  getDoc
} from "firebase/firestore";

export interface ProductoPublico {
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
  // Datos del comercio
  comercio_nombre?: string;
  comercio_categoria?: string;
  comercio_direccion?: string;
  tipo_entrega?: {
    recogida: boolean;
    domicilio: boolean;
  };
}

export const obtenerTodosLosProductos = async (): Promise<ProductoPublico[]> => {
  try {
    console.log("🔍 Obteniendo TODOS los productos sin filtros...");
    console.log("🔗 Firebase DB conectado:", !!db);
    console.log("📁 Accediendo a colección 'productos'...");
    
    const querySnapshot = await getDocs(collection(db, "productos"));
    
    console.log("📋 Total documentos en colección 'productos':", querySnapshot.docs.length);
    
    if (querySnapshot.docs.length === 0) {
      console.log("❌ La colección 'productos' está vacía");
      return [];
    }
    
    const productos: ProductoPublico[] = [];
    
    // Procesar cada producto y obtener información del comercio
    for (let index = 0; index < querySnapshot.docs.length; index++) {
      const docSnapshot = querySnapshot.docs[index];
      const data = docSnapshot.data();
      
      console.log(`📄 Documento ${index + 1}:`, {
        id: docSnapshot.id,
        nombre: data.nombre || "Sin nombre",
        estado: data.estado || "Sin estado",
        cantidad: data.cantidad_disponible || "Sin cantidad",
        comercio_id: data.comercio_id || "Sin comercio_id"
      });
      
      try {
        // Obtener información del comercio si existe comercio_id
        let comercioData = {
          nombre: "Comercio Local",
          categoria: "Establecimiento", 
          direccion: "Panamá"
        };
        
        if (data.comercio_id) {
          try {
            const comercioRef = doc(db, "comercios", data.comercio_id);
            const comercioSnapshot = await getDoc(comercioRef);
            
            if (comercioSnapshot.exists()) {
              const comercio = comercioSnapshot.data();
              comercioData = {
                nombre: comercio.nombre || "Comercio Local",
                categoria: comercio.categoria || "Establecimiento",
                direccion: comercio.direccion || "Panamá"
              };
              console.log(`✅ Información de comercio obtenida para ${comercioData.nombre}`);
            } else {
              console.log(`⚠️ Comercio no encontrado para ID: ${data.comercio_id}`);
            }
          } catch (comercioError) {
            console.error(`❌ Error obteniendo comercio ${data.comercio_id}:`, comercioError);
          }
        }
        
        const producto = {
          id: docSnapshot.id,
          comercio_id: data.comercio_id || "",
          nombre: data.nombre || "Producto sin nombre",
          descripcion: data.descripcion || "Sin descripción",
          precio_original: Number(data.precio_original) || 0,
          precio_descuento: Number(data.precio_descuento) || 0,
          porcentaje_descuento: Number(data.porcentaje_descuento) || 0,
          cantidad_disponible: Number(data.cantidad_disponible) || 0,
          fecha_vencimiento: data.fecha_vencimiento instanceof Timestamp 
            ? data.fecha_vencimiento.toDate() 
            : new Date(data.fecha_vencimiento || Date.now()),
          imagen_url: data.imagen_url || "",
          estado: data.estado || "activo",
          fecha_creacion: data.fecha_creacion instanceof Timestamp 
            ? data.fecha_creacion.toDate() 
            : new Date(data.fecha_creacion || Date.now()),
          fecha_actualizacion: data.fecha_actualizacion instanceof Timestamp 
            ? data.fecha_actualizacion.toDate() 
            : new Date(data.fecha_actualizacion || Date.now()),
          ventas: Number(data.ventas) || 0,
          visualizaciones: Number(data.visualizaciones) || 0,
          comercio_nombre: comercioData.nombre,
          comercio_categoria: comercioData.categoria,
          comercio_direccion: comercioData.direccion,
          tipo_entrega: data.tipo_entrega || { recogida: true, domicilio: false },
        } as ProductoPublico;
        
        productos.push(producto);
        console.log(`✅ Producto ${index + 1} procesado correctamente con comercio: ${comercioData.nombre}`);
        
      } catch (error) {
        console.error(`❌ Error procesando documento ${index + 1}:`, error);
      }
    }
    
    console.log("🎯 Total productos procesados:", productos.length);
    return productos;
    
  } catch (error: any) {
    console.error("❌ Error en obtenerTodosLosProductos:", error);
    throw new Error(error.message || "Error al obtener productos");
  }
};

export const obtenerProductosMejorValorados = async (limite: number = 6): Promise<ProductoPublico[]> => {
  try {
    console.log("🔍 Buscando productos activos...");
    
    const q = query(
      collection(db, "productos"),
      where("estado", "==", "activo"),
      where("cantidad_disponible", ">", 0)
    );

    const querySnapshot = await getDocs(q);
    console.log("📊 Documentos encontrados:", querySnapshot.docs.length);
    
    const productos: ProductoPublico[] = [];
    
    // Procesar cada producto y obtener información del comercio
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      console.log("📄 Producto:", data.nombre, "Estado:", data.estado, "Cantidad:", data.cantidad_disponible);
      
      // Obtener información del comercio si existe comercio_id
      let comercioData = {
        nombre: "Comercio Local",
        categoria: "Establecimiento", 
        direccion: "Panamá"
      };
      
      if (data.comercio_id) {
        try {
          const comercioRef = doc(db, "comercios", data.comercio_id);
          const comercioSnapshot = await getDoc(comercioRef);
          
          if (comercioSnapshot.exists()) {
            const comercio = comercioSnapshot.data();
            comercioData = {
              nombre: comercio.nombre || "Comercio Local",
              categoria: comercio.categoria || "Establecimiento",
              direccion: comercio.direccion || "Panamá"
            };
          }
        } catch (comercioError) {
          console.error(`❌ Error obteniendo comercio ${data.comercio_id}:`, comercioError);
        }
      }
      
      const producto = {
        id: docSnapshot.id,
        comercio_id: data.comercio_id || "",
        nombre: data.nombre || "Producto sin nombre",
        descripcion: data.descripcion || "Sin descripción",
        precio_original: Number(data.precio_original) || 0,
        precio_descuento: Number(data.precio_descuento) || 0,
        porcentaje_descuento: Number(data.porcentaje_descuento) || 0,
        cantidad_disponible: Number(data.cantidad_disponible) || 0,
        fecha_vencimiento: data.fecha_vencimiento instanceof Timestamp 
          ? data.fecha_vencimiento.toDate() 
          : new Date(data.fecha_vencimiento),
        imagen_url: data.imagen_url || "",
        estado: data.estado || "activo",
        fecha_creacion: data.fecha_creacion instanceof Timestamp 
          ? data.fecha_creacion.toDate() 
          : new Date(data.fecha_creacion),
        fecha_actualizacion: data.fecha_actualizacion instanceof Timestamp 
          ? data.fecha_actualizacion.toDate() 
          : new Date(data.fecha_actualizacion),
        ventas: Number(data.ventas) || 0,
        visualizaciones: Number(data.visualizaciones) || 0,
        comercio_nombre: comercioData.nombre,
        comercio_categoria: comercioData.categoria,
        comercio_direccion: comercioData.direccion,
        tipo_entrega: data.tipo_entrega || { recogida: true, domicilio: false },
      } as ProductoPublico;
      
      productos.push(producto);
    }

    console.log("✅ Productos procesados:", productos.length);

    // Ordenar por descuento y fecha
    productos.sort((a, b) => {
      // Si tienen descuento, priorizarlos
      if (a.porcentaje_descuento > 0 && b.porcentaje_descuento === 0) return -1;
      if (b.porcentaje_descuento > 0 && a.porcentaje_descuento === 0) return 1;
      
      // Luego por porcentaje de descuento más alto
      if (b.porcentaje_descuento !== a.porcentaje_descuento) {
        return b.porcentaje_descuento - a.porcentaje_descuento;
      }
      
      // Finalmente por fecha más reciente
      return b.fecha_creacion.getTime() - a.fecha_creacion.getTime();
    });

    const resultado = productos.slice(0, limite);
    console.log("🎯 Productos finales:", resultado.length);
    
    return resultado;

  } catch (error: any) {
    console.error("❌ Error obteniendo productos mejor valorados:", error);
    throw new Error(error.message || "Error al cargar productos");
  }
};

export const incrementarVisualizacion = async (productoId: string): Promise<void> => {
  try {
    // Esta función se puede implementar más tarde para incrementar las visualizaciones
    // cuando un usuario vea un producto
    console.log("Incrementando visualización para producto:", productoId);
  } catch (error) {
    console.error("Error incrementando visualización:", error);
  }
};
