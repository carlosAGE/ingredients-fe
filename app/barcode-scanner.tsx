import { useCameraPermissions, CameraView } from "expo-camera";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function BarcodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No camera permission</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={({ data }) => {
          // Send barcode data back to process screen
          router.push({ pathname: "/process", params: { barcode: data } });
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"], // add as needed
        }}
      />

      {/* Rectangle overlay */}
      <View
        style={{
          position: "absolute",
          top: "40%",
          left: "10%",
          width: "80%",
          height: 100,
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 8,
        }}
      />
    </View>
  );
}
