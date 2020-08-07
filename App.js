import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavBar } from "./components/NavBar";
import DeckDetail from "./components/DeckDetail";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";

export const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function Deck() {
	return (
		<View>
			<Text>Hello</Text>
		</View>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Decks" component={NavBar} />
				<Stack.Screen name="Deck" component={DeckDetail} />
				<Stack.Screen name="AddCard" component={AddCard} />
				<Stack.Screen name="Quiz" component={Quiz} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export const styles = StyleSheet.create({
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
