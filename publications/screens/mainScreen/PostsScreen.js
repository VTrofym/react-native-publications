import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreensPosts from "../nestedScreens/DefaultScreensPosts";
import CommentsScreens from "../nestedScreens/CommentsScreens";
import MapScreens from "../nestedScreens/MapScreens";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreensPosts}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreens} />
      <NestedScreen.Screen name="Map" component={MapScreens} />
    </NestedScreen.Navigator>
  );
}
