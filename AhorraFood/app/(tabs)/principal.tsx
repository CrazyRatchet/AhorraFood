import Header from "@/components/Header";
import Footer from "@/components/footer";
import { StyleSheet, Text, View, ScrollView } from "react-native";
export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      
      <Footer />
    </View>
  );
}