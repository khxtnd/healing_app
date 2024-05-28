import CallEnd from "@app/assets/icons/CallEnd";
import { Navigator } from "@app/utils/Navigator";
import { CallInfo } from "@app/utils/CallInfo";


import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { EventSocketNames } from "@app/values/SocketValues";
import { RouteNames } from "@app/values/RouteNames";
import { WebSocketUntils } from "@app/utils/WebSocketUntils";


class OutgoingScreenWebsocket extends Component<any, any> {
    message: any
    constructor(props: any) {
        super(props);
        this.message = {}
    }


    _handleMessage(event: any) {
        this.message = JSON.parse(event.data);
        console.log(this.message.type)
        if (this.message.type === EventSocketNames.ACCEPT) {
            Navigator.replace(RouteNames.CALL_SCREEN_WEB_SOCKET, { isCaller: true })
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
                            fontSize: 16,
                            color: '#D0D4DD',
                        }}>
                        Calling to...
                    </Text>

                    <Text
                        style={{
                            fontSize: 36,
                            marginTop: 12,
                            color: '#ffff',
                            letterSpacing: 6,
                        }}>
                        {CallInfo.getOtherUserId()}
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
                                type: EventSocketNames.CANCEL,
                                fromId: CallInfo.getMyId(),
                                toId: CallInfo.getOtherUserId()
                            }
                            WebSocketUntils.getInstance().send(JSON.stringify(data));
                            Navigator.goBack()
                        }}
                        style={{
                            backgroundColor: '#FF5D5D',
                            borderRadius: 30,
                            height: 60,
                            aspectRatio: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <CallEnd width={50} height={12} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default OutgoingScreenWebsocket