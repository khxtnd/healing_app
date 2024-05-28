
import { Component } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";
import { SocketIO } from "@app/utils/SocketIO";
import { CallInfo } from "@app/utils/CallInfo";
import { Navigator } from "@app/utils/Navigator";
import TextInputContainer from "@app/components/CallComponent/TextInputContainer";
import { RouteNames } from "@app/values/RouteNames";

class JoinScreen extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            otherUserId: "",
        };
        SocketIO.getInstcance().connect();
    }

    _handleReceiveCall = (data: any) => {
        CallInfo.setOtherUserId(data.fromId)
        Navigator.navigate(RouteNames.INCOMMING_SCREEN_SOCKET_IO)
    }

    componentDidMount(): void {
        SocketIO.getInstcance().on('send', this._handleReceiveCall)
    }

    componentWillUnmount(): void {
        SocketIO.getInstcance().off('send', this._handleReceiveCall)
        SocketIO.disconnection()
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
                                            fromId: CallInfo.getMyId(),
                                            toId: otherUserId,
                                        }
                                        SocketIO.getInstcance().emit('send', data)
                                        Navigator.navigate(RouteNames.OUTGOING_SCREEN_SOCKET_IO)
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
export default JoinScreen;