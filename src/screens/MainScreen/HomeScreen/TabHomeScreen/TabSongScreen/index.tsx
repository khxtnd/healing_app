import AppText from "@app/components/AppText";
import { setLanguage } from "@app/redux/actions";
import { Navigator } from "@app/utils/Navigator";
import { CallInfo } from "@app/utils/CallInfo";

import { Component } from "react";
import { Button, Text, View } from "react-native";
import { connect } from "react-redux";
import { FontNames } from "@app/values/FontNames";
import { RouteNames } from "@app/values/RouteNames";


class TabSongScreen extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        const { setLanguage, language } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#ffe7ba' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontFamily: FontNames.qs_400 }}>
                    TabSongScreen
                </Text>
                <Text style={{ fontSize: 20, color: 'green' }}>
                    <AppText textKey={'home'} />
                </Text>
                <Text style={{ fontSize: 20, color: 'green' }}>
                    {AppText.getText('song')}
                </Text>
                <Button
                    title="SetLanguage"
                    onPress={() => {
                        if (language === 'vi') {
                            setLanguage('en')
                        } else {
                            setLanguage('vi')
                        }
                    }}
                />
                <Button
                    title="Call SocketIO"
                    onPress={() => {
                        CallInfo.setMyId(Math.floor(100000 + Math.random() * 900000).toString());
                        Navigator.navigate(RouteNames.JOIN_SCREEN_SOCKET_IO)
                    }}
                />

                <Button
                    title="Web Socket"
                    onPress={() => {
                        CallInfo.setMyId(Math.floor(100000 + Math.random() * 900000).toString());
                        Navigator.navigate(RouteNames.JOIN_SCREEN_WEB_SOCKET)
                    }}
                />
            </View>
        )
    }
}
const mapStateToProps = (states: any) => {
    return {
        language: states.general.languageCode
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setLanguage: (languageCode: string) => dispatch(setLanguage(languageCode))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabSongScreen);