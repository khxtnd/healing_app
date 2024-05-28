
import { TopTabManager } from "@app/routes/TopTabManager";
import { Navigator } from "@app/utils/Navigator";
import { RouteNames } from "@app/values/RouteNames";
import { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";


class TabHomeScreen extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    _moveToMainScreen() {
        Navigator.replace(RouteNames.MAIN_SCREEN)
    }

    _moveToRegisterScreen() {
        Navigator.navigate(RouteNames.REGISTER_SCREEN)
    }
    render() {
        return (
            <TopTabManager/>
        )
    }
}
export default TabHomeScreen;