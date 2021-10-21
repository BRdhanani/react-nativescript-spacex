import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import {
  backgroundColorProperty,
  Dialogs,
  FlexboxLayout
} from "@nativescript/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "./NavigationParamList";

type HomeScreenProps = {
  route: RouteProp<MainStackParamList, "Home">;
  navigation: FrameNavigationProp<MainStackParamList, "Home">;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [launcheData, setLauncheData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await setIsLoading(true);
      await fetch("https://api.spacexdata.com/v3/launches")
        .then(response => response.json())
        .then(data => setLauncheData(data.slice(1, 7)));
      await setIsLoading(false);
    })();
  }, []);

  return (
    <flexboxLayout
      flexDirection="column"
      width="100%"
      backgroundColor="white"
      height="300"
      margin={50}
      marginTop={250}
    >
      <label
        fontSize={20}
        textAlignment="center"
        color="#65adf1"
        textTransform="uppercase"
      >
        Welcome to the universe
      </label>
      <image src="~/logo.png" width={200} height={100} alignSelf="center" />
      <button
        backgroundColor="#65adf1"
        color="white"
        onTap={() => navigation.navigate("Launches")}
        alignSelf="center"
      >
        Go to launches
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center"
  },
  text: {
    textAlignment: "center",
    fontSize: 24,
    color: "black"
  },
  button: {
    fontSize: 24,
    color: "#2e6ddf"
  }
});
