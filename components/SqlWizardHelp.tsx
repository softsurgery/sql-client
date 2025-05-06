import { useNavigation } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Text } from "~/components/ui/text";

export const SqlWizardHelp = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      title: "SQL Wizard FAQs",
    });
  }, []);
  return (
    <ScrollView className="flex-1 px-4 py-2">
      <Accordion
        type="multiple"
        collapsible
        defaultValue={["sqlite", "remote"]}
        className="w-full"
      >
        <AccordionItem value="sqlite">
          <AccordionTrigger>
            <Text>🗃️ How does the SQLite tab work?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              The SQLite tab allows you to run SQL queries directly in your
              browser using a local SQLite database. It&apos;s perfect for quick
              tests and learning SQL. No server or setup is required —
              everything runs locally.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="remote">
          <AccordionTrigger>
            <Text>🌐 How does the Remote MySQL tab work?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              The Remote MySQL tab connects to a backend Node.js server. You
              provide the MySQL credentials (host, port, user, password), and it
              returns a token that lets you securely query any database through
              the API.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="connect">
          <AccordionTrigger>
            <Text>🔑 How do I connect to my own MySQL server?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Go to the &apos;Remote MySQL&apos; tab, then enter your
              server&apos;s host, port, username, password, and optional
              database name. After connecting, you&apos;ll receive a token to
              use for your queries.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="query">
          <AccordionTrigger>
            <Text>📥 How do I send SQL queries?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              After connecting, use the query input area to write SQL
              statements. The app will send them (along with your session token)
              to the Node.js backend, which executes the query and returns the
              results.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger>
            <Text>🔒 Is my connection secure?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              Currently, connections are not encrypted. Make sure you&apos;re
              using this tool in trusted environments. We recommend running the
              backend locally or behind a VPN. Future versions may include
              authentication and HTTPS.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollView>
  );
};
