import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="loginU"
        options={{
          title: "LoginU",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="registerU"
        options={{
          title: "Registro Usuario",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="registerC1"
        options={{
          title: "Registro Fonda",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="registerC2"
        options={{
          title: "Registro Fonda",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="registerC3"
        options={{
          title: "Registro Fonda",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="principal"
        options={{
          title: "Principal",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="fonda"
        options={{
          title: "Fonda",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="supermercado"
        options={{
          title: "supermercado",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="vistaP"
        options={{
          title: "vista productos",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="carro"
        options={{
          title: "Carrito",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="gestionC"
        options={{
          title: "gestion comercio",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="pedidosC"
        options={{
          title: "pedidos comercio",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="productosC"
        options={{
          title: "productos comercio",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="agregarP"
        options={{
          title: "productos comercio",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="dashboardComercio"
        options={{
          title: "Dashboard Comercio",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="pago"
        options={{
          title: "Pago",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="confirmacionP"
        options={{
          title: "Confirmacion Pago",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
        <Tabs.Screen
        name="estadoP"
        options={{
          title: "Estado Pedido",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="historialP"
        options={{
          title: "Historial Pedido",
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
