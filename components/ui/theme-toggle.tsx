import { Pressable, View } from "react-native";
import { MoonIcon, SunIcon } from "lucide-react-native";
import Icon from "./icon";
import { setAndroidNavigationBar } from "~/lib/styles/android-navigation-bar";
import { useColorScheme } from "~/lib/styles/useColorScheme";
import { cn } from "~/lib/styles/utils";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? "light" : "dark";
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }

  return (
    <Pressable onPress={toggleColorScheme}>
      {({ pressed }) => (
        <View
          className={cn(
            "flex-1 aspect-square pt-0.5 justify-center items-start",
            pressed && "opacity-70"
          )}
        >
          <Icon
            name={isDarkColorScheme ? SunIcon : MoonIcon}
          />
        </View>
      )}
    </Pressable>
  );
}
