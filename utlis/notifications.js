import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { AsyncStorage } from "react-native";

const NOTIFICATIONS_KEY = "Flashcards:notifications";
export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATIONS_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync
	);
}

function createNotification() {
	return {
		title: "Time to answer your daily quiz!",
		body: "👋🏻 Hey, You didn't complete any quiz for today, we missed you!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: "high",
			sticky: false,
			vibrate: true,
		},
	};
}
export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATIONS_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === "granted") {
						Notifications.cancelAllScheduledNotificationsAsync();
						let tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate() + 1);
						tomorrow.setHours(20);
						tomorrow.setMinutes(0);
						Notifications.scheduleLocalNotificationAsync(createNotification(), {
							time: tomorrow,
							repeat: "day",
						});
						AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
					}
				});
			}
		});
}
