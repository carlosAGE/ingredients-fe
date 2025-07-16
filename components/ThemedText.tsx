import { Text, TextProps } from "react-native";
import { useColorScheme } from "react-native";

export function ThemedText(props: TextProps) {
  const theme = useColorScheme();
  const color = theme === "dark" ? "#F4F4F5" : "#1A1A1A";

  return <Text {...props} style={[{ color }, props.style]} />;
}
