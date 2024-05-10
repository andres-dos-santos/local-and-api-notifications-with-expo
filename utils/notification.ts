import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const PROJECT_ID = Constants.expoConfig?.extra?.eas.projectId;

const onRequestPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  return status;
};

const onGetExpoToken = async () => {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("Without permissions.");

    return;
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: PROJECT_ID,
  });

  return token.data;
};

const onSendLocalNotification = async () => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hello.",
      body: "This is local notification from Expo!",
    },
    trigger: {
      seconds: 5,
    },
  });
};

export const notification = {
  onRequestPermission,
  onGetExpoToken,
  onSendLocalNotification,
};
