
export const darkTheme = {
  background: "#0D0F14",
  text: "#FAFAFA",
  primary: "#00BFA6",
  accent: "#0057FF",
    notification: "#0057FF",
placeholder: "#666666",
  surface: "#1A1C23",
  border: "#333333",
  disabled: "#666666",
  error: "#FF3B30",
  backdrop: "#000000AA",
};

export type AppTheme = typeof darkTheme;
export type ThemeColors = {
  colors: AppTheme;
}
export type ThemeTypeCustom = { dark: boolean; roundness: number; } & ThemeColors;