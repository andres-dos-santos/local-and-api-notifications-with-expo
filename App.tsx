import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const PROJECT_ID = Constants.expoConfig?.extra?.eas.projectId;

export default function App() {
  const handleRequestPermission = async () => {
    const data = await Notifications.requestPermissionsAsync();

    console.log(data);
  };

  const handleCallNotifications = async () => {
    // handleRequestPermission()

    const { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Without permissions.");

      return;
    }

    /** await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello.",
        body: "Notification is here!",
      },
      trigger: {
        seconds: 5,
      },
    }); */

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: PROJECT_ID,
    });

    console.log(token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Open up App.tsx to start working on your app!
      </Text>

      <Button title="Notificar" onPress={handleCallNotifications} />

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
