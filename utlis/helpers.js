import { AsyncStorage } from "react-native";
import { DECKS_STORAGE_KEY } from "./_decks";
import { setDummyData } from "./_decks";

export function loadDummyDecks() {
	let data = setDummyData();
	try {
		Object.keys(data).forEach((key) => {
			AsyncStorage.setItem(key, JSON.stringify(data[key]));
		});
	} catch (error) {
		console.log(error);
	}
}
export function getDecks() {
	return AsyncStorage.getAllKeys().then((keys) => {
		return AsyncStorage.multiGet(keys).then((stores) => {
			return stores
				.map((result, i, store) => {
					let key = store[i][0];
					let value = JSON.parse(store[i][1]);
					if (value) {
						return {
							key,
							title: value.title,
							questions: value.questions,
						};
					}
				})
				.filter((items) => {
					if (items) {
						return typeof items.questions !== "undefined";
					}
				});
		});
	});
}
