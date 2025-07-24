import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function UploadModal() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // ✅ Dim the background
      }}
    >
      <View
        style={{
          width: 300,
          padding: 20,
          backgroundColor: "#fff", // ✅ Popup card
          borderRadius: 12,
          elevation: 5, // ✅ Shadow on Android
          shadowColor: "#000", // ✅ Shadow on iOS
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 15 }}>
          Upload your files here
        </Text>
        <Button title="Close" onPress={() => router.back()} />
      </View>
    </View>
  );
}
