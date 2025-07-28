import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export interface EstadisticasComercio {
  ventasHoy: number;
  ingresosMes: number;
  totalVentas: number;
  fechaUltimaActualizacion: Date;
}

export const obtenerEstadisticasComercio = async (comercioUID: string): Promise<EstadisticasComercio> => {
  try {
    const comercioRef = doc(db, "comercios", comercioUID);
    const comercioSnap = await getDoc(comercioRef);

    if (comercioSnap.exists()) {
      const data = comercioSnap.data();

      const estadisticas = {
        ventasHoy: data.stats_ventas || 0,
        ingresosMes: data.stats_ingresos || 0,
        totalVentas: data.stats_ventas || 0,
        fechaUltimaActualizacion: data.stats_fecha?.toDate() || new Date(),
      };

      return estadisticas;
    } else {
      return {
        ventasHoy: 0,
        ingresosMes: 0,
        totalVentas: 0,
        fechaUltimaActualizacion: new Date(),
      };
    }
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    return {
      ventasHoy: 0,
      ingresosMes: 0,
      totalVentas: 0,
      fechaUltimaActualizacion: new Date(),
    };
  }
};

export const actualizarEstadisticasComercio = async (comercioUID: string, montoVenta: number) => {
  try {
    const comercioRef = doc(db, "comercios", comercioUID);
    
    await updateDoc(comercioRef, {
      stats_ventas: increment(1),
      stats_ingresos: increment(montoVenta),
      stats_fecha: new Date(),
    });

  } catch (error) {
    console.error("Error actualizando estadísticas:", error);
    throw error;
  }
};
