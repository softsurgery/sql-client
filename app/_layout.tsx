import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import { NAV_THEME } from "~/lib/styles/constants";
import { useColorScheme } from "~/lib/styles/useColorScheme";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { setAndroidNavigationBar } from "~/lib/styles/android-navigation-bar";

const LIGHT_THEME = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  const headerStyle = {
    backgroundColor: isDarkColorScheme
      ? NAV_THEME.dark.card
      : NAV_THEME.light.card,
  };

  const headerTintColor = isDarkColorScheme
    ? NAV_THEME.dark.foreground
    : NAV_THEME.light.foreground;

  return (
    <ThemeProvider
      value={(isDarkColorScheme ? DARK_THEME : LIGHT_THEME) as unknown as Theme}
    >
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="application"
            options={{
              title: "",
              headerRight: () => <ThemeToggle />,
              headerBackVisible: false,
              headerStyle,
              headerTintColor,
            }}
          />
        </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
