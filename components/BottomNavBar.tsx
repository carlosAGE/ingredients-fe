import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useSegments } from "expo-router";
import { useTheme } from "react-native-paper";
import { ThemeColors } from "../constants/theme";

export default function BottomNavBar() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors }: ThemeColors = useTheme();
  const segments = useSegments();

  const promptUser = () => {
    Alert.alert(
      "Select Image Source",
      "Choose how you'd like to add an image:",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              base64: true,
            });
            if (!result.canceled) {
              const image = result.assets[0];
              router.push({
                pathname: "/process",
                params: { base64: image.base64 },
              });
            }
          },
        },
        {
          text: "Choose from Library",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              base64: true,
            });
            if (!result.canceled) {
              const image = result.assets[0];
              router.push({
                pathname: "/process",
                params: { base64: image.base64 },
              });
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 70 + insets.bottom,
        paddingBottom: insets.bottom,
        backgroundColor: colors.surface,
        borderTopWidth: 0.5,
        borderTopColor: "#444",
        position: Platform.OS === "ios" ? "absolute" : "relative",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <TouchableOpacity onPress={() => router.push("/")}>
        <Ionicons name="home-outline" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={promptUser}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#333",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="camera" size={28} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Ionicons
          name="person-outline"
          size={24}
          color={
            segments[segments.length - 1] === "profile"
              ? colors.accent
              : colors.disabled
          }
        />
      </TouchableOpacity>
    </View>
  );
}
