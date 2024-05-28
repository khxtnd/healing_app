import Bottom from "@app/screens/MainScreen/ProfileScreen/Bottom";
import Center from "@app/screens/MainScreen/ProfileScreen/Center";
import Top from "@app/screens/MainScreen/ProfileScreen/Top";
import { Navigator } from "@app/utils/Navigator";
import { RouteNames } from "@app/values/RouteNames";
import { Component } from "react";
import { Text, View } from "react-native";


class ProfileScreen extends Component<any, any> {
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
                    ProfileScreen
                </Text>
                <Top/>
                <Center />
                <Bottom  count= {12} name={"khanh"} />
            </View>
        )
    }
}
export default ProfileScreen;