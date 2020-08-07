import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AddDeckScreen } from "./AddDeck";
import { DecksScreen } from "./DecksScreen";
import { Tab } from "../App";

export function NavBar() {
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
