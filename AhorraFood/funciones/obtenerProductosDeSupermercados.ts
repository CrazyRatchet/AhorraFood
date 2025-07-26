import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export interface ProductoPublico {
    id: string;
    nombre: string;
    descripcion: string;
    imagen_url: string;
    precio_original: number;
    precio_descuento: number;
    porcentaje_descuento: number;
    fecha_vencimiento: Date;
    tipo_entrega: {
        recogida: boolean;
        domicilio: boolean;
    };
    visualizaciones: number;
    comercio_id: string;
    comercio_nombre?: string;
    comercio_direccion?: string;
}

export const obtenerProductosDeSupermercados = async (): Promise<ProductoPublico[]> => {
    const productosRef = collection(db, "productos");
    const snapshot = await getDocs(productosRef);

    const productosSupermercado: ProductoPublico[] = [];

    for (const docProducto of snapshot.docs) {
        const data = docProducto.data();

        if (!data.comercio_id) continue;

        const comercioRef = doc(db, "comercios", data.comercio_id);
        const comercioSnap = await getDoc(comercioRef);

        if (
            comercioSnap.exists() &&
            comercioSnap.data().categoria === "Supermercado"
        ) {
            const comercioData = comercioSnap.data();

            productosSupermercado.push({
                id: docProducto.id,
                nombre: data.nombre || "Sin nombre",
                descripcion: data.descripcion || "",
                imagen_url: data.imagen_url || "",
                precio_original: Number(data.precio_original || 0),
                precio_descuento: Number(data.precio_descuento || 0),
                porcentaje_descuento: Number(data.porcentaje_descuento || 0),
                fecha_vencimiento: data.fecha_vencimiento?.toDate?.() || new Date(),
                tipo_entrega: {
                    recogida: !!comercioData.tipo_entrega?.recogida,
                    domicilio: !!comercioData.tipo_entrega?.domicilio,
                },
                visualizaciones: Number(data.visualizaciones || 0),
                comercio_id: data.comercio_id,
                comercio_nombre: comercioData.nombre,
                comercio_direccion: comercioData.direccion,
            });
        }
    }

    return productosSupermercado;
};
