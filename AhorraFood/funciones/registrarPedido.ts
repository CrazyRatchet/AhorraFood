import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";

interface PedidoProducto {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    tipoEntrega: string;
}

interface PedidoData {
    negocio: string;
    productos: PedidoProducto[];
    total: number;
    metodoPago: string;
    estado?: string; // opcional, se puede asignar por defecto
    codigoRecogida?: string; // Agregar código de recogida
}

export const registrarPedido = async (data: PedidoData) => {
    try {
        const usuario = auth.currentUser;
        if (!usuario) throw new Error("Usuario no autenticado");

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
            productos: productosMap,
            total: data.total,
            metodoPago: data.metodoPago,
            estado: data.estado || "pendiente",
            fechaPedido: serverTimestamp(),
            codigoRecogida: data.codigoRecogida || "", // Guardar código de recogida
        };

        const docRef = await addDoc(collection(db, "pedidos"), pedido);
        console.log("Pedido registrado correctamente con ID:", docRef.id);

        return { success: true, pedidoId: docRef.id }; // Retornar el ID del documento
    } catch (error) {
        console.error("Error al registrar el pedido:", error);
        throw error;
    }
};