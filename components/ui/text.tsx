import * as Slot from "@rn-primitives/slot";
import type { SlottableTextProps, TextRef } from "@rn-primitives/types";
import * as React from "react";
import { Text as RNText } from "react-native";
import { NAV_THEME } from "~/lib/styles/constants";
import { useColorScheme } from "~/lib/styles/useColorScheme";
import { cn } from "~/lib/styles/utils";

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<
  TextRef,
  SlottableTextProps & { defaultColors?: boolean }
>(
  (
    { className, asChild = false, style, defaultColors = true, ...props },
    ref
  ) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    const { isDarkColorScheme } = useColorScheme();

    return (
      <Component
        style={{
          ...(defaultColors
            ? {
                color: isDarkColorScheme
                  ? NAV_THEME.light.card
                  : NAV_THEME.dark.card,
              }
            : {}),
          ...(style as Object),
        }}
        className={cn("text-base", textClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, TextClassContext };
