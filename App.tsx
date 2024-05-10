import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useState } from "react";

import { notification } from "./utils/notification";

const PROJECT_ID = Constants.expoConfig?.extra?.eas.projectId;

type Info = {
  status?: string;
  token?: string;
  PROJECT_ID?: string;
};

export default function App() {
  const [info, setInfo] = useState<Info | null>(null);

  const handle = async () => {
    const status = await notification.onRequestPermission();

    const token = await notification.onGetExpoToken();

    setInfo({ status, token, PROJECT_ID });

    await notification.onSendLocalNotification();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{JSON.stringify(info, null, 2)}</Text>

      <Button title="Pegar informação e notificar" onPress={handle} />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    marginBottom: 20,
  },
});
