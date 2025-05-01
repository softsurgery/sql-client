import React from "react";
import { View } from "react-native";
import * as SQLite from "expo-sqlite";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ExmplesCard } from "./ExamplesCard";
import { EditorCard } from "./EditorCard";
import { ResultCard } from "./ResultCard";

export const SQLiteEditor = () => {
  const [db, setDb] = React.useState<SQLite.SQLiteDatabase | null>(null);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
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

  return (
    <KeyboardAwareScrollView enableOnAndroid={true} bounces={false}>
      <View className="flex flex-col flex-1 flex-grow gap-4 p-4 border">
        {/* Example Queries */}
        <ExmplesCard
          setQuery={(query: string) => setQuery(query)}
          isPending={loading}
        />
        {/* Query Input Card */}
        <EditorCard
          isPending={loading}
          query={query}
          setQuery={setQuery}
          runQuery={runQuery}
          clearQuery={clearQuery}
        />
        {/* Results and Status */}
        <ResultCard
          className="h-[30vh]"
          results={results}
          status={status}
          isError={isError}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
