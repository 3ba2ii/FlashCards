import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { addCardToDeck } from "../utlis/helpers";

const handleAddCardToDeck = (key, question, answer) => {
	addCardToDeck(key, question, answer);
};
export default function AddCard({ route, navigation }) {
	const { key } = route.params;
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	navigation.setOptions({
		title: `${key}`,
	});

	return (
		<View style={[styles.container]}>
			<Text
				style={{
					fontSize: 20,
					color: "tomato",
					fontWeight: "bold",
					margin: "auto",
					textAlign: "center",
					paddingBottom: 50,
				}}
			>
				Adding Card to {key} Deck
			</Text>
			<Text
				style={{
					fontSize: 18,
					color: "#444",
					fontWeight: "bold",
					marginBottom: 10,
				}}
			>
				Question
			</Text>
			<TextInput
				style={{
					marginVertical: 20,
					fontSize: 18,
					color: "#222",
				}}
				placeholder="What is the best programming language?"
				onChangeText={(question) => setQuestion(question)}
				defaultValue={question}
			/>
			<Text
				style={{
					fontSize: 18,
					color: "#444",
					fontWeight: "bold",
					marginBottom: 10,
				}}
			>
				Answer
			</Text>

			<TextInput
				style={{
					margin: 10,
					fontSize: 18,
					color: "#222",
					marginVertical: 20,
				}}
				placeholder="e.g. JavaScript"
				onChangeText={(answer) => setAnswer(answer)}
				defaultValue={answer}
			/>
			<TouchableOpacity
				style={[styles.btn]}
				onPress={() => {
					navigation.navigate("Decks");
					return handleAddCardToDeck(key, question, answer);
				}}
				disabled={!question || !answer}
			>
				<Text style={{ color: "#fff" }}>Add Card</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 0.7,
		justifyContent: "center",
		alignItems: "flex-start",
		marginLeft: 30,
	},
	btn: {
		marginTop: 40,
		backgroundColor: "tomato",
		borderRadius: 40,
		padding: 18,
		alignSelf: "center",
	},
});
