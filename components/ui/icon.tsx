import { LucideIcon, LucideProps } from "lucide-react-native";
import { Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/styles/constants";
import { iconWithClassName } from "~/lib/styles/iconWithClassName";
import { useColorScheme } from "~/lib/styles/useColorScheme";
import { cn } from "~/lib/styles/utils";

type IconProps = LucideProps & {
  name: LucideIcon;
};

const Icon = ({
  name: LucideIcon,
  className,
  size = 24,
  ...props
}: IconProps) => {
  const { isDarkColorScheme } = useColorScheme();
  iconWithClassName(LucideIcon);

  const iconClassName = Platform.select({
    native: className,
  });

  return (
    <View>
      <LucideIcon
        className={cn(iconClassName, className)}
        color= {isDarkColorScheme ? NAV_THEME.dark.foreground : NAV_THEME.light.foreground}
        size={size}
        {...props}
      />
    </View>
  );
};

export default Icon;
