import { View } from "react-native";
import { Play, Save, X } from "lucide-react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import Icon from "~/components/ui/icon";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/styles/utils";

interface EditorCardProps {
  className?: string;
  query?: string;
  setQuery?: Function;
  runQuery?: Function;
  clearQuery?: Function;
  isPending?: boolean;
}

export const EditorCard = ({
  className,
  query,
  setQuery,
  runQuery,
  clearQuery,
  isPending,
}: EditorCardProps) => {
  return (
    <Card className={cn("w-full ", className)}>
      <CardHeader>
        <CardTitle>
          <Text className="text-xl">Query</Text>
        </CardTitle>
        <CardDescription>
          <Text>Write your SQL query here</Text>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          className="bg-transparent rounded-lg h-52"
          placeholder="Enter SQL (e.g. SELECT * FROM items)"
          value={query}
          onChangeText={(value: string) => setQuery?.(value)}
          multiline
        />
      </CardContent>
      <CardFooter>
        <View className="flex flex-row gap-2 ml-auto">
          <Button
            variant="ghost"
            size={"icon"}
            onPress={() => clearQuery?.()}
            className="flex flex-row gap-2"
            disabled={isPending || query?.length === 0}
          >
            <Icon name={X} size={20} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            onPress={() => runQuery?.()}
            disabled={isPending}
            className="flex flex-row gap-2"
          >
            <Icon name={Save} size={20} />
          </Button>
          <Button
            variant={"default"}
            size={"icon"}
            onPress={() => runQuery?.()}
            disabled={isPending}
            className="flex flex-row gap-2"
          >
            <Icon name={Play} color={"white"} size={20} />
          </Button>
        </View>
      </CardFooter>
    </Card>
  );
};
