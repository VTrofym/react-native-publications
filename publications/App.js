import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react";

import { useRoute } from "./router";
import { store } from "./redux/store";

export default function App() {
  const routing = useRoute(true);
  return (
    // <Provider store={store}>
    <NavigationContainer>{routing}</NavigationContainer>
    // </Provider>
  );
}
