import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AddDeckScreen } from "./components/AddDeck";

function DecksScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Decks!</Text>
		</View>
	);
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
