import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UploadModal() {
  const router = useRouter();
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ base64: true });
    setIsProcessingImage(true);

    if (!result.canceled) {
      const image = result.assets[0];
      setIsProcessingImage(false);
      router.push({ pathname: "/process", params: { base64: image.base64 } });
    } else {
      setIsProcessingImage(false);
    }
  };

  const handleChooseLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    setIsProcessingImage(true);

    if (!result.canceled) {
      const image = result.assets[0];
      setIsProcessingImage(false);
      router.push({ pathname: "/process", params: { base64: image.base64 } });
    } else {
      setIsProcessingImage(false);
    }
  };

  const handleScanBarcode = () => {
    // Navigate to a new screen or modal for barcode scanning
    router.push("/barcode-scanner");
  };

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
          backgroundColor: "#fff", // Popup card
          borderRadius: 12,
          elevation: 5, // Shadow on Android
          shadowColor: "#000", // Shadow on iOS
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        {/* Row with 3 square buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Take Photo */}
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#f5f5f5",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleTakePhoto}
          >
            <Ionicons name="camera" size={28} color="#333" />
            <Text style={{ fontSize: 12, marginTop: 5 }}>Take Photo</Text>
          </TouchableOpacity>

          {/* Choose from Library */}
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#f5f5f5",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleChooseLibrary}
          >
            <Ionicons name="images" size={28} color="#333" />
            <Text style={{ fontSize: 12, marginTop: 5 }}>Gallery</Text>
          </TouchableOpacity>

          {/* Scan Barcode */}
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#f5f5f5",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => router.push("/barcode-scanner")}
          >
            <Ionicons name="barcode" size={28} color="#333" />
            <Text style={{ fontSize: 12, marginTop: 5 }}>Scan</Text>
          </TouchableOpacity>
        </View>

        {/* Optional Processing Text */}
        {isProcessingImage && (
          <Text style={{ textAlign: "center", marginTop: 15 }}>
            Processing image...
          </Text>
        )}

        {/* Close Button */}
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.push("/")
          }
          style={{
            marginTop: 20,
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: "#333",
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
