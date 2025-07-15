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
        name="registerC"
        options={{
          title: "Registro Fonda",
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
        name="fonda"
        options={{
          title: "Fonda",
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
     
     
      <Tabs.Screen name="supermercado" options={{ title: "Supermercado" }} />
    </Tabs>
  );
}
