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
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{
          flex: 1, // take up equal space like other tabs
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="home-outline" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/upload")}
        style={{
          flex: 1, // take up equal space like other tabs
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

      <TouchableOpacity
        onPress={() => router.push("/profile")}
        style={{
          flex: 1, // take up equal space like other tabs
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
