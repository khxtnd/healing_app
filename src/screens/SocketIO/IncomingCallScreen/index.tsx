import CallAnswer from "@app/assets/icons/CallAnswer";
import { Navigator } from "@app/utils/Navigator";
import { CallInfo } from "@app/utils/CallInfo";
import { SocketIO } from "@app/utils/SocketIO";
import { RouteNames } from "@app/values/RouteNames";
import { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";


class IncomingCallScreen extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    _handleCancel = (data: any) => {
        Navigator.goBack()
    }

    componentDidMount(): void {
        SocketIO.getInstcance().on('cancel', this._handleCancel);
    }

    componentWillUnmount(): void {
        SocketIO.getInstcance().off('cancel', this._handleCancel);
        
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
                                fromId: CallInfo.getMyId(),
                                toId: CallInfo.getOtherUserId()
                            }
                            SocketIO.getInstcance().emit('accept', data)
                            Navigator.replace(RouteNames.CALL_SCREEN_SOCKET_IO, { isCaller: false })
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
export default IncomingCallScreen