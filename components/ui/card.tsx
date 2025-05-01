import * as React from "react";
import { Text, TextProps, View, ViewProps } from "react-native";
import { TextClassContext } from "~/components/ui/text";
import { NAV_THEME } from "~/lib/styles/constants";
import { useColorScheme } from "~/lib/styles/useColorScheme";
import { cn } from "~/lib/styles/utils";

const Card = React.forwardRef<View, ViewProps>((props, ref) => {
  const { className, style, ...rest } = props;
  const { isDarkColorScheme } = useColorScheme();
  const backgroundColor = isDarkColorScheme
    ? NAV_THEME.dark.card
    : NAV_THEME.light.card;

  return (
    <View
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm shadow-foreground/10",
        className
      )}
      style={{ ...(style as object), backgroundColor }}
      {...rest}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, ViewProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<Text, TextProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      role="heading"
      aria-level={3}
      className={cn(
        "text-2xl text-card-foreground font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, TextProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, ViewProps>(
  ({ className, ...props }, ref) => (
    <TextClassContext.Provider value="text-card-foreground">
      <View ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    </TextClassContext.Provider>
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, ViewProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("flex flex-row items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
