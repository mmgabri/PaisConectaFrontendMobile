import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Mais from '../screens/Mais'
import TabNavigator from './TabNavigator'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="voltar" component={TabNavigator} />
      <Drawer.Screen name="Mais" component={Mais} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;