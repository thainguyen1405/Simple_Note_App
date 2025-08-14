import type { Theme } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";

const LightTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    // App-wide background color
    background: '#F2D324',
    },
};

export const useThemeConfig = () => {
    return LightTheme;
};