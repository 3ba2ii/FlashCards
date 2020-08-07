import React from "react";
import {
	Text,
	View,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { loadDummyDecks, getDecks } from "../utlis/helpers";
import { styles } from "../App";

export class DecksScreen extends React.Component {
	state = {
		decks: null,
		loading: false,
	};
	componentDidMount() {
		if (this.state.decks === null) {
			loadDummyDecks().then((res) =>
				setTimeout(
					() =>
						getDecks().then((data) =>
							this.setState({ decks: data, loading: true })
						),
					400
				)
			);
		} else {
			getDecks().then((data) => this.setState({ decks: data, loading: true }));
		}
	}

	handleIndividualDeck = (deck) => {
		console.log(deck);
		//TODO Navigate to selected Deck Screen
	};
	renderDecks = ({ item }) => {
		return (
			<TouchableOpacity
				style={[styles.deckContainer]}
				onPress={() =>
					this.props.navigation.navigate("Deck", (params = [item]))
				}
			>
				<Text style={[styles.deckHeader]}>{item["title"]}</Text>
				<Text>{item["questions"].length} Cards </Text>
			</TouchableOpacity>
		);
	};

	render() {
		const { decks, loading } = this.state;
		console.log(decks);
		if (!loading) {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="tomato" />
				</View>
			);
		}
		return (
			<View>
				<FlatList data={decks} renderItem={this.renderDecks} />
			</View>
		);
	}
}
