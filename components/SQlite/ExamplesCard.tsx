import { View } from "react-native";
import { Eye, FilePlus, Newspaper } from "lucide-react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import Icon from "~/components/ui/icon";
import { cn } from "~/lib/styles/utils";

interface ExamplesCardProps {
  className?: string;
  setQuery?: Function;
  isPending?: boolean;
}

export const ExmplesCard = ({
  className,
  setQuery,
  isPending,
}: ExamplesCardProps) => {
  const examples = [
    {
      title: "Create Table",
      code: "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
      icon: Newspaper,
    },
    {
      title: "Insert Data",
      code: "INSERT INTO items (name) VALUES ('Sample Item');",
      icon: FilePlus,
    },
    {
      title: "Select Data",
      code: "SELECT * FROM items;",
      icon: Eye,
    },
  ];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <View className="flex flex-row items-center justify-between">
          <View>
            <CardTitle>
              <Text className="text-xl">Examples</Text>
            </CardTitle>
            <CardDescription>
              <Text>Shortcuts for common Database Queries</Text>
            </CardDescription>
          </View>
        </View>
      </CardHeader>
      <CardContent>
        <View className="flex flex-row justify-between gap-2">
          {examples.map((example, index) => {
            return (
              <Button
                key={`query-${index}`}
                variant="ghost"
                className="flex flex-row gap-2 w-[32%]"
                disabled={isPending}
                onPress={() => setQuery?.(example.code)}
              >
                <Icon name={example.icon} />
                <Text>{example.title}</Text>
              </Button>
            );
          })}
        </View>
      </CardContent>
    </Card>
  );
};
