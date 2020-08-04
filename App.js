import * as React from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AddDeckScreen } from "./components/AddDeck";
import { getDecks } from "./utlis/helpers";

class DecksScreen extends React.Component {
	state = {
		decks: null,
		loading: false,
	};
	async componentDidMount() {
		setTimeout(
			() =>
				getDecks().then((data) =>
					this.setState({ decks: data, loading: true })
				),
			400
		);
	}

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
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>{JSON.stringify(this.state)}</Text>
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
	return <NavigationContainer>{NavBar()}</NavigationContainer>;
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
});
