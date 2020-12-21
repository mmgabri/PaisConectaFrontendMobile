import { DrawerActions } from "@react-navigation/drawer";

function openDrawer(routeName, params) {
  _navigator.dispatch(DrawerActions.openDrawer());
}

export default { openDrawer };