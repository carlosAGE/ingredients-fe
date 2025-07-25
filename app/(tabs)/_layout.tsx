import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, TouchableOpacity } from "react-native";
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
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderTopWidth: 0.5,
          borderTopColor: "rgb(68, 68, 68)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
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
        name="fake-upload" // dummy screen (won't navigate)
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => router.push("/upload")} // opens modal
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
