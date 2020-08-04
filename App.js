import * as React from "react";
import {
	Text,
	View,
	ActivityIndicator,
	StyleSheet,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AddDeckScreen } from "./components/AddDeck";
import { getDecks } from "./utlis/helpers";
import Constants from "expo-constants";

class DecksScreen extends React.Component {
	state = {
		decks: null,
		loading: false,
	};
	componentDidMount() {
		setTimeout(
			() =>
				getDecks().then((data) =>
					this.setState({ decks: data, loading: true })
				),
			400
		);
	}
	handleIndividualDeck = (deck) => {
		console.log(deck);
		//TODO Navigate to selected Deck Screen
	};
	renderDecks = ({ item }) => {
		return (
			<TouchableOpacity
				style={[styles.deckContainer]}
				onPress={() => this.handleIndividualDeck(item)}
			>
				<Text style={[styles.deckHeader]}>{item["title"]}</Text>
				<Text>{item["questions"].length} Cards </Text>
			</TouchableOpacity>
		);
	};

	render() {
		const { decks, loading } = this.state;
		if (!loading) {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="tomato" />
				</View>
			);
		}
		return (
			<View>
				<Text
					style={{
						fontSize: 40,
						marginVertical: 50,
						color: "#333",
						textAlign: "center",
					}}
				>
					DECKS
				</Text>
				<FlatList data={decks} renderItem={this.renderDecks} />
			</View>
		);
	}
}

const Tab = createBottomTabNavigator();

function NavBar() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Add Deck") {
						iconName = focused ? "ios-add-circle" : "ios-add";
					} else if (route.name === "Decks") {
						iconName = focused ? "ios-list-box" : "ios-list";
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: "tomato",
				inactiveTintColor: "gray",
			}}
		>
			<Tab.Screen name="Decks" component={DecksScreen} />
			<Tab.Screen name="Add Deck" component={AddDeckScreen} />
		</Tab.Navigator>
	);
}
export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaView
				backgroundColor="tomato"
				height={Constants.statusBarHeight}
			/>

			{NavBar()}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
	},
	deckContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	deckHeader: {
		fontSize: 30,
		color: "tomato",
		alignItems: "center",
	},
});
