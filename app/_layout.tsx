import { Stack } from "expo-router";
import { PaperProvider, MD3DarkTheme, MD3Theme } from "react-native-paper";
import { ThemeTypeCustom, darkTheme } from "../constants/theme";

const customTheme: ThemeTypeCustom = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...MD3DarkTheme.colors,
    primary: darkTheme.primary,
    background: darkTheme.background,
    surface: darkTheme.surface,
    accent: darkTheme.accent,
    text: darkTheme.text,
    disabled: darkTheme.disabled,
    placeholder: darkTheme.placeholder,
    backdrop: darkTheme.backdrop,
    error: darkTheme.error,
    notification: darkTheme.notification,
    border: darkTheme.border,
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <Stack
        screenOptions={{
          headerShown: false, // ✅ Default for all screens in this stack
          contentStyle: {
            backgroundColor: customTheme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: customTheme.colors.background },
          }}
        />
        <Stack.Screen
          name="upload"
          options={{
            // presentation: "modal", // <-- THIS MAKES IT A POPUP
            presentation: "transparentModal",
            animation: "slide_from_bottom", // or 'slide_from_bottom' for a sheet-like feel
            headerShown: false, // ✅ Hides default header for clean popup
            // title: "Upload Files",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
