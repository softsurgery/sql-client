import { View } from "react-native";
import { Play, X } from "lucide-react-native";
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
  suggestion?: string;
  isSuggestionPending?: boolean;
  isPending?: boolean;
}

export const EditorCard = ({
  className,
  query,
  suggestion,
  setQuery,
  runQuery,
  clearQuery,
  isSuggestionPending,
  isPending,
}: EditorCardProps) => {
  console.log("Suggestion: ", suggestion);
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
        <View className="relative">
          {/* Actual input */}
          <Textarea
            className="bg-transparent rounded-lg h-52 text-white px-3 py-2"
            placeholder="Enter SQL (e.g. SELECT * FROM items)"
            value={query}
            onChangeText={(value: string) => setQuery?.(value)}
            multiline
            style={{ zIndex: 20 }}
          />
          {/* Ghost suggestion layer */}
          {suggestion && (
            <View
              className="absolute top-0 left-0 right-0 h-52 z-10 pointer-events-none"
              style={{ flexDirection: "row", flexWrap: "wrap" }}
            >
              <Textarea
                className="bg-transparent rounded-lg h-52 text-muted px-3 py-2"
                placeholder="Enter SQL (e.g. SELECT * FROM items)"
                value={
                  query
                    ? "  ".repeat((query?.length || 0) - 1) +
                      suggestion?.slice(query?.length || 0)
                    : ""
                }
                multiline
                style={{ zIndex: 10 }}
              />
            </View>
          )}
        </View>
      </CardContent>
      <CardFooter>
        <View className="flex flex-row justify-between items-center gap-2 w-full">
          <Text>{isSuggestionPending ? "Thinking..." : "OK"}</Text>
          <View className="flex flex-row gap-2">
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
              variant={"default"}
              size={"icon"}
              onPress={() => runQuery?.()}
              disabled={isPending}
              className="flex flex-row gap-2"
            >
              <Icon name={Play} color={"white"} size={20} />
            </Button>
          </View>
        </View>
      </CardFooter>
    </Card>
  );
};
