import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingHorizontal: insets.left || insets.right,
        },
      ]}
    >
      <ThemedText>Home screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
