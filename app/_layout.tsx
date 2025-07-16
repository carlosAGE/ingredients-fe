import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { darkTheme } from "../constants/theme";

const customTheme = {
  dark: true,
  roundness: 4,
  colors: {
    primary: darkTheme.primary,
    background: darkTheme.background,
    surface: darkTheme.surface,
    accent: darkTheme.accent,
    text: darkTheme.text,
    disabled: darkTheme.muted,
    placeholder: darkTheme.muted,
    backdrop: "#000000AA",
    error: darkTheme.danger,
    notification: darkTheme.accent,
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: customTheme.colors.background },
        }}
      />
    </PaperProvider>
  );
}
