import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const reviewsMock = [
  {
    name: "María González",
    rating: 5,
    date: "2024-12-25",
    comment:
      "¡Excelente! El arroz con pollo estaba delicioso y la porción muy generosa.",
    helpful: 12,
  },
  {
    name: "Carlos Ruiz",
    rating: 4,
    date: "2024-12-24",
    comment:
      "Muy bueno, aunque el pollo podría estar un poco más condimentado.",
    helpful: 8,
  },
  {
    name: "Ana López",
    rating: 5,
    date: "2024-12-23",
    comment:
      "Perfecto para el almuerzo. Llegué rápido y todo estaba fresco.",
    helpful: 15,
  },
];

export default function ReviewSection() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    console.log("Comentario:", comment);
    console.log("Calificación:", rating);
    setComment("");
    setRating(0);
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.outer}>
        <View style={styles.card}>
          <Text style={styles.header}>Reseñas y Comentarios</Text>

          <Text style={styles.label}>Escribe una reseña</Text>
          <Text style={styles.label}>Calificación</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((val) => (
              <TouchableOpacity key={val} onPress={() => setRating(val)}>
                <FontAwesome
                  name={val <= rating ? "star" : "star-o"}
                  size={22}
                  color="#facc15"
                  style={{ marginRight: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Comentario</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu opinión sobre este producto..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <FontAwesome name="paper-plane" color="#fff" />
            <Text style={styles.buttonText}> Enviar Reseña</Text>
          </TouchableOpacity>

          {reviewsMock.map((review, idx) => (
            <View key={idx} style={styles.reviewBox}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewer}>{review.name}</Text>
                <View style={styles.starRow}>
                  {renderStars(review.rating)}
                </View>
                <Text style={styles.date}>{review.date}</Text>
              </View>
              <Text style={styles.comment}>{review.comment}</Text>
              <Text style={styles.helpful}> 👍 Útil ({review.helpful})</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function renderStars(rating) {
  return [...Array(5)].map((_, i) => (
    <FontAwesome
      key={i}
      name={i < rating ? "star" : "star-o"}
      size={14}
      color="#facc15"
      style={{ marginRight: 1 }}
    />
  ));
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  outer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    width: "100%",
    maxWidth: 600, // este valor debe coincidir con el de la tarjeta
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
  starRow: {
    flexDirection: "row",
    marginVertical: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#15803d",
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  reviewBox: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingVertical: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewer: {
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    color: "#475569",
    fontSize: 12,
  },
  comment: {
    fontSize: 14,
    marginTop: 4,
  },
  helpful: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
});
