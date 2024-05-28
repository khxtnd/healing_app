
import { Component } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";

import { CallInfo } from "@app/utils/CallInfo";
import { EventSocketNames } from "@app/values/SocketValues";
import { RouteNames } from "@app/values/RouteNames";
import { Navigator } from "@app/utils/Navigator";
import TextInputContainer from "@app/components/CallComponent/TextInputContainer";
import { WebRTCUntils } from "@app/utils/WebRTCUntils";
import { WebSocketUntils } from "@app/utils/WebSocketUntils";


class JoinScreenWebsocket extends Component<any, any> {
    message: any

    constructor(props: any) {
        super(props);
        this.state = {
            otherUserId: "",
        };
        this.message = {}
        WebRTCUntils.getInstance()
    }

    componentDidMount(): void {
        WebSocketUntils.getInstance().onopen = () => {
            console.log(CallInfo.getMyId() + " connected server")
        };

        WebSocketUntils.getInstance().addEventListener('message', this._handleMessage);
    }

    componentWillUnmount(): void {
        WebSocketUntils.getInstance().removeEventListener('message', this._handleMessage);
        WebSocketUntils.disconnect()
    }

    _handleMessage(event: any) {
        this.message = JSON.parse(event.data);
        console.log(this.message.type)
        if (this.message.type === EventSocketNames.INVITE) {
            CallInfo.setOtherUserId(this.message.fromId)
            Navigator.navigate(RouteNames.INCOMMING_SCREEN_WEB_SOCKET)
        }
    }
    render() {
        const { otherUserId } = this.state
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <View
                            style={styles.view_1}>
                            <Text
                                style={styles.text_title}>
                                Your Caller ID
                            </Text>
                            <View
                                style={styles.view_2}>
                                <Text
                                    style={styles.text_my_id}>
                                    {CallInfo.getMyId()}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={styles.view_3}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#D0D4DD',
                                }}>
                                Enter call id of another user
                            </Text>
                            <TextInputContainer
                                placeholder={'Enter Caller ID'}
                                value={otherUserId}
                                setValue={(text: string) => {
                                    this.setState({ otherUserId: text });
                                }}
                                keyboardType={'number-pad'}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (otherUserId != "") {
                                        CallInfo.setOtherUserId(otherUserId)
                                        const data = {
                                            type: EventSocketNames.INVITE,
                                            fromId: CallInfo.getMyId(),
                                            toId: otherUserId,
                                        }

                                        WebSocketUntils.getInstance().send(JSON.stringify(data));
                                        Navigator.navigate(RouteNames.OUTGOING_SCREEN_WEB_SOCKET)
                                    }
                                }}
                                style={{
                                    height: 50,
                                    backgroundColor: '#5568FE',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 12,
                                    marginTop: 16,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#FFFFFF',
                                    }}>
                                    Call Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView >
        );
    }
};
export default JoinScreenWebsocket;