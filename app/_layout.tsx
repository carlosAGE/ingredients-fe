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
          headerShown: false,
          contentStyle: { backgroundColor: customTheme.colors.background },
        }}
      />
    </PaperProvider>
  );
}
