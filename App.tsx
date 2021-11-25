import { createDrawerNavigator } from "@react-navigation/drawer";
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import DrawerButton from "./components/DrawerButton";
import NavigationDrawer from "./components/NavigationDrawer";
import ThemeSwitch from "./components/ThemeSwitch";
import HomeScreen from "./screens/HomeScreen";
import useTheme from "./store/useTheme";

const Drawer = createDrawerNavigator();
export default function App() {
	const { isDark } = useTheme();
	return (
		<NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
			<StatusBar style={isDark ? "light" : "dark"} />
			<Drawer.Navigator
				initialRouteName="Feed"
				screenOptions={{
					headerTitleAlign: "center",
					headerRight: () => <ThemeSwitch />,
					headerLeft: () => <DrawerButton />,
				}}
				drawerContent={(props) => <NavigationDrawer {...props} />}
			>
				<Drawer.Screen name="Feed" component={HomeScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
