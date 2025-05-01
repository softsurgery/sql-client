import React from "react";
import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";
import Icon from "../ui/icon";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/styles/utils";

interface MenuItemProps {
  title: string;
  icon: LucideIcon;
  active?: boolean;
  size?: number;
  color?: string;
}

export const MenuItem = ({
  title,
  icon,
  active = false,
  size = 32,
}: MenuItemProps) => {
  return (
    <View className="flex-col items-center justify-between">
      <Icon
        name={icon as LucideIcon}
        className={cn(active && "text-primary" )}
        size={size}
      />
      <Text
        className={cn("text-xs", active ? "text-primary" : "text-foreground")}
      >
        {title}
      </Text>
    </View>
  );
};
