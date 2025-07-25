import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DynamicHeader() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;

  const isHome = pathname === "/";
  const isprincipal = pathname === "/principal";
  const isFonda = pathname === "/fonda";
  const isSupermercado = pathname === "/supermercado";
  const isVistap = pathname === "/vistaP";
  const isAgregarP = pathname == "/agregarP";
  const isProductosC = pathname == "/productosC";
  const isPedidosC = pathname == "/pedidosC";

  return (
    <View style={{ backgroundColor: "white", paddingTop: insets.top }}>
      <View style={styles.header}>
        {/* Logo + texto */}
        <View style={styles.left}>
          <Image
            source={require("@/assets/images/logooo.png")}
            style={styles.logo}
          />
          {!isMobile && <Text style={styles.title}>AhorraFood</Text>}
        </View>

        {/* Centro - Barra de búsqueda */}
        {(isFonda || isSupermercado) && (
          <View style={styles.center}>
            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={16}
                color="#94a3b8"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="nombre o comercio..."
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
                autoComplete="off"
              />
            </View>
          </View>
        )}

        {/* Derecha */}
        <View style={styles.right}>
          {isHome && (
            <>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push("/loginU")}
              >
                <Text style={styles.loginText}>Iniciar Sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => router.push("/registerU")}
              >
                <Text style={styles.registerText}>Registrarse</Text>
              </TouchableOpacity>
            </>
          )}
          {(isprincipal || isFonda || isSupermercado || isVistap) && (
            <View style={styles.navButtonsContainer}>
              <TouchableOpacity
                onPress={() => router.push("/carro")}
                style={styles.iconWithTextButton}
              >
                <Ionicons name="cart-outline" size={18} color="#0f172a" />
                {!isMobile && <Text style={styles.iconLabel}>Carrito</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/historialP")}
                style={styles.iconWithTextButton}
              >
                <Ionicons name="cube-outline" size={18} color="#0f172a" />
                {!isMobile && <Text style={styles.iconLabel}>Mis Pedidos</Text>}
              </TouchableOpacity>
            </View>
          )}

          {(isPedidosC || isProductosC || isAgregarP) && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push("/dashboardComercio")}
            >
              <Text style={styles.backIcon}>←</Text>
              <Text style={styles.backText}>Volver a Gestión</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#15803d",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f9fafb",
  },
  backIcon: {
    fontSize: 14,
    marginRight: 6,
    color: "#0f172a",
  },
  backText: {
    fontSize: 14,
    color: "#0f172a",
  },
  center: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  loginText: {
    color: "#333",
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  registerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  navButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  iconWithTextButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  iconLabel: {
    fontSize: 13,
    color: "#0f172a",
    marginLeft: 6,
  },

  iconButtonOnly: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "white",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: "100%",
    maxWidth: 400,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    backgroundColor: "transparent",
    padding: 0,
    borderWidth: 0,
    ...(Platform.OS === "web"
      ? {
          outlineWidth: 0,
          outlineColor: "transparent",
        }
      : {}),
  },
});
