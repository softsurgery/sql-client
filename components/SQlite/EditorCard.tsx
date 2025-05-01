import { View } from "react-native";
import { Play } from "lucide-react-native";
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
  clearQuery?:Function;
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
          className="bg-transparent rounded-lg h-32"
          placeholder="Enter SQL (e.g. SELECT * FROM items)"
          value={query}
          onChangeText={(value: string) => setQuery?.(value)}
          multiline
        />
      </CardContent>
      <CardFooter>
        <View className="flex flex-row gap-2">
          <Button
            onPress={() => runQuery?.()}
            disabled={isPending}
            className="flex-1 flex flex-row gap-2"
          >
            <Icon name={Play} color={"white"} size={20} />
            <Text defaultColors={false}>Run</Text>
          </Button>
          <Button
            onPress={() => clearQuery?.()}
            variant="ghost"
            disabled={isPending || query?.length === 0}
          >
            <Text>Clear</Text>
          </Button>
        </View>
      </CardFooter>
    </Card>
  );
};
