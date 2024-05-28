import { Navigator } from "@app/utils/Navigator";
import { RouteNames } from "@app/values/RouteNames";
import { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";


class RegisterScreen extends Component<any, any>{
    constructor(props: any) {
        super(props)
    }

    _moveToMainScreen() {
        Navigator.resetAndPush(RouteNames.MAIN_SCREEN)
    }
    _moveToLoginScreen() {
        Navigator.goBack()
    }
    render() {
        return (
            <View style={{ flex: 1 , backgroundColor: '#ffe7ba'}}>
                 <Text style={{ fontSize: 20, color: 'blue' }}>
                    Register
                </Text>
                <TouchableOpacity onPress={this._moveToLoginScreen.bind(this)}>
                    <Text
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: 'red'
                        }}
                    >Back</Text>
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
export default RegisterScreen;