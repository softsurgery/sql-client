import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/styles/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ResultCardProps {
  className?: string;
  results?: string[];
  status?: string;
  isError?: boolean;
}

export const ResultCard = ({
  className,
  results,
  status,
  isError,
}: ResultCardProps) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <View className="flex flex-row items-center justify-between">
          <View>
            <CardTitle>
              <Text className="text-xl">Results</Text>
            </CardTitle>
            <CardDescription>
              <Text>This is where the results will be displayed</Text>
            </CardDescription>
          </View>
        </View>
      </CardHeader>
      <CardContent className="gap-4 flex-1">
        <Textarea
          className={cn("rounded-lg bg-transparent flex-1")}
          editable={false}
          shouldRasterizeIOS={false}
          value={results?.length ? results?.join("\n") : "No results"}
        />
      </CardContent>
      {status && (
        <CardFooter>
          <Text
            defaultColors={false}
            className={cn(
              "font-bold",
              isError ? "text-red-500" : "text-green-600"
            )}
          >
            {status}
          </Text>
        </CardFooter>
      )}
    </Card>
  );
};
