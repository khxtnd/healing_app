import CallAnswer from "@app/assets/icons/CallAnswer";
import { Navigator } from "@app/utils/Navigator";
import { CallInfo } from "@app/utils/CallInfo";
import { EventSocketNames } from "@app/values/SocketValues";
import { RouteNames } from "@app/values/RouteNames";
import { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WebSocketUntils } from "@app/utils/WebSocketUntils";


class IncomingScreenWebsocket extends Component<any, any> {
    message: any

    constructor(props: any) {
        super(props);
        this.message = {}
    }


    _handleMessage(event: any) {
        this.message = JSON.parse(event.data);
        if (this.message.type === EventSocketNames.CANCEL) {
            Navigator.goBack()
        }
    }

    componentDidMount(): void {
        WebSocketUntils.getInstance().addEventListener('message', this._handleMessage);
    }

    componentWillUnmount(): void {
        WebSocketUntils.getInstance().removeEventListener('message', this._handleMessage);

    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-around',
                    backgroundColor: '#050A0E',
                }}>
                <View
                    style={{
                        padding: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 14,
                    }}>
                    <Text
                        style={{
                            fontSize: 36,
                            marginTop: 12,
                            color: '#ffff',
                        }}>
                        {CallInfo.getOtherUserId()} is calling..
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            const data = {
                                type: EventSocketNames.ACCEPT,
                                fromId: CallInfo.getMyId(),
                                toId: CallInfo.getOtherUserId()
                            }
                            WebSocketUntils.getInstance().send(JSON.stringify(data));
                            Navigator.replace(RouteNames.CALL_SCREEN_WEB_SOCKET, { isCaller: false })
                        }}
                        style={{
                            backgroundColor: 'green',
                            borderRadius: 30,
                            height: 60,
                            aspectRatio: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <CallAnswer height={28} fill={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default IncomingScreenWebsocket