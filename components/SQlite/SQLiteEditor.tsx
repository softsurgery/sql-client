import React from "react";
import { View } from "react-native";
import * as SQLite from "expo-sqlite";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { ExmplesCard } from "./ExamplesCard";
import { EditorCard } from "./EditorCard";
import { ResultCard } from "./ResultCard";
import { SuggestionResponse } from "~/types/suggestions.types";

export const SQLiteEditor = () => {
  const navigation = useNavigation();
  const [db, setDb] = React.useState<SQLite.SQLiteDatabase | null>(null);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      title: "SQLite",
    });
    const createDatabaseConnection = async () => {
      const db = await SQLite.openDatabaseAsync("mydb.db");
      setDb(db);
    };
    createDatabaseConnection();
  }, []);

  const runQuery = async () => {
    if (!db) return;

    const actualQuery = query.trim();
    if (!actualQuery) {
      setStatus("Query cannot be empty.");
      setIsError(true);
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      if (actualQuery.toLowerCase().startsWith("select")) {
        const result = await db.getAllAsync(actualQuery);
        if (result && result.length > 0) {
          setResults(result.map((row) => JSON.stringify(row)));
          setStatus(`Query successful. ${result.length} rows returned.`);
        } else {
          setResults([]);
          setStatus("Query successful, but no rows returned.");
        }
      } else {
        await db.execAsync(actualQuery);
        setResults([]);
        setStatus("Query executed successfully.");
      }
      setIsError(false);
    } catch (error: any) {
      setResults([]);
      setStatus(`Error: ${error?.message}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const clearQuery = () => {
    setQuery("");
    setResults([]);
    setStatus("");
    setIsError(false);
  };

  const { data: suggestionResp, isPending: isSuggestionPending } = useQuery({
    queryKey: ["suggestion", query],
    queryFn: async () => {
      if (query) {
        const response = await axios.post<SuggestionResponse>(
          `${process.env.EXPO_PUBLIC_BASE_API_URL}/suggest`,
          {
            sql: query,
            cursor: query.length,
          }
        );
        return response.data;
      }
      return { suggestions: [] };
    },
  });

  const suggestion = React.useMemo(() => {
    if (!suggestionResp) return "";
    return suggestionResp?.suggestions?.[0];
  }, [suggestionResp]);

  return (
    <KeyboardAwareScrollView enableOnAndroid={true} bounces={false}>
      <View className="flex flex-col flex-1 flex-grow gap-5 p-5">
        {/* Example Queries */}
        <ExmplesCard
          setQuery={(query: string) => setQuery(query)}
          isPending={loading}
        />
        {/* Query Input Card */}
        <EditorCard
          isPending={loading}
          isSuggestionPending={isSuggestionPending}
          query={query}
          suggestion={suggestion}
          setQuery={setQuery}
          runQuery={runQuery}
          clearQuery={clearQuery}
        />
        {/* Results and Status */}
        <ResultCard results={results} status={status} isError={isError} />
      </View>
    </KeyboardAwareScrollView>
  );
};
