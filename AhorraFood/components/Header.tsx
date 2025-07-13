import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";

export default function DynamicHeader() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
  const isprincipal = pathname === "/principal";
  const isregisterC =
    pathname === "/registerC1" ||
    pathname === "/registerC2" ||
    pathname === "/registerC3";

  return (
    <View style={{ backgroundColor: "white", paddingTop: insets.top }}>
      <View style={styles.header}>
        {/* Logo + texto */}
        <View style={styles.left}>
          <Image
            source={require("@/assets/images/logooo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>AhorraFood</Text>
        </View>

        {/* Botones de la derecha */}
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

          {isprincipal && (
            <>
              <TouchableOpacity
                onPress={() => router.push("/principal")}
                style={styles.iconButton}
              >
                {/* Puedes agregar un ícono aquí */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/carro")}
                style={styles.iconButton}
              >
                <Text style={styles.iconText}>🛒</Text>
              </TouchableOpacity>
            </>
          )}

          {/* En isregisterC ya no mostramos nada en el lado derecho */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
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
  iconButton: {
    marginHorizontal: 5,
    padding: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
  },
  iconText: {
    fontSize: 16,
  },
});
