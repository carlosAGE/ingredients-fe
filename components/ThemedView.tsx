import { View, ViewProps } from "react-native";
import { useColorScheme } from "react-native";

export function ThemedView(props: ViewProps) {
  const theme = useColorScheme();
  const backgroundColor = theme === "dark" ? "#0F172A" : "#FFFFFF";

  return <View {...props} style={[{ backgroundColor }, props.style]} />;
}
