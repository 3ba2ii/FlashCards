import React, { useState } from "react";

import {
	Text,
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { fetchFonts } from "../fonts";
import { AppLoading } from "expo";

const addDeckHandler = (title) => {
	console.log(title);
};
export function AddDeckScreen() {
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
					alignSelf: "left",
				}}
				placeholder="e.g. Data Structure."
				onChangeText={(text) => setText(text)}
				defaultValue={text}
			/>
			<TouchableOpacity
				style={[styles.btn]}
				onPress={() => addDeckHandler(text)}
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
