import * as React from "react";
import { Platform, View } from "react-native";
import { Database, DatabaseZap, LifeBuoy, Plus } from "lucide-react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import Icon from "../ui/icon";
import { MenuItem } from "./MenuItem";
import { SQLiteEditor } from "../SQlite/SQLiteEditor";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTriggerWithIcon,
} from "~/components/ui/tabs";
import { cn } from "~/lib/styles/utils";

interface ApplicationProps {
  className?: string;
  defaultValue?: string;
  isMiddleButtonVisible?: boolean;
}

export default function Application({
  className,
  defaultValue,
  isMiddleButtonVisible,
}: ApplicationProps) {
  const [value, setValue] = React.useState("sqlite");

  const tabs = [
    {
      value: "sqlite",
      icon: Database,
      title: "SQLite",
      component: <SQLiteEditor />,
    },
    {
      value: "mysql",
      icon: DatabaseZap,
      title: "MySQL",
      component: <Text className="text-xl">MySQL</Text>,
    },
    {
      value: "help",
      icon: LifeBuoy,
      title: "Help",
      component: <Text className="text-xl">Help</Text>,
    },
  ];

  const leftTabs = tabs.slice(0, 2);
  const rightTabs = tabs.slice(2);

  return (
    <View className={cn("flex-1", className)}>
      <Tabs value={value} onValueChange={setValue} className="w-full flex-1">
        {/* Main Content - Only Show Active Tab */}
        {tabs.map(
          (tab) =>
            value === tab.value && (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className={cn("flex-1")}
              >
                {tab.component}
              </TabsContent>
            )
        )}

        {/* Bottom Navigation */}
        <TabsList
          className="flex flex-row items-center justify-between w-full"
          style={{
            height: Platform.OS === "ios" ? 80 : 70,
            paddingBlock: Platform.OS === "ios" ? 10 : 0,
          }}
        >
          {/* Left Side Tabs */}
          {leftTabs.map((tab) => (
            <TabsTriggerWithIcon
              key={tab.value}
              value={tab.value}
              className="flex-1 items-center"
              onPress={() => setValue(tab.value)}
            >
              <MenuItem
                icon={tab.icon}
                title={tab.title}
                active={value === tab.value}
              />
            </TabsTriggerWithIcon>
          ))}
          {/* Plus Button in the middle */}
          {isMiddleButtonVisible && (
            <Button
              variant="default"
              className="w-20 h-20 -top-4 rounded-full aspect-square flex items-center justify-center border border-border"
            >
              <Icon name={Plus} size={32} />
            </Button>
          )}

          {/* Right Side Tabs */}
          {rightTabs.map((tab) => (
            <TabsTriggerWithIcon
              key={tab.value}
              value={tab.value}
              className="flex-1 items-center"
              onPress={() => setValue(tab.value)}
            >
              <MenuItem
                icon={tab.icon}
                title={tab.title}
                active={value === tab.value}
              />
            </TabsTriggerWithIcon>
          ))}
        </TabsList>
      </Tabs>
    </View>
  );
}
