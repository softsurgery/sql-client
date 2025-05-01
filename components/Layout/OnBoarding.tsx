import * as React from "react";
import { Image, View } from "react-native";
import { useNavigation } from "expo-router";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

export default function OnBoarding() {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 justify-between items-center p-6">
      <View className="flex-1 justify-center items-center">
        <Image
          className="h-80 w-80"
          source={require("~/assets/images/adaptive-icon.png")}
          style={{ resizeMode: "contain" }}
        />
        <Text className="text-[5rem] font-bold italic">SQL Wizard</Text>
        <Text className="text-xl font-semibold text-primary/70">
          The future of Mobile SQL
        </Text>
        <Text className="text-sm text-primary/70">
          Discover the future of SQL with SQL Wizard
        </Text>
      </View>

      <Button
        className="w-full mb-6"
        onPress={() => navigation.navigate("application")}
      >
        <Text className="text-3xl tracking-wider font-bold">GET STARTED</Text>
      </Button>
    </View>
  );
}
