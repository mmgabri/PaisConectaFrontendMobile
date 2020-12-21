import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "../contexts/auth";
import DrawerNavigator from './DrawerNavigator'

const App = () => {

  return (
    <NavigationContainer>
      <AuthProvider>
        <DrawerNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;