import { AsyncStorage } from "react-native";
import { setDummyData } from "./_decks";

export async function loadDummyDecks() {
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
export function saveDeckTitle(title) {
	return AsyncStorage.setItem(
		title,
		JSON.stringify({ title: title, questions: [] })
	);
}

export function addCardToDeck(key, question, answer) {
	AsyncStorage.getItem(key)
		.then((res) => {
			let { questions } = JSON.parse(res);

			questions.push({ question: question, answer: answer });

			AsyncStorage.mergeItem(key, JSON.stringify({ questions }))
				.then(() => console.log("ADDED CARD SUCCESSFULLY"))
				.catch(() => console.log("ERROR WHILE ADDING CARD"));
		})
		.then(() => console.log("ADDED CARD SUCCESSFULLY"))
		.catch(() => console.log("ERROR WHILE ADDING CARD"));
}
