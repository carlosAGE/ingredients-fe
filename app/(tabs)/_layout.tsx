import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

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
            if (!result.canceled)
              console.log("Camera image", result.assets[0].uri);
          },
        },
        {
          text: "Choose from Library",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              base64: true,
            });
            if (!result.canceled)
              console.log("Library image", result.assets[0].uri);
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
          paddingTop: 0,
          paddingBottom: insets.bottom, //Platform.OS === "android" ? 100 : 10, // tweak as needed
          height: 70 + insets.bottom, // make it tall enough to avoid being overlapped
          ...Platform.select({
            ios: { position: "absolute" },
            android: {},
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
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
              onPress={promptUser}
            >
              <View
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 32.5,
                  backgroundColor: "#333",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Ionicons name="camera" size={28} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
