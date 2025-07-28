import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useRouter } from "expo-router";
const PrivacyPolicyScreen = () => {
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            POLÍTICA DE PRIVACIDAD DE AhorraFood
          </Text>
          <Text style={styles.bodyText}>
            {" "}
            En vigor a partir del 28 de julio de 2025.
          </Text>
          <Text style={styles.bodyText}>
            {" "}
            Al registrarse, acceder o utilizar nuestros servicios, usted acepta
            esta Política.
          </Text>

          <Text style={styles.sectionTitle}>1. INTRODUCCIÓN</Text>

          <Text style={styles.subsectionTitle}>
            1.1 Nuestra Misión y Compromiso
          </Text>
          <Text style={styles.bodyText}>
            En AhorraFood tenemos la misión de reducir el desperdicio de
            alimentos en Panamá conectando comercios con excedentes alimentarios
            con consumidores que buscan productos de calidad a precios
            accesibles. Bajo nuestro eslogan "Mata el hambre, salva el bolsillo,
            hacerlo con AhorraFood es sencillo", estamos comprometidos con la
            protección de su privacidad y el manejo responsable de sus datos
            personales.
          </Text>

          <Text style={styles.subsectionTitle}>
            1.2 Acerca de Esta Política
          </Text>
          <Text style={styles.bodyText}>
            Esta Política de Privacidad explica cómo AhorraFood, recopila,
            utiliza, almacena y protege los datos personales de nuestros
            usuarios, comercios afiliados y demás personas que interactúan con
            nuestra plataforma de comercio electrónico.
          </Text>

          <Text style={styles.subsectionTitle}>1.3 Cumplimiento Legal</Text>
          <Text style={styles.bodyText}>Esta Política cumple con:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Ley 81 de 2019 "Sobre Protección de Datos Personales" de la
              República de Panamá.
            </Text>
            <Text style={styles.bulletItem}>
              • Decreto Ejecutivo N° 285 de 2021 que reglamenta la Ley 81.
            </Text>
            <Text style={styles.bulletItem}>
              • Constitución Política de la República de Panamá (Art. 42 -
              Derecho a la intimidad).
            </Text>
            <Text style={styles.bulletItem}>
              • Código Judicial de Panamá en materia de Habeas Data.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. DEFINICIONES</Text>
          <Text style={styles.bodyText}>
            Para efectos de esta Política, entendemos por:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>"AhorraFood"</Text> o{" "}
              <Text style={styles.boldText}>"nosotros"</Text>: AhorraFood y sus
              servicios.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>"Plataforma"</Text>: La aplicación
              móvil, sitio web y servicios de AhorraFood.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>"Usuario"</Text>: Persona que
              utiliza la plataforma para adquirir productos.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>"Comercio"</Text>: Establecimiento
              que ofrece productos a través de la plataforma.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>"Datos Personales"</Text>:
              Información que identifica o hace identificable a una persona.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>"Datos Sensibles"</Text>:
              Información personal que requiere protección especial.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>"Tratamiento"</Text>: Cualquier
              operación realizada con datos personales.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>"Titular"</Text>: Persona a quien
              se refieren los datos personales.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. DATOS PERSONALES QUE RECOPILAMOS
          </Text>

          <Text style={styles.subsectionTitle}>
            3.1 Información Necesaria para el Servicio
          </Text>
          <Text style={styles.boldText}>Para Usuarios:</Text>
          <View style={styles.indentedList}>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Información de registro:</Text>{" "}
              Nombre completo, número de cédula o pasaporte, correo electrónico,
              número de teléfono.
            </Text>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Información de ubicación:</Text>{" "}
              Dirección de entrega, ubicación geográfica (con su
              consentimiento).
            </Text>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Información de pago:</Text> Datos de
              tarjeta de crédito/débito (procesados por terceros certificados).
            </Text>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Historial de compras:</Text>{" "}
              Productos adquiridos, fechas, montos, preferencias.
            </Text>
          </View>

          <Text style={styles.boldText}>Para Comercios:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Información empresarial:</Text>{" "}
              Razón social, RUC, número de aviso de operación, dirección del
              establecimiento.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Información de contacto:</Text>{" "}
              Nombre del representante, teléfono, correo electrónico.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Información bancaria:</Text>{" "}
              Cuenta para transferencias (procesada por terceros).
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Información fiscal:</Text> Datos
              necesarios para facturación electrónica.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            3.2 Información Recopilada Automáticamente
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Datos de navegación:</Text>{" "}
              Páginas visitadas, tiempo de sesión, productos visualizados.
            </Text>
            <Text style={styles.bulletItem}>
              •{" "}
              <Text style={styles.boldText}>Información del dispositivo:</Text>{" "}
              Tipo de dispositivo, sistema operativo, versión de la aplicación.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Datos de conexión:</Text>{" "}
              Dirección IP, proveedor de internet, ubicación aproximada.
            </Text>
            <Text style={styles.bulletItem}>
              •{" "}
              <Text style={styles.boldText}>
                Cookies y tecnologías similares:
              </Text>{" "}
              Para mejorar la experiencia del usuario.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            3.3 Información Adicional que Usted Proporciona
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Preferencias alimentarias:</Text>{" "}
              Restricciones dietéticas, alérgenos, productos favoritos.
            </Text>
            <Text style={styles.bulletItem}>
              •{" "}
              <Text style={styles.boldText}>Calificaciones y comentarios:</Text>{" "}
              Opiniones sobre productos y comercios.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Comunicaciones:</Text> Consultas
              al servicio al cliente, reportes, sugerencias.
            </Text>
            <Text style={styles.bulletItem}>
              •{" "}
              <Text style={styles.boldText}>Participación en promociones:</Text>{" "}
              Información para sorteos y programas de fidelidad.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            4. FINALIDADES DEL TRATAMIENTO
          </Text>

          <Text style={styles.subsectionTitle}>
            4.1 Prestación del Servicio
          </Text>
          <Text style={styles.bodyText}>
            Utilizamos sus datos personales para:
          </Text>
          <View style={styles.indentedList}>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Facilitar transacciones:</Text>{" "}
              Procesar pedidos, pagos y entregas.
            </Text>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Gestión de cuentas:</Text> Crear y
              mantener perfiles de usuario y comercio.
            </Text>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Personalización:</Text> Mostrar
              productos relevantes según ubicación y preferencias.
            </Text>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Comunicación:</Text> Notificaciones
              sobre pedidos, promociones y actualizaciones del servicio.
            </Text>
            <Text style={styles.bulletItem}>
              <Text style={styles.boldText}>Soporte técnico:</Text> Resolver
              consultas y problemas técnicos.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>4.2 Mejora del Servicio</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Análisis de uso:</Text> Entender
              cómo se utiliza la plataforma para mejoras.
            </Text>
            <Text style={styles.bulletItem}>
              •{" "}
              <Text style={styles.boldText}>
                Desarrollo de funcionalidades:
              </Text>{" "}
              Crear nuevas características basadas en necesidades.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Control de fraude:</Text> Detectar
              y prevenir actividades fraudulentas.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Seguridad:</Text> Proteger la
              integridad de la plataforma y usuarios.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            4.3 Marketing y Comunicación
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              •{" "}
              <Text style={styles.boldText}>Comunicaciones promocionales:</Text>{" "}
              Ofertas, descuentos y nuevos productos (con su consentimiento).
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Programa de fidelidad:</Text>{" "}
              Gestión de puntos "AhorraFood Points" y recompensas.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Educación ambiental:</Text>{" "}
              Información sobre impacto ecológico y sostenibilidad.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Encuestas de satisfacción:</Text>{" "}
              Evaluación de la calidad del servicio.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>4.4 Cumplimiento Legal</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Facturación electrónica:</Text>{" "}
              Cumplimiento con normativas de la DGI.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Reportes regulatorios:</Text>{" "}
              Información requerida por autoridades competentes.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Conservación de registros:</Text>{" "}
              Mantener registros según lo exige la ley.
            </Text>
            <Text style={styles.bulletItem}>
              • <Text style={styles.boldText}>Protección de derechos:</Text>{" "}
              Defensa legal cuando sea necesario.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            5. FUNDAMENTOS LEGALES PARA EL TRATAMIENTO
          </Text>
          <Text style={styles.bodyText}>
            Conforme a la Ley 81 de 2019, el tratamiento de sus datos se basa
            en:
          </Text>

          <Text style={styles.subsectionTitle}>
            5.1 Consentimiento Informado
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Registro voluntario en la plataforma.
            </Text>
            <Text style={styles.bulletItem}>
              • Aceptación expresa de términos y condiciones.
            </Text>
            <Text style={styles.bulletItem}>
              • Autorización para comunicaciones promocionales.
            </Text>
            <Text style={styles.bulletItem}>
              • Consentimiento para uso de ubicación.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>5.2 Ejecución de Contrato</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Procesamiento de pedidos y pagos.
            </Text>
            <Text style={styles.bulletItem}>
              • Prestación del servicio de intermediación.
            </Text>
            <Text style={styles.bulletItem}>
              • Cumplimiento de obligaciones contractuales.
            </Text>
            <Text style={styles.bulletItem}>
              • Gestión de entregas y devoluciones.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>5.3 Interés Legítimo</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Mejora y desarrollo de la plataforma.
            </Text>
            <Text style={styles.bulletItem}>
              • Prevención de fraude y seguridad.
            </Text>
            <Text style={styles.bulletItem}>
              • Análisis estadísticos anonimizados.
            </Text>
            <Text style={styles.bulletItem}>
              • Marketing directo (cuando no requiera consentimiento).
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>5.4 Cumplimiento Legal</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Facturación electrónica según normativas de la DGI.
            </Text>
            <Text style={styles.bulletItem}>
              • Conservación de registros contables.
            </Text>
            <Text style={styles.bulletItem}>
              • Cooperación con autoridades competentes.
            </Text>
            <Text style={styles.bulletItem}>
              • Protección de menores de edad.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            6. CON QUIÉN COMPARTIMOS SUS DATOS
          </Text>

          <Text style={styles.subsectionTitle}>6.1 Dentro de AhorraFood</Text>
          <Text style={styles.bodyText}>
            Los datos se comparten únicamente con personal autorizado que
            requiere acceso para:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Procesamiento de pedidos.</Text>
            <Text style={styles.bulletItem}>• Atención al cliente.</Text>
            <Text style={styles.bulletItem}>• Desarrollo tecnológico.</Text>
            <Text style={styles.bulletItem}>• Cumplimiento legal.</Text>
          </View>

          <Text style={styles.subsectionTitle}>6.2 Comercios Afiliados</Text>
          <Text style={styles.bodyText}>
            Compartimos información limitada necesaria para:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Procesamiento de pedidos específicos.
            </Text>
            <Text style={styles.bulletItem}>• Coordinar entregas.</Text>
            <Text style={styles.bulletItem}>
              • Facilitar comunicación directa.
            </Text>
            <Text style={styles.bulletItem}>• Gestionar devoluciones.</Text>
          </View>

          <Text style={styles.subsectionTitle}>
            6.3 Proveedores de Servicios
          </Text>
          <Text style={styles.boldText}>Procesamiento de Pagos:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Pasarelas de pago certificadas (cumpliendo PCI DSS).
            </Text>
            <Text style={styles.bulletItem}>
              • Bancos y emisores de tarjetas.
            </Text>
            <Text style={styles.bulletItem}>
              • Billeteras digitales autorizadas.
            </Text>
          </View>

          <Text style={styles.boldText}>Servicios Tecnológicos:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Hosting y almacenamiento en la nube.
            </Text>
            <Text style={styles.bulletItem}>
              • Servicios de mensajería y notificaciones.
            </Text>
            <Text style={styles.bulletItem}>
              • Análisis de datos y estadísticas.
            </Text>
            <Text style={styles.bulletItem}>
              • Seguridad y prevención de fraude.
            </Text>
          </View>

          <Text style={styles.boldText}>Servicios Logísticos:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Empresas de delivery y mensajería.
            </Text>
            <Text style={styles.bulletItem}>
              • Servicios de geolocalización.
            </Text>
            <Text style={styles.bulletItem}>
              • Proveedores de mapas y rutas.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            6.4 Autoridades Competentes
          </Text>
          <Text style={styles.bodyText}>
            Cuando sea requerido por ley o para:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Investigaciones judiciales.</Text>
            <Text style={styles.bulletItem}>• Procesos administrativos.</Text>
            <Text style={styles.bulletItem}>• Cumplimiento fiscal.</Text>
            <Text style={styles.bulletItem}>
              • Protección de derechos fundamentales.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>6.5 Nunca Compartimos</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • No vendemos datos personales a terceros.
            </Text>
            <Text style={styles.bulletItem}>
              • No compartimos información con fines comerciales sin
              consentimiento.
            </Text>
            <Text style={styles.bulletItem}>
              • No transferimos datos sensibles salvo casos legalmente
              justificados.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            7. TRANSFERENCIAS INTERNACIONALES
          </Text>

          <Text style={styles.subsectionTitle}>7.1 Principio General</Text>
          <Text style={styles.bodyText}>
            Sus datos se procesan principalmente en servidores ubicados en
            Panamá. Cualquier transferencia internacional cumple con:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Adecuación del país de destino según estándares internacionales.
            </Text>
            <Text style={styles.bulletItem}>
              • Cláusulas contractuales de protección de datos.
            </Text>
            <Text style={styles.bulletItem}>
              • Certificaciones de seguridad del proveedor.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>7.2 Casos Específicos</Text>
          <Text style={styles.boldText}>Servicios en la Nube:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Proveedores certificados con presencia regional.
            </Text>
            <Text style={styles.bulletItem}>
              • Centros de datos con certificaciones ISO 27001.
            </Text>
            <Text style={styles.bulletItem}>
              • Contratos que garantizan protección equivalente.
            </Text>
          </View>

          <Text style={styles.boldText}>Pagos Internacionales:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Redes de pago globales (Visa, MasterCard).
            </Text>
            <Text style={styles.bulletItem}>
              • Cumplimiento con estándares PCI DSS.
            </Text>
            <Text style={styles.bulletItem}>
              • Protocolos de seguridad bancaria internacional.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. TIEMPO DE CONSERVACIÓN</Text>

          <Text style={styles.subsectionTitle}>
            8.1 Criterios de Conservación
          </Text>
          <Text style={styles.bodyText}>Conservamos sus datos mientras:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Mantenga una cuenta activa en la plataforma.
            </Text>
            <Text style={styles.bulletItem}>
              • Sea necesario para cumplir obligaciones legales.
            </Text>
            <Text style={styles.bulletItem}>
              • Existan reclamaciones pendientes.
            </Text>
            <Text style={styles.bulletItem}>
              • Sea requerido para defensa legal.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>8.2 Períodos Específicos</Text>
          <Text style={styles.boldText}>Datos de Usuario Activo:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Durante la vigencia de la cuenta.
            </Text>
            <Text style={styles.bulletItem}>
              • 6 meses después de inactividad (con aviso previo).
            </Text>
          </View>

          <Text style={styles.boldText}>Registros Contables y Fiscales:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • 5 años según Código de Comercio panameño.
            </Text>
            <Text style={styles.bulletItem}>
              • 7 años para efectos fiscales (DGI).
            </Text>
          </View>

          <Text style={styles.boldText}>Datos de Marketing:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Hasta revocación del consentimiento.
            </Text>
            <Text style={styles.bulletItem}>
              • Máximo 2 años sin actividad.
            </Text>
          </View>

          <Text style={styles.boldText}>Registros de Seguridad:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• 1 año para logs de acceso.</Text>
            <Text style={styles.bulletItem}>
              • 3 años para incidentes de seguridad.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>8.3 Eliminación Segura</Text>
          <Text style={styles.bodyText}>
            Al vencer los períodos, los datos se eliminan mediante:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Borrado seguro de bases de datos.
            </Text>
            <Text style={styles.bulletItem}>
              • Destrucción física de medios de almacenamiento.
            </Text>
            <Text style={styles.bulletItem}>
              • Certificación de eliminación por terceros.
            </Text>
            <Text style={styles.bulletItem}>
              • Anonimización irreversible cuando sea aplicable.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. MEDIDAS DE SEGURIDAD</Text>

          <Text style={styles.subsectionTitle}>9.1 Seguridad Técnica</Text>
          <Text style={styles.boldText}>Protección de Datos:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Cifrado AES-256 para datos en reposo.
            </Text>
            <Text style={styles.bulletItem}>
              • TLS 1.3 para transmisión de datos.
            </Text>
            <Text style={styles.bulletItem}>
              • Firewalls y sistemas de detección de intrusiones.
            </Text>
            <Text style={styles.bulletItem}>
              • Backup automático con cifrado.
            </Text>
          </View>

          <Text style={styles.boldText}>Control de Acceso:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Autenticación multifactor para administradores.
            </Text>
            <Text style={styles.bulletItem}>
              • Principio de menor privilegio.
            </Text>
            <Text style={styles.bulletItem}>• Auditoría de accesos.</Text>
            <Text style={styles.bulletItem}>• Sesiones con tiempo límite.</Text>
          </View>

          <Text style={styles.boldText}>Monitoreo Continuo:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Detección de amenazas 24/7.</Text>
            <Text style={styles.bulletItem}>
              • Análisis de comportamiento anómalo.
            </Text>
            <Text style={styles.bulletItem}>
              • Respuesta automática a incidentes.
            </Text>
            <Text style={styles.bulletItem}>
              • Actualizaciones de seguridad regulares.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            9.2 Seguridad Organizacional
          </Text>
          <Text style={styles.boldText}>Personal:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Acuerdos de confidencialidad.
            </Text>
            <Text style={styles.bulletItem}>
              • Capacitación en protección de datos.
            </Text>
            <Text style={styles.bulletItem}>
              • Verificación de antecedentes.
            </Text>
            <Text style={styles.bulletItem}>• Acceso basado en roles.</Text>
          </View>

          <Text style={styles.boldText}>Procesos:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Políticas internas de seguridad.
            </Text>
            <Text style={styles.bulletItem}>
              • Procedimientos de respuesta a incidentes.
            </Text>
            <Text style={styles.bulletItem}>
              • Revisiones de seguridad periódicas.
            </Text>
            <Text style={styles.bulletItem}>
              • Certificaciones internacionales.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>9.3 Respuesta a Incidentes</Text>
          <Text style={styles.bodyText}>En caso de brecha de seguridad:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Contención inmediata del incidente.
            </Text>
            <Text style={styles.bulletItem}>• Evaluación del impacto.</Text>
            <Text style={styles.bulletItem}>
              • Notificación a autoridades (72 horas).
            </Text>
            <Text style={styles.bulletItem}>
              • Comunicación a afectados cuando proceda.
            </Text>
            <Text style={styles.bulletItem}>
              • Medidas correctivas y preventivas.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. SUS DERECHOS COMO TITULAR</Text>

          <Text style={styles.subsectionTitle}>
            10.1 Derechos Fundamentales
          </Text>
          <Text style={styles.bodyText}>
            Conforme a la Ley 81 de 2019, usted tiene derecho a:
          </Text>

          <Text style={styles.boldText}>Acceso:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Conocer qué datos tenemos sobre usted.
            </Text>
            <Text style={styles.bulletItem}>
              • Obtener copia de sus datos personales.
            </Text>
            <Text style={styles.bulletItem}>
              • Información sobre el tratamiento realizado.
            </Text>
          </View>

          <Text style={styles.boldText}>Rectificación:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Corregir datos inexactos o incompletos.
            </Text>
            <Text style={styles.bulletItem}>
              • Actualizar información desactualizada.
            </Text>
            <Text style={styles.bulletItem}>• Modificar datos erróneos.</Text>
          </View>

          <Text style={styles.boldText}>Cancelación:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Eliminar datos cuando no sean necesarios.
            </Text>
            <Text style={styles.bulletItem}>
              • Borrar información tratada ilegalmente.
            </Text>
            <Text style={styles.bulletItem}>
              • Suprimir datos cuando retire consentimiento.
            </Text>
          </View>

          <Text style={styles.boldText}>Oposición:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Negarse a tratamientos específicos.
            </Text>
            <Text style={styles.bulletItem}>
              • Revocar consentimientos otorgados.
            </Text>
            <Text style={styles.bulletItem}>
              • Oponerse a marketing directo.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>10.2 Derechos Adicionales</Text>
          <Text style={styles.boldText}>Portabilidad:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Recibir datos en formato estructurado.
            </Text>
            <Text style={styles.bulletItem}>
              • Transferir datos a otro proveedor.
            </Text>
            <Text style={styles.bulletItem}>• Migración facilitada.</Text>
          </View>

          <Text style={styles.boldText}>Limitación:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Restringir ciertos tratamientos.
            </Text>
            <Text style={styles.bulletItem}>
              • Suspender procesamiento mientras se verifica legalidad.
            </Text>
            <Text style={styles.bulletItem}>
              • Bloquear datos controvertidos.
            </Text>
          </View>

          <Text style={styles.boldText}>No Discriminación:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • No ser discriminado por ejercer sus derechos.
            </Text>
            <Text style={styles.bulletItem}>
              • Mantener calidad del servicio.
            </Text>
            <Text style={styles.bulletItem}>• Trato equitativo.</Text>
          </View>

          <Text style={styles.subsectionTitle}>10.3 Ejercicio de Derechos</Text>
          <Text style={styles.boldText}>Métodos Disponibles:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Aplicación móvil: Configuración de cuenta → Privacidad
            </Text>
            <Text style={styles.bulletItem}>
              • Correo electrónico: privacidad@ahorrafood.com
            </Text>
            <Text style={styles.bulletItem}>
              • Formulario web: www.ahorrafood.com/privacidad
            </Text>
          </View>

          <Text style={styles.boldText}>Información Requerida:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Nombre completo y documento de identidad.
            </Text>
            <Text style={styles.bulletItem}>
              • Descripción clara del derecho a ejercer.
            </Text>
            <Text style={styles.bulletItem}>
              • Documentos que acrediten identidad.
            </Text>
            <Text style={styles.bulletItem}>
              • Especificación de datos involucrados.
            </Text>
          </View>

          <Text style={styles.boldText}>Tiempos de Respuesta:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Acceso: Hasta 15 días hábiles.
            </Text>
            <Text style={styles.bulletItem}>
              • Rectificación: Hasta 5 días hábiles.
            </Text>
            <Text style={styles.bulletItem}>
              • Cancelación: Hasta 15 días hábiles.
            </Text>
            <Text style={styles.bulletItem}>
              • Oposición: Inmediato cuando sea procedente.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. DATOS SENSIBLES</Text>

          <Text style={styles.subsectionTitle}>11.1 Política General</Text>
          <Text style={styles.bodyText}>
            AhorraFood NO recopila intencionalmente datos sensibles tales como:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Información sobre salud física o mental.
            </Text>
            <Text style={styles.bulletItem}>• Origen racial o étnico.</Text>
            <Text style={styles.bulletItem}>
              • Opiniones políticas o religiosas.
            </Text>
            <Text style={styles.bulletItem}>• Orientación sexual.</Text>
            <Text style={styles.bulletItem}>• Información biométrica.</Text>
          </View>

          <Text style={styles.subsectionTitle}>11.2 Casos Excepcionales</Text>
          <Text style={styles.bodyText}>
            Si usted proporciona información sensible por iniciativa propia
            (ejemplo: alergias alimentarias en consultas de soporte), esta se
            tratará:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Solo para la finalidad específica comunicada.
            </Text>
            <Text style={styles.bulletItem}>
              • Con medidas de seguridad reforzadas.
            </Text>
            <Text style={styles.bulletItem}>
              • Por tiempo estrictamente necesario.
            </Text>
            <Text style={styles.bulletItem}>
              • Con posibilidad de eliminación inmediata.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            11.3 Geolocalización Precisa
          </Text>
          <Text style={styles.bodyText}>
            La ubicación exacta se considera dato sensible y requiere:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Consentimiento expreso del usuario.
            </Text>
            <Text style={styles.bulletItem}>
              • Finalidad específica: Mostrar comercios cercanos.
            </Text>
            <Text style={styles.bulletItem}>
              • Control total: Puede desactivarse en cualquier momento.
            </Text>
            <Text style={styles.bulletItem}>
              • Alternativas: Ingreso manual de ubicación.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. PROTECCIÓN DE MENORES</Text>

          <Text style={styles.subsectionTitle}>
            12.1 Política de Edad Mínima
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • AhorraFood está dirigido a mayores de 18 años.
            </Text>
            <Text style={styles.bulletItem}>
              • No recopilamos intencionalmente datos de menores.
            </Text>
            <Text style={styles.bulletItem}>
              • Verificación de edad en el proceso de registro.
            </Text>
            <Text style={styles.bulletItem}>
              • Sistemas de detección y eliminación automática.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>12.2 Uso por Menores</Text>
          <Text style={styles.bodyText}>
            Si un menor utiliza la plataforma:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Supervisión parental obligatoria.
            </Text>
            <Text style={styles.bulletItem}>
              • Responsabilidad de padres o tutores.
            </Text>
            <Text style={styles.bulletItem}>
              • Comunicaciones dirigidas al adulto responsable.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            12.3 Detección y Eliminación
          </Text>
          <Text style={styles.bodyText}>Si detectamos uso por menores:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Suspensión inmediata de la cuenta.
            </Text>
            <Text style={styles.bulletItem}>
              • Eliminación de datos recopilados.
            </Text>
            <Text style={styles.bulletItem}>
              • Contacto con representantes legales.
            </Text>
            <Text style={styles.bulletItem}>
              • Medidas preventivas adicionales.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            13. COOKIES Y TECNOLOGÍAS SIMILARES
          </Text>

          <Text style={styles.subsectionTitle}>13.1 Tipos de Cookies</Text>
          <Text style={styles.boldText}>Cookies Necesarias:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Funcionamiento básico de la plataforma.
            </Text>
            <Text style={styles.bulletItem}>• Seguridad y autenticación.</Text>
            <Text style={styles.bulletItem}>• Configuraciones de sesión.</Text>
            <Text style={styles.bulletItem}>
              • No requieren consentimiento.
            </Text>
          </View>

          <Text style={styles.boldText}>Cookies de Rendimiento:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Análisis de uso y navegación.
            </Text>
            <Text style={styles.bulletItem}>
              • Optimización de la plataforma.
            </Text>
            <Text style={styles.bulletItem}>• Estadísticas anónimas.</Text>
            <Text style={styles.bulletItem}>• Requieren consentimiento.</Text>
          </View>

          <Text style={styles.boldText}>Cookies de Marketing:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Personalización de ofertas.</Text>
            <Text style={styles.bulletItem}>• Publicidad dirigida.</Text>
            <Text style={styles.bulletItem}>
              • Seguimiento de conversiones.
            </Text>
            <Text style={styles.bulletItem}>
              • Requieren consentimiento expreso.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>13.2 Gestión de Cookies</Text>
          <Text style={styles.boldText}>Control Total:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Configuración en la aplicación.
            </Text>
            <Text style={styles.bulletItem}>• Opciones del navegador web.</Text>
            <Text style={styles.bulletItem}>• Herramientas de privacidad.</Text>
            <Text style={styles.bulletItem}>• Eliminación manual.</Text>
          </View>

          <Text style={styles.boldText}>Transparencia:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Lista completa de cookies utilizadas.
            </Text>
            <Text style={styles.bulletItem}>
              • Finalidad específica de cada una.
            </Text>
            <Text style={styles.bulletItem}>
              • Duración del almacenamiento.
            </Text>
            <Text style={styles.bulletItem}>
              • Proveedores terceros involucrados.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>13.3 Tecnologías Similares</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Pixels de seguimiento: Solo para servicios esenciales.
            </Text>
            <Text style={styles.bulletItem}>
              • Almacenamiento local: Configuraciones del usuario.
            </Text>
            <Text style={styles.bulletItem}>
              • Identificadores de dispositivo: Prevención de fraude.
            </Text>
            <Text style={styles.bulletItem}>
              • Análisis de aplicación: Mejora de rendimiento.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            14. COMUNICACIONES Y MARKETING
          </Text>

          <Text style={styles.subsectionTitle}>
            14.1 Tipos de Comunicaciones
          </Text>
          <Text style={styles.boldText}>
            Transaccionales (Sin consentimiento adicional):
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Confirmaciones de pedidos.</Text>
            <Text style={styles.bulletItem}>• Actualizaciones de entrega.</Text>
            <Text style={styles.bulletItem}>• Facturas electrónicas.</Text>
            <Text style={styles.bulletItem}>
              • Notificaciones de seguridad.
            </Text>
          </View>

          <Text style={styles.boldText}>
            Promocionales (Requieren consentimiento):
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Ofertas y descuentos especiales.
            </Text>
            <Text style={styles.bulletItem}>
              • Nuevos productos y comercios.
            </Text>
            <Text style={styles.bulletItem}>• Programa de fidelidad.</Text>
            <Text style={styles.bulletItem}>• Encuestas de satisfacción.</Text>
          </View>

          <Text style={styles.boldText}>Educacionales:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Tips de sostenibilidad.</Text>
            <Text style={styles.bulletItem}>
              • Información sobre reducción de desperdicio.
            </Text>
            <Text style={styles.bulletItem}>
              • Consejos de conservación de alimentos.
            </Text>
            <Text style={styles.bulletItem}>• Impacto ambiental personal.</Text>
          </View>

          <Text style={styles.subsectionTitle}>
            14.2 Canales de Comunicación
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Notificaciones push en la aplicación.
            </Text>
            <Text style={styles.bulletItem}>
              • Correo electrónico a la dirección registrada.
            </Text>
            <Text style={styles.bulletItem}>
              • SMS al número de teléfono (con consentimiento).
            </Text>
            <Text style={styles.bulletItem}>
              • Llamadas telefónicas solo para soporte crítico.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            14.3 Control de Comunicaciones
          </Text>
          <Text style={styles.boldText}>Fácil Cancelación:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Enlace de "cancelar suscripción" en emails.
            </Text>
            <Text style={styles.bulletItem}>
              • Configuración en la aplicación.
            </Text>
            <Text style={styles.bulletItem}>• Respuesta "STOP" a SMS.</Text>
            <Text style={styles.bulletItem}>
              • Solicitud directa al soporte.
            </Text>
          </View>

          <Text style={styles.boldText}>Granularidad:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Control por tipo de comunicación.
            </Text>
            <Text style={styles.bulletItem}>• Frecuencia personalizable.</Text>
            <Text style={styles.bulletItem}>• Horarios preferidos.</Text>
            <Text style={styles.bulletItem}>• Canales específicos.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            15. INTELIGENCIA ARTIFICIAL Y DECISIONES AUTOMATIZADAS
          </Text>

          <Text style={styles.subsectionTitle}>
            15.1 Uso de IA en AhorraFood
          </Text>
          <Text style={styles.boldText}>Recomendaciones de Productos:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Algoritmos para sugerir productos relevantes.
            </Text>
            <Text style={styles.bulletItem}>
              • Basados en historial de compras y preferencias.
            </Text>
            <Text style={styles.bulletItem}>
              • Sin decisiones que afecten derechos fundamentales.
            </Text>
          </View>

          <Text style={styles.boldText}>Detección de Fraude:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Sistemas automatizados de seguridad.
            </Text>
            <Text style={styles.bulletItem}>
              • Análisis de patrones de comportamiento.
            </Text>
            <Text style={styles.bulletItem}>
              • Con revisión humana para decisiones importantes.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            15.2 Transparencia Algorítmica
          </Text>
          <Text style={styles.boldText}>Derecho a Explicación:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Información sobre lógica de decisiones automatizadas.
            </Text>
            <Text style={styles.bulletItem}>
              • Criterios utilizados en recomendaciones.
            </Text>
            <Text style={styles.bulletItem}>
              • Posibilidad de revisión humana.
            </Text>
          </View>

          <Text style={styles.boldText}>Control del Usuario:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Opciones para desactivar recomendaciones.
            </Text>
            <Text style={styles.bulletItem}>
              • Configuración manual de preferencias.
            </Text>
            <Text style={styles.bulletItem}>
              • Alternativas a decisiones automatizadas.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            16. ACTUALIZACIONES DE LA POLÍTICA
          </Text>

          <Text style={styles.subsectionTitle}>16.1 Modificaciones</Text>
          <Text style={styles.bodyText}>
            Esta Política puede actualizarse para:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Cumplir con nuevas regulaciones.
            </Text>
            <Text style={styles.bulletItem}>
              • Incorporar nuevas funcionalidades.
            </Text>
            <Text style={styles.bulletItem}>
              • Mejorar la protección de datos.
            </Text>
            <Text style={styles.bulletItem}>
              • Reflejar cambios en el servicio.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            16.2 Notificación de Cambios
          </Text>
          <Text style={styles.boldText}>Cambios Sustanciales:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Notificación por email con 30 días de anticipación.
            </Text>
            <Text style={styles.bulletItem}>
              • Aviso prominente en la aplicación.
            </Text>
            <Text style={styles.bulletItem}>
              • Solicitud de consentimiento renovado cuando sea necesario.
            </Text>
          </View>

          <Text style={styles.boldText}>Cambios Menores:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Publicación en el sitio web.
            </Text>
            <Text style={styles.bulletItem}>
              • Actualización de fecha de versión.
            </Text>
            <Text style={styles.bulletItem}>
              • Registro en historial de cambios.
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>
            16.3 Historial de Versiones
          </Text>
          <Text style={styles.bodyText}>Mantenemos registro de:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Fecha de cada modificación.</Text>
            <Text style={styles.bulletItem}>
              • Resumen de cambios realizados.
            </Text>
            <Text style={styles.bulletItem}>
              • Versión anterior disponible.
            </Text>
            <Text style={styles.bulletItem}>
              • Razones para las modificaciones.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>17. DISPOSICIONES FINALES</Text>

          <Text style={styles.subsectionTitle}>17.1 Idioma</Text>
          <Text style={styles.bodyText}>
            Esta Política está redactada en español. En caso de traducciones, la
            versión en español prevalecerá para efectos legales.
          </Text>

          <Text style={styles.subsectionTitle}>17.2 Integralidad</Text>
          <Text style={styles.bodyText}>
            Esta Política, junto con los Términos y Condiciones de AhorraFood,
            constituye el marco completo de protección de datos personales.
          </Text>

          <Text style={styles.subsectionTitle}>17.3 Divisibilidad</Text>
          <Text style={styles.bodyText}>
            Si alguna disposición fuera declarada inválida, el resto de la
            Política mantendrá su vigencia plena.
          </Text>

          <Text style={styles.subsectionTitle}>17.4 Ley Aplicable</Text>
          <Text style={styles.bodyText}>
            Esta Política se rige por las leyes de la República de Panamá y está
            sujeta a la jurisdicción de los tribunales panameños.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            18. RECONOCIMIENTO Y CONSENTIMIENTO
          </Text>
          <Text style={styles.bodyText}>
            Al utilizar AhorraFood, usted reconoce que:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              ✓ Ha leído íntegramente esta Política de Privacidad.
            </Text>
            <Text style={styles.bulletItem}>
              ✓ Comprende cómo tratamos sus datos personales.
            </Text>
            <Text style={styles.bulletItem}>
              ✓ Acepta las condiciones establecidas.
            </Text>
            <Text style={styles.bulletItem}>
              ✓ Otorga su consentimiento informado para el tratamiento descrito.
            </Text>
            <Text style={styles.bulletItem}>
              ✓ Conoce sus derechos y cómo ejercerlos.
            </Text>
          </View>

          <Text style={styles.bodyText}>
            AhorraFood conservará evidencia digital del consentimiento otorgado
            por el titular, incluyendo la fecha, hora, dispositivo, dirección IP
            y la versión de esta Política aceptada. Esta información se
            utilizará exclusivamente para fines de verificación legal y
            cumplimiento normativo.
          </Text>

          <Text style={styles.commitmentText}>
            Su uso continuado de AhorraFood constituye la aceptación de esta
            Política y sus futuras actualizaciones.
          </Text>

          <Text style={styles.commitmentText}>
            AhorraFood - "Mata el hambre, salva el bolsillo, hacerlo con
            AhorraFood es sencillo"
          </Text>

          <Text style={styles.commitmentText}>
            Comprometidos con la protección de sus datos personales y la
            reducción del desperdicio alimentario en Panamá.
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    paddingVertical: 20,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 10,
  },
  effectiveDate: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
  section: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 1300, // Limita el ancho del contenido
    alignSelf: "center", // Centra el contenido horizontalmente
    width: "100%", // Permite que se adapte en pantallas pequeñas
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
    marginTop: 10,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
    marginTop: 12,
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
  bodyText: {
    fontSize: 13,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 8,
    textAlign: "justify",
  },
  boldText: {
    fontWeight: "bold",
    color: "green",
  },
  bulletList: {
    marginLeft: 5,
    marginBottom: 8,
  },
  indentedList: {
    marginLeft: 15,
    marginBottom: 8,
  },
  bulletItem: {
    fontSize: 13,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 5,
    textAlign: "justify",
  },
  sloganText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  commitmentText: {
    fontSize: 13,
    color: "#666666",
    textAlign: "justify",
    fontStyle: "italic",
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default PrivacyPolicyScreen;
