import { AppLoading } from "expo";
import * as Font from "expo-font";
import React, { useState } from "react";

export const fetchFonts = () => {
	return Font.loadAsync({
		"roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
		"roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
		"roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
	});
};
export const fontComponent = () => {
	const [dataLoaded, setDataLoaded] = useState(false);
	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
			/>
		);
	}
};
