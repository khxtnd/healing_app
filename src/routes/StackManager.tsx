import EntranceScreen from "@app/screens/EntranceScreen";
import LoginScreen from "@app/screens/LoginScreen";
import MainScreen from "@app/screens/MainScreen";
import RegisterScreen from "@app/screens/RegisterScreen";
import CallScreenSocketIO from "@app/screens/SocketIO/CallScreen";
import IncomingCallScreen from "@app/screens/SocketIO/IncomingCallScreen";
import JoinScreen from "@app/screens/SocketIO/JoinScreen";
import OutgoingCallScreen from "@app/screens/SocketIO/OutgoingCallScreen";
import CallScreenWebsocket from "@app/screens/WebSocket/CallScreen";
import IncomingScreenWebsocket from "@app/screens/WebSocket/IncomingCallScreen";
import JoinScreenWebsocket from "@app/screens/WebSocket/JoinScreen";
import OutgoingScreenWebsocket from "@app/screens/WebSocket/OutgoingCallScreen";
import { RouteNames } from "@app/values/RouteNames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
type StackRouteType = {
  name: string,
  component: any,
}
const listStackRoute: StackRouteType[] = [
  {
    name: RouteNames.ENTRANCE_SCREEN,
    component: EntranceScreen
  },
  {
    name: RouteNames.LOGIN_SCREEN,
    component: LoginScreen
  },
  {
    name: RouteNames.REGISTER_SCREEN,
    component: RegisterScreen
  },
  {
    name: RouteNames.MAIN_SCREEN,
    component: MainScreen
  },
  {
    name: RouteNames.JOIN_SCREEN_SOCKET_IO,
    component: JoinScreen,
  },
  {
    name: RouteNames.OUTGOING_SCREEN_SOCKET_IO,
    component: OutgoingCallScreen,
  },
  {
    name: RouteNames.INCOMMING_SCREEN_SOCKET_IO,
    component: IncomingCallScreen,
  },
  {
    name: RouteNames.CALL_SCREEN_SOCKET_IO,
    component: CallScreenSocketIO,
  },
  {
    name: RouteNames.JOIN_SCREEN_WEB_SOCKET,
    component: JoinScreenWebsocket,
  },
  {
    name: RouteNames.OUTGOING_SCREEN_WEB_SOCKET,
    component: OutgoingScreenWebsocket,
  },
  {
    name: RouteNames.INCOMMING_SCREEN_WEB_SOCKET,
    component: IncomingScreenWebsocket,
  },
  {
    name: RouteNames.CALL_SCREEN_WEB_SOCKET,
    component: CallScreenWebsocket,
  }, 
]

export const StackManager = () => {

  return (
    <Stack.Navigator
      initialRouteName={RouteNames.ENTRANCE_SCREEN}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      {
        listStackRoute.map((r, i) => <Stack.Screen {...r} key={i} />)
      }
    </Stack.Navigator>
  )
}