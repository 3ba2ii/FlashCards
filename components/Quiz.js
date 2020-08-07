import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Quiz extends React.Component {
	state = {
		showAnswer: false,
		score: 0,
		selectedQuestion: 0,
	};
	handleScore = (answer) => {
		this.setState((prevState) => {
			return {
				score: answer === "incorrect" ? prevState.score : prevState.score + 1,
				selectedQuestion: prevState.selectedQuestion + 1,
				showAnswer: false,
			};
		});
	};
	render() {
		const { showAnswer, score, selectedQuestion } = this.state;
		const { title, questions } = this.props.route.params;

		if (selectedQuestion >= questions.length) {
			return (
				<View style={[styles.container]}>
					<Text style={[styles.header]}>
						You've correctly answered {score} questions out of{" "}
						{questions.length} 🥳
					</Text>
					<TouchableOpacity
						style={[styles.btn]}
						onPress={() =>
							this.setState({
								showAnswer: false,
								selectedQuestion: 0,
								score: 0,
							})
						}
					>
						<Text style={{ color: "#eee", fontWeight: "bold" }}>
							Restart Quiz!
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.btn]}
						onPress={() => this.props.navigation.navigate("Deck")}
					>
						<Text style={{ color: "#eee", fontWeight: "bold" }}>
							Back to Deck
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
		const { question, answer } = questions[selectedQuestion];
		return (
			<View style={[styles.container]}>
				<Text>
					{selectedQuestion + 1}/{questions.length}
				</Text>
				{!showAnswer ? (
					<Text style={[styles.header]}>{question}</Text>
				) : (
					<View>
						<Text
							style={{
								fontSize: 20,
								textAlign: "center",
								marginTop: 20,
								color: "#333",
							}}
						>
							The answer is
						</Text>
						<Text style={[styles.header]}>{answer}</Text>
					</View>
				)}

				{!showAnswer && (
					<TouchableOpacity
						style={[styles.btn]}
						onPress={() => this.setState({ showAnswer: true })}
					>
						<Text style={{ color: "#eee", fontWeight: "bold" }}>Answer</Text>
					</TouchableOpacity>
				)}
				{showAnswer && (
					<View>
						<TouchableOpacity
							style={{ ...styles.btn, backgroundColor: "green" }}
							onPress={this.handleScore}
						>
							<Text style={{ color: "#eee", fontWeight: "bold" }}>Correct</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ ...styles.btn, backgroundColor: "red" }}
							onPress={() => this.handleScore("incorrect")}
						>
							<Text style={{ color: "#eee", fontWeight: "bold" }}>
								Incorrect
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 0.7,
		justifyContent: "center",
		alignItems: "center",
	},
	btn: {
		marginTop: 40,
		backgroundColor: "#333",
		borderRadius: 40,
		padding: 20,
	},
	header: {
		padding: 30,
		fontSize: 25,
		color: "tomato",
	},
});
