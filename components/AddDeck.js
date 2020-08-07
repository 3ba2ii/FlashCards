import React, { useState } from "react";
import { saveDeckTitle } from "../utlis/helpers";
import {
	Text,
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { fetchFonts } from "../fonts";
import { AppLoading } from "expo";

const addDeckHandler = (title, navigation) => {
	const deck = { key: title, questions: [] };
	saveDeckTitle(title)
		.then(() => {
			console.log("SUCCESS");
			navigation.navigate("Deck", (params = [deck]));
		})
		.catch((err) => console.log("ERROR", err));
};
export function AddDeckScreen({ navigation }) {
	const [text, setText] = useState("");
	const [dataLoaded, setDataLoaded] = useState(false);
	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
			/>
		);
	}
	return (
		<View style={[styles.container]}>
			<Text
				style={{ fontFamily: "roboto-bold", fontSize: 30, color: "tomato" }}
			>
				What is the name of your Deck?
			</Text>
			<TextInput
				style={{
					margin: 50,
					fontFamily: "roboto-regular",
					fontSize: 20,
					color: "#222",
				}}
				placeholder="e.g. Data Structure."
				onChangeText={(text) => setText(text)}
				defaultValue={text}
			/>
			<TouchableOpacity
				style={[styles.btn]}
				onPress={() => {
					setText("");
					return addDeckHandler(text, navigation);
				}}
				disabled={!text}
			>
				<Text style={{ color: "#fff", fontFamily: "roboto-bold" }}>
					Add Deck
				</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	btn: {
		marginTop: 40,
		backgroundColor: "tomato",
		borderRadius: 40,
		padding: 18,
	},
});
