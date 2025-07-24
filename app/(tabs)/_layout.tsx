import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import { ThemedText } from "../../components/ThemedText";

const DefaultTabBarButton = (props: any) => (
  <TouchableOpacity
    {...Object.fromEntries(
      Object.entries(props).filter(
        ([key, value]) => !(key === "delayLongPress" && value === null)
      )
    )}
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  />
);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();

  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const promptUser = () => {
    console.log("Prompting user for image selection");
    if (Platform.OS === "web") {
      Alert.alert("Image selection is not supported on web.");
      return;
    }
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
            setIsProcessingImage(true);
            if (!result.canceled) {
              console.log("Camera image", result.assets[0].uri);
              const image = result.assets[0];

              setIsProcessingImage(false);
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
            setIsProcessingImage(true);

            if (!result.canceled) {
              setIsProcessingImage(false);
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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          // paddingTop: insets.top, //Platform.OS === "android" ? 10 : 0, // tweak as needed
          paddingBottom: insets.bottom, //Platform.OS === "android" ? 100 : 10, // tweak as needed
          height: 70 + insets.bottom, // make it tall enough to avoid being overlapped
          ...Platform.select({
            ios: { position: "absolute" },
            android: {},
          }),
        },
        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <ThemedText style={{}}>
        {isProcessingImage ? "Processing..." : "Ready to scan!"}
      </ThemedText>

      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: DefaultTabBarButton,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Ionicons name="home-outline" size={24} color={colors.primary} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="fake-upload" // dummy screen (won't navigate)
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => router.push("/upload")} // opens modal
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20, // move it above tab bar
              }}
            >
              <Ionicons name="cloud-upload" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Tabs.Screen
        name="camera"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...Object.fromEntries(
                Object.entries(props).filter(
                  ([key, value]) =>
                    !(key === "delayLongPress" && value === null)
                )
              )}
              // onPress={promptUser}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#333",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 0,
                }}
              >
                <Ionicons name="camera" size={28} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      /> */}

      <Tabs.Screen
        name="profile"
        options={{
          tabBarButton: DefaultTabBarButton,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
