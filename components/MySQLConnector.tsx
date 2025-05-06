import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Text } from "./ui/text";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const ConnectMySQL = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      title: "MySQL Connector",
    });
  }, []);
  const [form, setForm] = useState({
    host: "",
    port: "3306",
    user: "",
    password: "",
    database: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    success: boolean;
    token?: string;
    error?: string;
  }>(null);

  const handleChange = (name: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleConnect = async () => {
    setLoading(true);
    setResult(null);
    console.log(process.env.BASE_API_URL)
    try {
      const response = await axios.post(`${process.env.BASE_API_URL}/api/v1/connect`, {
        ...form,
        port: Number(form.port),
      });
      console.log("Response:", response.data);
      setResult({ success: true, token: response.data.token });
    } catch (err: any) {
      console.log("Response:", err);
      setResult({
        success: false,
        error: err.response?.data?.error || "Connection failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid={true} bounces={false}>
      <View className="p-5">
        <Text className="text-xl font-bold mb-3">🔌 Connect to MySQL</Text>

        {/* Input Fields */}
        {["host", "port", "user", "password", "database"].map((field) => (
          <View key={field} className="mb-3">
            <Text className="mb-2 text-sm">{field}</Text>
            <Input
              className="h-10 border rounded-lg pl-2 text-sm"
              value={form[field as keyof typeof form]}
              onChangeText={(value) => handleChange(field, value)}
              secureTextEntry={field === "password"}
              keyboardType={field === "port" ? "numeric" : "default"}
            />
          </View>
        ))}

        {/* Connect Button */}
        <Button onPress={handleConnect} disabled={loading}>
          <Text>{loading ? "Connecting..." : "Connect"}</Text>
        </Button>

        {/* Loading Spinner */}
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" className="mt-5" />
        )}

        {/* Result Message */}
        {result && (
          <View className="mt-5 p-3 rounded-lg">
            {result.success ? (
              <>
                <Text className="text-green-600">
                  ✅ Connected successfully!
                </Text>
                <Text className="text-xs">
                  <Text className="font-bold">Token:</Text> {result.token}
                </Text>
              </>
            ) : (
              <>
                <Text className="text-red-600">❌ Connection failed!</Text>
                <Text className="text-xs">
                  <Text className="font-bold">Error:</Text> {result.error}
                </Text>
              </>
            )}
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
