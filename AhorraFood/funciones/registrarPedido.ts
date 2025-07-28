import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { actualizarEstadisticasComercio } from "./estadisticasComercio";
import { registrarIngreso } from "./ingresosComercio";

interface PedidoProducto {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    tipoEntrega: string;
}

interface PedidoData {
    negocio: string;
    comercio_id?: string; // ID del comercio propietario del producto
    productos: PedidoProducto[];
    total: number;
    metodoPago: string;
    estado?: string; // opcional, se puede asignar por defecto
    codigoRecogida?: string; // Agregar código de recogida
    paypalPaymentId?: string; // ID del pago de PayPal
}

export const registrarPedido = async (data: PedidoData) => {
    try {
        const usuario = auth.currentUser;
        if (!usuario) throw new Error("Usuario no autenticado");

        // Obtener comercio_id del primer producto si no está proporcionado
        let comercio_id = data.comercio_id;
        if (!comercio_id && data.productos.length > 0) {
            // Si no se proporciona comercio_id, necesitamos obtenerlo del producto
            // Por ahora, usaremos el negocio como comercio_id temporal
            comercio_id = data.negocio;
        }

        const productosMap: { [key: string]: any } = {};
        data.productos.forEach((producto, index) => {
            productosMap[`producto${index + 1}`] = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
                tipoEntrega: producto.tipoEntrega,
            };
        });

        const pedido = {
            usuario: usuario.uid,
            negocio: data.negocio,
            comercio_id: comercio_id,
            productos: productosMap,
            total: data.total,
            metodoPago: data.metodoPago,
            estado: data.estado || "pendiente",
            fechaPedido: serverTimestamp(),
            codigoRecogida: data.codigoRecogida || "",
            paypalPaymentId: data.paypalPaymentId || "",
        };

        const docRef = await addDoc(collection(db, "pedidos"), pedido);

        // Actualizar estadísticas del comercio
        if (comercio_id) {
            try {
                await actualizarEstadisticasComercio(comercio_id, data.total);
            } catch (error) {
                console.error("Error actualizando estadísticas:", error);
            }

            // Registrar ingreso para auditoría
            try {
                await registrarIngreso(comercio_id, data.total, data.metodoPago, docRef.id);
            } catch (error) {
                console.error("Error registrando ingreso:", error);
            }
        }

        return { success: true, pedidoId: docRef.id };
    } catch (error) {
        console.error("Error al registrar el pedido:", error);
        throw error;
    }
};