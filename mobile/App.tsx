import React from "react";
import { View } from "react-native";

import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { theme } from "./src/theme/";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import Widget from "./src/components/Widget/";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Widget />
        <StatusBar
          style="light"
          backgroundColor={"transparent"}
          translucent={true}
        />
      </GestureHandlerRootView>
    </View>
  );
}
