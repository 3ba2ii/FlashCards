import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getDeck } from "../utlis/helpers";

class DeckDetail extends React.Component {
	state = {
		key: null,
		questions: null,
		loaded: false,
	};
	componentDidMount() {
		const { key } = this.props.route.params[0];
		getDeck(key).then((deck) => {
			const { title, questions } = JSON.parse(deck);
			this.setState({
				key: title,
				questions: questions,
				loaded: true,
			});
		});
	}
	componentDidUpdate() {
		getDeck(this.state.key).then((deck) => {
			const { title, questions } = JSON.parse(deck);
			this.setState({
				key: title,
				questions: questions,
				loaded: true,
			});
		});
	}
	setTitle = (key) => {
		this.props.navigation.setOptions({
			title: `${key}`,
		});
	};

	render() {
		const { key, questions, loaded } = this.state;

		this.setTitle(key);

		if (!loaded) {
			return (
				<View>
					<Text>Loading</Text>
				</View>
			);
		}
		return (
			<View style={[styles.container]}>
				<Text style={[styles.deckHeader]}>{key}</Text>
				{questions.length > 0 ? (
					<Text style={{ fontSize: 20 }}>{questions.length} cards</Text>
				) : (
					<Text> You didn't add any card to this deck</Text>
				)}
				<View>
					<TouchableOpacity
						style={[styles.btn]}
						onPress={() =>
							this.props.navigation.navigate("AddCard", {
								key: key,
							})
						}
					>
						<Text style={[styles.text]}>Add Card</Text>
					</TouchableOpacity>
					{questions.length > 0 ? (
						<TouchableOpacity
							style={[styles.btn]}
							onPress={() =>
								this.props.navigation.navigate(
									"Quiz",
									(params = { title: key, questions: questions })
								)
							}
						>
							<Text style={[styles.text]}>Start Quiz</Text>
						</TouchableOpacity>
					) : null}
				</View>
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
		padding: 20,
		borderRadius: 30,
		backgroundColor: "#333",
		margin: 15,
	},
	text: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "bold",
	},
});

export default DeckDetail;
