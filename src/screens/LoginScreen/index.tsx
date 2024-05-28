import { Navigator } from "@app/utils/Navigator";
import { RouteNames } from "@app/values/RouteNames";
import { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

declare interface Props {

}

declare interface State {

}
class LoginScreen extends Component<Props, State> {
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
            <View style={{ flex: 1, backgroundColor: '#ffe7ba' }}>
                <Text style={{ fontSize: 20, color: 'blue' }}>
                    LoginScreen
                </Text>
                <TouchableOpacity onPress={this._moveToRegisterScreen.bind(this)}>
                    <Text
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: 'red'
                        }}
                    >Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._moveToMainScreen.bind(this)}>
                    <Text
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: 'green'
                        }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default LoginScreen;