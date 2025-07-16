import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";

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
              console.log("Camera image", result.assets[0].uri);
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
      />
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
