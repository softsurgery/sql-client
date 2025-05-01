import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { NAV_THEME } from "~/lib/styles/constants";
import { useColorScheme } from "~/lib/styles/useColorScheme";
import { cn } from "~/lib/styles/utils";

const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(
  (
    {
      className,
      multiline = true,
      numberOfLines = 4,
      placeholderClassName,
      ...props
    },
    ref
  ) => {
    const { isDarkColorScheme } = useColorScheme();
    return (
      <TextInput
        ref={ref}
        className={cn(
          "min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-base lg:text-sm native:text-lg native:leading-[1.25]",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          className
        )}
        placeholderClassName={cn("opacity-50", placeholderClassName)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        style={{
          color: isDarkColorScheme ? NAV_THEME.dark.foreground : NAV_THEME.light.foreground,
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
