import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { Dialogs, FlexboxLayout } from "@nativescript/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "./NavigationParamList";

type LaunchesProps = {
  route: RouteProp<MainStackParamList, "Launches">;
  navigation: FrameNavigationProp<MainStackParamList, "Launches">;
};

export function Launches({ navigation }: LaunchesProps) {
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
  return isLoading ? (
    <flexboxLayout
      flexDirection="column"
      width="100%"
      backgroundColor="white"
      height="100"
      margin={50}
      marginTop={250}
    >
      <label fontSize={20} paddingLeft={10} fontWeight="bold">
        Loading....
      </label>
      <progress value={50} maxValue={100} />
    </flexboxLayout>
  ) : (
    <>
      <image src="~/logo.png" width={50} height={50} />
      <flexboxLayout
        flexDirection="column"
        width={100}
        backgroundColor="#65adf1"
      >
        {launcheData?.map((launch, index) => (
          <flexboxLayout
            alignItems="flex-start"
            backgroundColor="#3c495e"
            borderColor="black"
            borderWidth={1}
            margin={10}
            key={index}
          >
            <flexboxLayout
              flexDirection="column"
              width="50%"
              backgroundColor="white"
              height="100"
              paddingTop={20}
            >
              <label
                fontSize={20}
                paddingLeft={10}
                color={launch.launch_success ? "green" : "red"}
              >
                {launch.mission_name}
              </label>
              <label fontSize={20} paddingLeft={10} fontWeight="bold">
                {launch.launch_date_local.split("T")[0]}
              </label>
            </flexboxLayout>
            <flexboxLayout
              flexDirection="column"
              width="50%"
              backgroundColor="white"
              height="100"
              paddingTop={20}
            >
              <button backgroundColor="gray" color="white">
                Launch Detail
              </button>
            </flexboxLayout>
          </flexboxLayout>
        ))}
      </flexboxLayout>
    </>
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
