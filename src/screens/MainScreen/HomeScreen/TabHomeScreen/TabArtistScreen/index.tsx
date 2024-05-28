import { ColorNames } from "@app/values/ColorNames";
import { FontNames } from "@app/values/FontNames";
import { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";


class TabArtistScreen extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffe7ba' }}>
                <Text style={{ fontSize: 20, color: 'blue' , fontFamily: FontNames.qs_500}}>
                    TabArtistScreen
                </Text>
                <ActivityIndicator animating={true} color={ColorNames.red2} />
            </View>
        )
    }
}
export default TabArtistScreen;