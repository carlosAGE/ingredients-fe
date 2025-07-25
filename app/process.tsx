import { useLocalSearchParams } from "expo-router";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import BottomNavBar from "../components/BottomNavBar";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

export default function ProcessScreen() {
  const { base64 } = useLocalSearchParams<{ base64: string }>();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  useEffect(() => {
    if (!base64) return;

    const sendImage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_BE}/scan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageBase64: base64 }),
        });

        const { success, data, scanId } = await res.json();
        if (!success) {
          throw new Error("Failed to process image");
        }
        setResult(data);
      } catch (err) {
        console.error("Error processing image:", err);
      } finally {
        setLoading(false);
      }
    };

    sendImage();
  }, [base64]);

  return (
    <ThemedView style={styles.container}>
      {base64 && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${base64}` }}
            style={styles.image}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#6200ee" />
          ) : result ? (
            <>
              <ThemedText>Scan Result:</ThemedText>
              <ThemedText>{JSON.stringify(result, null, 2)}</ThemedText>
            </>
          ) : (
            <ThemedText>No result found.</ThemedText>
          )}
        </ScrollView>
      )}
      {!loading && !base64 && <ThemedText>No image found.</ThemedText>}
      <BottomNavBar />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: "90%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 12,
  },
});
