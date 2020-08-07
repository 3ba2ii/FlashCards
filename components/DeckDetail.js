import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class DeckDetail extends React.Component {
	render() {
		const { key, questions } = this.props.route.params[0];
		console.log(key, questions);
		return (
			<View style={[styles.container]}>
				<Text style={[styles.deckHeader]}>{key}</Text>
				{questions.length > 0 ? (
					<Text style={{ fontSize: 20 }}>{questions.length} cards</Text>
				) : (
					<Text> You didn't add any card to this deck</Text>
				)}

				{questions.length > 0 ? (
					<View style={{ marginTop: "auto" }}>
						<TouchableOpacity style={[styles.btn]}>
							<Text style={[styles.text]}>Add Card</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.btn]}>
							<Text style={[styles.text]}>Start Quiz</Text>
						</TouchableOpacity>
					</View>
				) : null}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 80,
		alignItems: "center",
		justifyContent: "center",
	},

	deckHeader: {
		fontSize: 40,
		color: "tomato",
		alignItems: "center",
		fontWeight: "bold",
		padding: 5,
	},
	btn: {
		padding: 25,
		borderRadius: 30,
		backgroundColor: "#333",
		margin: 10,
	},
	text: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "bold",
	},
});

export default DeckDetail;
