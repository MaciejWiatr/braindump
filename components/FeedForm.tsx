import { BlurView } from "@react-native-community/blur";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from "react-native";
import useFeedItems from "../store/useFeedItems";
import useTheme from "../store/useTheme";
import useThemableStyles from "../utils/useThemableStyles";
import * as Clipboard from "expo-clipboard";

const FeedForm = () => {
	const { addItem } = useFeedItems();
	const { isDark } = useTheme();
	const { s, t } = useThemableStyles(isDark);
	const [initialUrlValue, setInitialUrlValue] = useState("");

	useEffect(() => {
		const checkClipboardContainsUrl = async () => {
			const clip = await Clipboard.getStringAsync();
			if (!clip.includes("http")) return;

			setInitialUrlValue(clip);
		};
		checkClipboardContainsUrl();
	}, []);

	return (
		<View style={styles.formContainer}>
			<Formik
				enableReinitialize
				initialValues={{ url: initialUrlValue }}
				onSubmit={(values, { resetForm }) => {
					addItem({
						id: Math.floor(Math.random() * 20000),
						description: "bonjour meine friend",
						title: values.url,
						image: "https://placeimg.com/640/480/tech",
						uploadDate: new Date(),
					});
					setInitialUrlValue("");
					resetForm();
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, values }) => (
					<View style={s(styles.blurWrapper, darkStyles.blurWrapper)}>
						<BlurView
							blurType={t("xlight", "dark")}
							blurAmount={80}
							style={styles.formBlur}
							reducedTransparencyFallbackColor="white"
						/>
						<View style={styles.formWrapper}>
							<TextInput
								placeholder="Some fancy url ✨"
								onChangeText={handleChange("url")}
								onBlur={handleBlur("url")}
								value={values.url}
								placeholderTextColor={t("gray", "#909090")}
								style={s(
									styles.formInput,
									darkStyles.formInput
								)}
							/>
							<TouchableOpacity
								style={s(
									styles.formButton,
									darkStyles.formButton
								)}
								onPress={() => handleSubmit()}
							>
								<Text
									style={s(
										styles.formButtonText,
										darkStyles.formButtonText
									)}
								>
									Send
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</Formik>
		</View>
	);
};

export default FeedForm;

const darkStyles = StyleSheet.create({
	formButton: {
		backgroundColor: "white",
	},
	formButtonText: {
		color: "black",
	},
	formInput: {
		color: "white",
		borderColor: "#909090",
		backgroundColor: "rgba(0,0,0,0)",
	},
	blurWrapper: {
		backgroundColor: "rgba(255,255,255,0.2)",
		borderWidth: 0,
	},
});

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		position: "absolute",
		overflow: "hidden",
		minHeight: 80,
		bottom: 0,
	},
	formBlur: {
		overflow: "hidden",
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	blurWrapper: {
		position: "relative",
		overflow: "hidden",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderColor: "#dddddd",
		borderWidth: 0.8,
		borderBottomWidth: 0,
	},
	formWrapper: {
		padding: 15,
		paddingHorizontal: 15,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: "100%",
		elevation: 2,
	},
	formInput: {
		width: "77%",
		height: "100%",
		borderRadius: 10,
		paddingHorizontal: 20,
		backgroundColor: "white",
		borderWidth: 0.5,
		borderColor: "#cccccc",
	},
	formButton: {
		width: "20%",
		backgroundColor: "black",
		borderRadius: 10,
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	formButtonText: {
		color: "white",
		textAlign: "center",
	},
});
