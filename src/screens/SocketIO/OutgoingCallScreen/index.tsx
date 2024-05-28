import CallEnd from "@app/assets/icons/CallEnd";
import { Navigator } from "@app/utils/Navigator";
import { CallInfo } from "@app/utils/CallInfo";
import { SocketIO } from "@app/utils/SocketIO";
import { RouteNames } from "@app/values/RouteNames";
import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";


class OutgoingCallScreen extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    _handleAcceptCall = (data: any) => {
        Navigator.replace(RouteNames.CALL_SCREEN_SOCKET_IO, { isCaller: true })
    }
    componentDidMount(): void {
        SocketIO.getInstcance().on('accept', this._handleAcceptCall);
    }

    componentWillUnmount(): void {
        SocketIO.getInstcance().off('accept', this._handleAcceptCall);
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
                                fromId: CallInfo.getMyId(),
                                toId: CallInfo.getOtherUserId()
                            }
                            SocketIO.getInstcance().emit('cancel', data)
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
export default OutgoingCallScreen