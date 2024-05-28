import { DataInitialProps } from "@app/utils/DataInitialProps";
import { Navigator } from "@app/utils/Navigator";
import { RouteNames } from "@app/values/RouteNames";
import { Component } from "react";
import { Text, View } from "react-native";

declare interface Props {

}

declare interface State {

}
class EntranceScreen extends Component<Props, State> {
    componentDidMount(): void {
        setTimeout(() => {
            if (DataInitialProps.getToScreen() === 'MainScreen') {
                Navigator.replace(RouteNames.MAIN_SCREEN, { name: "hung" })
            } else {
                Navigator.replace(RouteNames.LOGIN_SCREEN)
            }
        }, 100)
    }

    render() {
        return (
            <View>
                <Text style={{ color: '#10239e' }}>
                    Entrance
                </Text>
            </View>
        )
    }
}
export default EntranceScreen;