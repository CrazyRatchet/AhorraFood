import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useRouter } from "expo-router";
const TerminosCondiciones = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/registerU")}
      >
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backText}>Volver al inicio</Text>
      </TouchableOpacity>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.title}>CONDICIONES DE USO</Text>
          <Text style={styles.subtitle}>
            En vigor a partir del 28 de julio de 2025.
          </Text>
          <Text style={styles.introText}>
            Gracias por utilizar{" "}
            <Text style={styles.brandName}>AhorraFood</Text> y unirte a la lucha
            contra el desperdicio de alimentos.
          </Text>

          {/* Section 1 */}
          <Text style={styles.sectionTitle}>
            1. BIENVENIDO A <Text style={styles.brandName}>AhorraFood</Text>
          </Text>

          <Text style={styles.subsectionTitle}>1.1 Nuestra Misión</Text>
          <Text style={styles.bodyText}>
            Bienvenido a <Text style={styles.brandName}>AhorraFood</Text>, la
            plataforma panameña dedicada a reducir el desperdicio de alimentos
            conectando comercios con excedentes alimentarios con consumidores
            que buscan productos de calidad a precios accesibles. Nuestra misión
            es "Mata el hambre, salva el bolsillo, hacerlo con{" "}
            <Text style={styles.brandName}>AhorraFood</Text> es sencillo",
            contribuyendo así a la sostenibilidad ambiental y la economía
            familiar en Panamá.
          </Text>

          <Text style={styles.subsectionTitle}>
            1.2 Funcionamiento de la Plataforma
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.brandName}>AhorraFood</Text> opera como una
            plataforma de comercio electrónico que permite a comercios del
            sector alimentario (restaurantes, panaderías, supermercados,
            cafeterías, cevicherías y otros establecimientos) publicar productos
            excedentes o próximos a vencer a precios reducidos. Los usuarios
            pueden navegar, seleccionar y adquirir estos productos a través de
            nuestra aplicación móvil y sitio web.
          </Text>

          <Text style={styles.subsectionTitle}>
            1.3 Ámbito de Aplicación y Naturaleza del Servicio
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.brandName}>AhorraFood</Text> opera
            exclusivamente como intermediario digital en la República de Panamá.
            No vendemos productos directamente, ni garantizamos su calidad,
            estado, salubridad o disponibilidad. Los comercios afiliados son los
            únicos responsables de:
          </Text>

          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Los productos publicados y su información (precios, imágenes,
              fechas de vencimiento).
            </Text>
            <Text style={styles.bulletPoint}>
              • La calidad, estado y entrega de los productos.
            </Text>
            <Text style={styles.bulletPoint}>
              • El cumplimiento de normativas sanitarias aplicables.
            </Text>
          </View>

          <Text style={styles.importantText}>
            IMPORTANTE: Los productos pueden tener fechas de vencimiento
            cercanas, condición que usted acepta explícitamente al adquirirlos.
          </Text>

          {/* Section 2 */}
          <Text style={styles.sectionTitle}>
            2. ACEPTACIÓN DE TÉRMINOS Y CONDICIONES
          </Text>

          <Text style={styles.subsectionTitle}>2.1 Acuerdo Legal</Text>
          <Text style={styles.bodyText}>
            Estos Términos y Condiciones constituyen un acuerdo legal vinculante
            entre usted y el equipo responsable de{" "}
            <Text style={styles.brandName}>AhorraFood</Text>, un proyecto de
            comercio electrónico en fase operativa inicial en la República de
            Panamá. Al utilizar nuestra plataforma, usted acepta los presentes
            términos que regulan el uso de{" "}
            <Text style={styles.brandName}>AhorraFood</Text>.
          </Text>

          <Text style={styles.subsectionTitle}>2.2 Aceptación Expresa</Text>
          <Text style={styles.bodyText}>
            Al acceder, registrarse o utilizar cualquier servicio de{" "}
            <Text style={styles.brandName}>AhorraFood</Text>, usted acepta
            íntegramente estos términos. Si no está de acuerdo con alguna
            disposición, deberá abstenerse de utilizar la plataforma.
          </Text>

          <Text style={styles.subsectionTitle}>2.3 Capacidad Legal</Text>
          <Text style={styles.bodyText}>
            Para utilizar <Text style={styles.brandName}>AhorraFood</Text> debe
            ser mayor de edad (18 años en Panamá) y tener capacidad legal para
            contratar. Los menores de edad solo podrán utilizar la plataforma
            bajo supervisión y responsabilidad de sus padres o tutores legales.
          </Text>

          {/* Section 3 */}
          <Text style={styles.sectionTitle}>
            3. REGISTRO Y CUENTA DE USUARIO
          </Text>

          <Text style={styles.subsectionTitle}>3.1 Creación de Cuenta</Text>
          <Text style={styles.bodyText}>
            Para utilizar <Text style={styles.brandName}>AhorraFood</Text> debe
            registrarse proporcionando información veraz, completa y
            actualizada. Puede registrarse mediante:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Correo electrónico y contraseña.
            </Text>
            <Text style={styles.bulletPoint}>• Número de teléfono móvil.</Text>
            <Text style={styles.bulletPoint}>
              • Cuentas de redes sociales autorizadas.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            3.2 Responsabilidad de la Cuenta
          </Text>
          <Text style={styles.bodyText}>Usted es responsable de:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Mantener la confidencialidad de sus credenciales de acceso.
            </Text>
            <Text style={styles.bulletPoint}>
              • Todas las actividades realizadas desde su cuenta.
            </Text>
            <Text style={styles.bulletPoint}>
              • Notificar inmediatamente cualquier uso no autorizado.
            </Text>
            <Text style={styles.bulletPoint}>
              • Mantener actualizada su información de contacto y perfil.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            3.3 Prohibiciones de Uso de Cuenta
          </Text>
          <Text style={styles.bodyText}>Está prohibido:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Crear múltiples cuentas para la misma persona.
            </Text>
            <Text style={styles.bulletPoint}>
              • Utilizar información falsa o de terceros sin autorización.
            </Text>
            <Text style={styles.bulletPoint}>
              • Compartir credenciales de acceso con otras personas.
            </Text>
            <Text style={styles.bulletPoint}>
              • Utilizar nombres ofensivos, vulgares u obscenos como nombre de
              usuario.
            </Text>
          </View>

          {/* Section 4 */}
          <Text style={styles.sectionTitle}>4. USO DE LA PLATAFORMA</Text>

          <Text style={styles.subsectionTitle}>
            4.1 Funcionalidades Específicas
          </Text>
          <Text style={styles.bodyText}>Para Comercios Afiliados:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Publicación Completa: Incluir nombre del producto, precio,
              imagen de calidad, cantidad disponible, descripción detallada,
              fecha de vencimiento, tipo de entrega disponible.
            </Text>
            <Text style={styles.bulletPoint}>
              • Gestión de Inventario: Mantener actualizada la disponibilidad de
              productos en tiempo real.
            </Text>
            <Text style={styles.bulletPoint}>
              • Administración de Pedidos: Confirmar, rechazar o gestionar
              pedidos según disponibilidad.
            </Text>
            <Text style={styles.bulletPoint}>
              • Confirmación de Entregas: Registrar entregas completadas y
              recogidas realizadas.
            </Text>
            <Text style={styles.bulletPoint}>
              • Facturación Obligatoria: Emitir comprobantes según normativas
              fiscales aplicables.
            </Text>
          </View>

          <Text style={styles.bodyText}>Para Usuarios Finales:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Navegación Intuitiva: Buscar y filtrar productos por categoría,
              precio, ubicación y fecha de vencimiento.
            </Text>
            <Text style={styles.bulletPoint}>
              • Información Transparente: Acceder a toda la información del
              producto antes de la compra.
            </Text>
            <Text style={styles.bulletPoint}>
              • Carrito de Compras: Agregar múltiples productos y gestionar su
              pedido.
            </Text>
            <Text style={styles.bulletPoint}>
              • Selección de Entrega: Elegir entre retiro en establecimiento o
              entrega a domicilio (según disponibilidad del comercio).
            </Text>
            <Text style={styles.bulletPoint}>
              • Pago Seguro: Procesar pagos únicamente a través de métodos
              digitales habilitados.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>4.2 Proceso de Compra</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Selección: Agregue productos al carrito de compras.
            </Text>
            <Text style={styles.bulletPoint}>
              • Método de Entrega: Seleccione entre recogida en establecimiento
              o entrega a domicilio (según disponibilidad).
            </Text>
            <Text style={styles.bulletPoint}>
              • Pago: Confirme el método de pago registrado en su cuenta.
            </Text>
            <Text style={styles.bulletPoint}>
              • Confirmación: Reciba confirmación del pedido con número de
              seguimiento.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            4.3 Métodos de Pago Aceptados
          </Text>
          <Text style={styles.bodyTextBold}>
            ÚNICAMENTE PAGO DIGITAL EN PLATAFORMA:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Tarjetas de crédito y débito (Visa, MasterCard, American
              Express).
            </Text>
            <Text style={styles.bulletPoint}>
              • Transferencias bancarias autorizadas.
            </Text>
            <Text style={styles.bulletPoint}>
              • Billeteras digitales habilitadas en Panamá.
            </Text>
          </View>
          <Text style={styles.importantText}>
            IMPORTANTE: No se acepta pago en efectivo en establecimiento. Todos
            los pagos deben procesarse a través de la plataforma antes de la
            entrega o recogida.
          </Text>

          {/* Section 5 */}
          <Text style={styles.sectionTitle}>5. ENTREGA Y RECOGIDA</Text>

          <Text style={styles.subsectionTitle}>5.1 Modalidades de Entrega</Text>
          <Text style={styles.bodyTextBold}>Recogida en Establecimiento:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Debe recoger el producto en el horario establecido por el
              comercio.
            </Text>
            <Text style={styles.bulletPoint}>
              • Presente el código de confirmación en la aplicación.
            </Text>
            <Text style={styles.bulletPoint}>
              • Verifique que el producto corresponda a su pedido antes de
              retirarlo.
            </Text>
          </View>

          <Text style={styles.bodyTextBold}>Entrega a Domicilio:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • La entrega a domicilio está disponible según cobertura
              geográfica y políticas del comercio.
            </Text>
            <Text style={styles.bulletPoint}>
              • Algunos comercios pueden aplicar un costo adicional por el
              servicio de entrega, el cual se mostrará claramente antes de
              confirmar la compra.
            </Text>
            <Text style={styles.bulletPoint}>
              • Proporcione una dirección completa y accesible dentro del área
              metropolitana de Panamá.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>5.2 Tiempos de Entrega</Text>
          <Text style={styles.bodyText}>Los tiempos varían según:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Ubicación del comercio y destino.
            </Text>
            <Text style={styles.bulletPoint}>
              • Modalidad de entrega seleccionada.
            </Text>
            <Text style={styles.bulletPoint}>
              • Disponibilidad del comercio.
            </Text>
            <Text style={styles.bulletPoint}>
              • Condiciones climáticas y de tráfico.
            </Text>
          </View>

          {/* Section 6 */}
          <Text style={styles.sectionTitle}>6. PRECIOS Y FACTURACIÓN</Text>

          <Text style={styles.subsectionTitle}>6.1 Precios</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Todos los precios de los productos se muestran en Balboas (PAB)
              o Dólares estadounidenses (USD) y no incluyen el costo de entrega,
              en caso de que aplique.
            </Text>
            <Text style={styles.bulletPoint}>
              • Los productos alimenticios están exentos de ITBMS, por lo que
              los precios mostrados son finales respecto al producto.
            </Text>
            <Text style={styles.bulletPoint}>
              • Los precios pueden variar sin previo aviso hasta la confirmación
              del pedido.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            6.2 Facturación Electrónica
          </Text>
          <Text style={styles.bodyText}>
            Cumpliendo con la normativa de la Dirección General de Ingresos
            (DGI) de Panamá:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Emitimos factura electrónica por cada transacción.
            </Text>
            <Text style={styles.bulletPoint}>
              • La factura se envía al correo registrado en su cuenta.
            </Text>
            <Text style={styles.bulletPoint}>
              • Conserve su factura para efectos fiscales y garantías.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>6.3 Procesamiento de Pagos</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Los pagos se procesan a través de pasarelas de pago
              certificadas.
            </Text>
            <Text style={styles.bulletPoint}>
              • <Text style={styles.brandName}>AhorraFood</Text> actúa como
              intermediario en el cobro en nombre de los comercios.
            </Text>
            <Text style={styles.bulletPoint}>
              • El cargo se realiza únicamente al momento de confirmar el pedido
              a través de la plataforma, mediante los métodos de pago
              habilitados. No se aceptan pagos en efectivo ni pagos posteriores
              a la entrega.
            </Text>
          </View>

          {/* Section 7 */}
          <Text style={styles.sectionTitle}>7. CANCELACIONES Y REEMBOLSOS</Text>

          <Text style={styles.subsectionTitle}>
            7.1 Cancelación por el Usuario
          </Text>
          <Text style={styles.bodyTextBold}>
            POLÍTICA ESTRICTA DE NO CANCELACIÓN:
          </Text>
          <Text style={styles.bodyText}>
            Una vez confirmado y aceptado el pedido por el comercio, NO podrá
            cancelarse ni reembolsarse, excepto en los siguientes casos:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • El comercio no entregue el producto en el tiempo establecido.
            </Text>
            <Text style={styles.bulletPoint}>
              • El producto entregado no coincida con lo publicado.
            </Text>
            <Text style={styles.bulletPoint}>
              • El producto esté en mal estado al momento de la entrega o
              recogida, aun cuando no haya superado la fecha de vencimiento
              indicada.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            7.2 Cancelación por el Comercio
          </Text>
          <Text style={styles.bodyText}>
            Los comercios pueden cancelar cuando:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • No dispongan del producto por agotamiento inesperado.
            </Text>
            <Text style={styles.bulletPoint}>
              • Existan circunstancias imprevistas que impidan la venta.
            </Text>
            <Text style={styles.bulletPoint}>
              • El producto no cumpla con estándares de calidad.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>7.3 Reembolsos</Text>
          <Text style={styles.bodyTextBold}>
            PROCESO DE REEMBOLSO EXCEPCIONAL:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Las solicitudes de reembolso solo proceden en los casos
              establecidos en el punto 7.1.
            </Text>
            <Text style={styles.bulletPoint}>
              • Deben presentarse dentro de 24 horas posteriores a la entrega o
              recogida fallida.
            </Text>
            <Text style={styles.bulletPoint}>
              • Requieren evidencia fotográfica y descripción detallada del
              problema.
            </Text>
            <Text style={styles.bulletPoint}>
              • El equipo de soporte analizará cada caso contactando a ambas
              partes.
            </Text>
            <Text style={styles.bulletPoint}>
              • Los reembolsos aprobados se procesan en 5 a 10 días hábiles.
            </Text>
          </View>

          {/* Section 8 */}
          <Text style={styles.sectionTitle}>
            8. CALIDAD Y SEGURIDAD ALIMENTARIA
          </Text>

          <Text style={styles.subsectionTitle}>
            8.1 Responsabilidad Exclusiva de los Comercios
          </Text>
          <Text style={styles.bodyText}>
            Los comercios afiliados son exclusivamente responsables de:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Normativas Sanitarias: Cumplir con todas las regulaciones de
              MINSA, AUPSA y demás autoridades competentes.
            </Text>
            <Text style={styles.bulletPoint}>
              • Calidad del Producto: Garantizar que los alimentos estén en
              condiciones higiénicas y aptas para consumo.
            </Text>
            <Text style={styles.bulletPoint}>
              • Información Veraz: Publicar datos exactos sobre productos,
              incluyendo fechas de vencimiento, ingredientes y alérgenos.
            </Text>
            <Text style={styles.bulletPoint}>
              • Facturación: Emitir comprobantes de venta según su régimen
              fiscal y normativas de la DGI.
            </Text>
            <Text style={styles.bulletPoint}>
              • Entrega Oportuna: Entregar productos en las condiciones y
              tiempos publicados.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            8.2 Verificación del Usuario
          </Text>
          <Text style={styles.bodyText}>Es su obligación verificar:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • La información del producto antes de confirmar la compra.
            </Text>
            <Text style={styles.bulletPoint}>
              • El estado del producto al momento de recibirlo o retirarlo.
            </Text>
            <Text style={styles.bulletPoint}>
              • Las fechas de vencimiento y condiciones de conservación.
            </Text>
            <Text style={styles.bulletPoint}>
              • Cualquier duda sobre alérgenos o ingredientes directamente con
              el comercio.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            8.3 Productos Próximos a Vencer
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Todos los productos están claramente identificados con su fecha
              de vencimiento.
            </Text>
            <Text style={styles.bulletPoint}>
              • Consuma los productos antes de la fecha indicada.
            </Text>
            <Text style={styles.bulletPoint}>
              • Los productos próximos a vencer mantienen su calidad nutricional
              y seguridad.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            8.4 Veracidad de Imágenes y Control de Calidad Digital
          </Text>
          <Text style={styles.bodyText}>
            Con el fin de garantizar la transparencia y confianza en la
            plataforma, <Text style={styles.brandName}>AhorraFood</Text>{" "}
            establece las siguientes condiciones obligatorias para los comercios
            afiliados al momento de publicar imágenes de productos alimenticios
            preparados:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Fuente de la imagen: Para publicaciones de alimentos calientes o
              listos para consumo inmediato, solo se permite el uso de
              fotografías tomadas directamente desde la cámara del dispositivo
              al momento de la publicación. No se permite cargar imágenes desde
              la galería, ni reutilizar imágenes de internet o anteriores.
            </Text>
            <Text style={styles.bulletPoint}>
              • Verificación de metadatos:{" "}
              <Text style={styles.brandName}>AhorraFood</Text> podrá implementar
              herramientas de verificación automática de metadatos (fecha, hora,
              ubicación, dispositivo) para validar la autenticidad de las
              imágenes. La detección de incongruencias podrá derivar en
              sanciones.
            </Text>
            <Text style={styles.bulletPoint}>
              • Advertencias visibles: Se mostrará un aviso previo al comercio
              antes de subir la fotografía, recordando la obligación de que la
              imagen sea reciente y auténtica.
            </Text>
            <Text style={styles.bulletPoint}>
              • Sistema de reportes: Los usuarios podrán reportar imágenes
              engañosas o inconsistentes. El equipo de soporte analizará cada
              caso de forma objetiva.
            </Text>
          </View>

          <Text style={styles.bodyTextBold}>Sanciones progresivas:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              1. Primera infracción: Advertencia y solicitud de corrección
              inmediata.
            </Text>
            <Text style={styles.bulletPoint}>
              2. Reincidencia: Suspensión temporal de la cuenta del comercio.
            </Text>
            <Text style={styles.bulletPoint}>
              3. Reiteración grave o sistemática: Inclusión en la lista negra
              interna de comercios no confiables, con posibilidad de exclusión
              definitiva.
            </Text>
          </View>

          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Recuperación de la lista negra: Los comercios incluidos en la
              lista negra podrán solicitar una revisión una vez transcurrido un
              período de 30 días, aportando evidencia de mejoras en sus
              prácticas.
            </Text>
            <Text style={styles.bulletPoint}>
              • Reconocimiento a buenas prácticas:{" "}
              <Text style={styles.brandName}>AhorraFood</Text> se reserva el
              derecho de recompensar o destacar públicamente a los comercios con
              historial limpio y cumplimiento ejemplar, mediante beneficios
              promocionales o puntos de fidelidad adicionales.
            </Text>
          </View>

          {/* Section 9 */}
          <Text style={styles.sectionTitle}>
            9. SISTEMA DE CALIFICACIONES Y COMENTARIOS
          </Text>

          <Text style={styles.subsectionTitle}>9.1 Calificaciones</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Puede calificar su experiencia con comercios y productos.
            </Text>
            <Text style={styles.bulletPoint}>
              • Las calificaciones deben ser honestas y basadas en su
              experiencia real.
            </Text>
            <Text style={styles.bulletPoint}>
              • No publique contenido ofensivo, discriminatorio o difamatorio.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>9.2 Moderación</Text>
          <Text style={styles.bodyText}>
            <Text style={styles.brandName}>AhorraFood</Text> se reserva el
            derecho de:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Moderar y eliminar comentarios inapropiados.
            </Text>
            <Text style={styles.bulletPoint}>
              • Suspender cuentas que publiquen contenido abusivo.
            </Text>
            <Text style={styles.bulletPoint}>
              • Verificar la autenticidad de las calificaciones.
            </Text>
          </View>

          {/* Section 10 */}
          <Text style={styles.sectionTitle}>
            10. PROGRAMA DE FIDELIDAD Y RECOMPENSAS
          </Text>

          <Text style={styles.subsectionTitle}>
            10.1 <Text style={styles.brandName}>AhorraFood</Text> Points
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Acumule puntos por cada compra realizada.
            </Text>
            <Text style={styles.bulletPoint}>
              • Participe en sorteos mensuales exclusivos.
            </Text>
            <Text style={styles.bulletPoint}>
              • Acceda a descuentos especiales y promociones.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>10.2 Impacto Ambiental</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Visualice su contribución a la reducción del desperdicio
              alimentario.
            </Text>
            <Text style={styles.bulletPoint}>
              • Reciba reportes de su impacto ambiental positivo.
            </Text>
            <Text style={styles.bulletPoint}>
              • Participe en actividades de conciencia ambiental.
            </Text>
          </View>

          {/* Section 11 */}
          <Text style={styles.sectionTitle}>
            11. OBLIGACIONES Y PROHIBICIONES
          </Text>

          <Text style={styles.subsectionTitle}>11.1 Uso Permitido</Text>
          <Text style={styles.bodyText}>
            La plataforma debe utilizarse únicamente para:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Adquirir alimentos para consumo personal o familiar.
            </Text>
            <Text style={styles.bulletPoint}>
              • Interactuar de manera respetuosa con comercios y otros usuarios.
            </Text>
            <Text style={styles.bulletPoint}>
              • Proporcionar información veraz en calificaciones y comentarios.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>11.2 Uso Prohibido</Text>
          <Text style={styles.bodyText}>Está prohibido:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Utilizar la plataforma para fines comerciales no autorizados.
            </Text>
            <Text style={styles.bulletPoint}>
              • Revender productos adquiridos en{" "}
              <Text style={styles.brandName}>AhorraFood</Text>.
            </Text>
            <Text style={styles.bulletPoint}>
              • Realizar compras masivas que afecten la disponibilidad para
              otros usuarios.
            </Text>
            <Text style={styles.bulletPoint}>
              • Utilizar sistemas automatizados para realizar pedidos.
            </Text>
            <Text style={styles.bulletPoint}>
              • Interferir con el funcionamiento de la plataforma.
            </Text>
          </View>

          {/* Section 12 */}
          <Text style={styles.sectionTitle}>
            12. PROTECCIÓN DE DATOS PERSONALES
          </Text>

          <Text style={styles.subsectionTitle}>12.1 Cumplimiento Legal</Text>
          <Text style={styles.bodyText}>
            Cumplimos con la Ley 81 de 2019 sobre Protección de Datos Personales
            de Panamá y nuestra Política de Privacidad, disponible en [ENLACE].
          </Text>

          <Text style={styles.subsectionTitle}>12.2 Tratamiento de Datos</Text>
          <Text style={styles.bodyText}>
            Sus datos personales se utilizan para:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Procesar pedidos y facilitar transacciones.
            </Text>
            <Text style={styles.bulletPoint}>
              • Mejorar nuestros servicios y experiencia de usuario.
            </Text>
            <Text style={styles.bulletPoint}>
              • Cumplir obligaciones legales y fiscales.
            </Text>
            <Text style={styles.bulletPoint}>
              • Enviar comunicaciones relacionadas con el servicio.
            </Text>
          </View>

          {/* Section 13 */}
          <Text style={styles.sectionTitle}>13. PROPIEDAD INTELECTUAL</Text>

          <Text style={styles.subsectionTitle}>
            13.1 Derechos de <Text style={styles.brandName}>AhorraFood</Text>
          </Text>
          <Text style={styles.bodyText}>
            Son propiedad exclusiva de{" "}
            <Text style={styles.brandName}>AhorraFood</Text>:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • La marca, logotipo y elementos de identidad corporativa.
            </Text>
            <Text style={styles.bulletPoint}>
              • El software, aplicaciones y tecnología de la plataforma.
            </Text>
            <Text style={styles.bulletPoint}>
              • El contenido editorial y materiales promocionales.
            </Text>
            <Text style={styles.bulletPoint}>
              • Las bases de datos y algoritmos.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>13.2 Licencia de Uso</Text>
          <Text style={styles.bodyText}>
            Se le concede una licencia limitada, no exclusiva e intransferible
            para utilizar la plataforma conforme a estos términos.
          </Text>

          {/* Section 14 */}
          <Text style={styles.sectionTitle}>
            14. LIMITACIÓN DE RESPONSABILIDAD
          </Text>

          <Text style={styles.subsectionTitle}>
            14.1 Exclusión Total de Responsabilidad
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.brandName}>AhorraFood</Text> NO es responsable
            directa o indirectamente por:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Calidad del Producto: Seguridad, idoneidad, frescura o estado de
              los alimentos.
            </Text>
            <Text style={styles.bulletPoint}>
              • Daños a la Salud: Intoxicaciones, reacciones alérgicas o
              cualquier efecto adverso del consumo.
            </Text>
            <Text style={styles.bulletPoint}>
              • Incumplimientos del Comercio: Retrasos, fallos logísticos o
              productos defectuosos.
            </Text>
            <Text style={styles.bulletPoint}>
              • Problemas Técnicos: Caídas del sistema, errores de conectividad
              o fallas de la plataforma.
            </Text>
            <Text style={styles.bulletPoint}>
              • Pérdidas Económicas: Lucro cesante, daños indirectos o
              consecuenciales.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>14.2 Servicio de Mediación</Text>
          <Text style={styles.bodyText}>
            Sin perjuicio de la exclusión anterior,{" "}
            <Text style={styles.brandName}>AhorraFood</Text> ofrece:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Soporte técnico para problemas de la plataforma.
            </Text>
            <Text style={styles.bulletPoint}>
              • Canal de mediación objetiva para resolver conflictos entre
              usuarios y comercios.
            </Text>
            <Text style={styles.bulletPoint}>
              • Análisis caso por caso de reclamaciones justificadas.
            </Text>
          </View>

          {/* Section 15 */}
          <Text style={styles.sectionTitle}>
            15. RESOLUCIÓN DE CONTROVERSIAS
          </Text>

          <Text style={styles.subsectionTitle}>15.1 Atención al Cliente</Text>
          <Text style={styles.bodyText}>
            Para resolver cualquier inconveniente:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              1. Contacte nuestro servicio de atención al cliente a través de la
              aplicación.
            </Text>
            <Text style={styles.bulletPoint}>
              2. Proporcione toda la información relevante.
            </Text>
            <Text style={styles.bulletPoint}>
              3. Recibirá respuesta en un plazo máximo de 48 horas.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            15.2 Jurisdicción y Ley Aplicable
          </Text>
          <Text style={styles.bodyText}>
            Estos términos se rigen por las leyes de la República de Panamá.
            Cualquier controversia será sometida a los tribunales competentes de
            la República de Panamá, Distrito Judicial de Panamá.
          </Text>

          <Text style={styles.subsectionTitle}>15.3 Arbitraje</Text>
          <Text style={styles.bodyText}>
            Las controversias por montos superiores a B/.1,000.00 podrán
            someterse a arbitraje ante el Centro de Arbitraje de la Cámara de
            Comercio, Industrias y Agricultura de Panamá.
          </Text>

          {/* Section 16 */}
          <Text style={styles.sectionTitle}>16. SUSPENSIÓN Y TERMINACIÓN</Text>

          <Text style={styles.subsectionTitle}>16.1 Suspensión de Cuenta</Text>
          <Text style={styles.bodyText}>Podemos suspender su cuenta por:</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Incumplimiento de estos términos.
            </Text>
            <Text style={styles.bulletPoint}>
              • Uso fraudulento o abusivo de la plataforma.
            </Text>
            <Text style={styles.bulletPoint}>
              • Comportamiento irrespetuoso hacia comercios o personal.
            </Text>
            <Text style={styles.bulletPoint}>
              • Actividades que pongan en riesgo la seguridad de la plataforma.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>16.2 Terminación</Text>
          <Text style={styles.bodyText}>
            Tanto usted como <Text style={styles.brandName}>AhorraFood</Text>{" "}
            pueden terminar la relación contractual en cualquier momento. La
            terminación no afecta las obligaciones pendientes de cumplimiento.
          </Text>

          {/* Section 17 */}
          <Text style={styles.sectionTitle}>17. MODIFICACIONES</Text>

          <Text style={styles.subsectionTitle}>
            17.1 Actualización de Términos
          </Text>
          <Text style={styles.bodyText}>
            Podemos modificar estos términos cuando sea necesario. Los cambios
            se notificarán a través de:
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletPoint}>
              • Notificación en la aplicación.
            </Text>
            <Text style={styles.bulletPoint}>
              • Correo electrónico a la dirección registrada.
            </Text>
            <Text style={styles.bulletPoint}>
              • Publicación en nuestro sitio web.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>17.2 Vigencia</Text>
          <Text style={styles.bodyText}>
            Los nuevos términos entrarán en vigor 15 días después de su
            notificación. Su uso continuado de la plataforma constituye
            aceptación de los términos modificados.
          </Text>

          {/* Section 18 */}
          <Text style={styles.sectionTitle}>18. DISPOSICIONES FINALES</Text>

          <Text style={styles.subsectionTitle}>18.1 Divisibilidad</Text>
          <Text style={styles.bodyText}>
            Si alguna disposición de estos términos es declarada inválida, las
            demás disposiciones mantendrán su plena vigencia.
          </Text>

          <Text style={styles.subsectionTitle}>
            18.2 Integridad del Acuerdo
          </Text>
          <Text style={styles.bodyText}>
            Estos términos, junto con la Política de Privacidad, constituyen el
            acuerdo completo entre las partes.
          </Text>

          <Text style={styles.subsectionTitle}>18.3 Cesión</Text>
          <Text style={styles.bodyText}>
            Usted no puede ceder sus derechos u obligaciones bajo estos términos
            sin nuestro consentimiento previo por escrito.
          </Text>
          <Text style={styles.footerText}>
            Al continuar utilizando{" "}
            <Text style={styles.brandName}>AhorraFood</Text>, confirma haber
            leído, entendido y aceptado estos Términos y Condiciones en su
            totalidad.
          </Text>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 1300, // Limita el ancho del contenido
    alignSelf: "center", // Centra el contenido horizontalmente
    width: "100%", // Permite que se adapte en pantallas pequeñas
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 8,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 16,
    lineHeight: 20,
  },
  introText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginTop: 24,
    marginBottom: 12,
    lineHeight: 22,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    gap: 6,
    marginTop: 5,
  },
  backIcon: {
    fontSize: 16,
    color: "#0f172a",
  },
  backText: {
    fontSize: 14,
    color: "#0f172a",
    fontWeight: "500",
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 20,
  },
  bodyTextBold: {
    fontSize: 14,
    color: "green",
    lineHeight: 20,
    marginBottom: 12,
    textAlign: "justify",
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 12,
    textAlign: "justify",
  },
  brandName: {
    color: "green",
    fontWeight: "600",
  },
  bulletContainer: {
    marginLeft: 8,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 6,
    textAlign: "justify",
  },
  importantText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 16,
    fontWeight: "600",
    textAlign: "justify",
  },
  footerText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginTop: 32,
    textAlign: "justify",
    fontStyle: "italic",
  },
});

export default TerminosCondiciones;
