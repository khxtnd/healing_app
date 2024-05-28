import CallEnd from "@app/assets/icons/CallEnd";
import CameraSwitch from "@app/assets/icons/CameraSwitch";
import MicOff from "@app/assets/icons/MicOff";
import MicOn from "@app/assets/icons/MicOn";
import VideoOff from "@app/assets/icons/VideoOff";
import VideoOn from "@app/assets/icons/VideoOn";
import IconContainer from "@app/components/CallComponent/IconContainer";
import { CallInfo } from "@app/utils/CallInfo";
import { Navigator } from "@app/utils/Navigator";
import { SocketIO } from "@app/utils/SocketIO";
import { WebRTCManager, WebRTCUntils, peerConstraints } from "@app/utils/WebRTCUntils";
import { RouteNames } from "@app/values/RouteNames";
import { LisRtcValues, MediaValues } from "@app/values/WebRTCValues";
import { Component } from "react";
import { Button, View } from "react-native";
import { MediaStream, MediaStreamTrack, RTCView } from "react-native-webrtc";

declare interface Props {

}

declare interface State {
    isLocalStreamReady: boolean,
    isRemoteStreamReady: boolean,
    localMicOn: boolean,
    localCamOn: boolean,
    localStream?: MediaStream | any;
    remoteStream?: MediaStream | any;
}
const tag = "CallScreen"
class CallScreenSocketIO extends Component<any, State> {

    isCaller: boolean
    webRTCManager?: WebRTCManager

    constructor(props: any) {
        super(props)
        this.state = {
            isLocalStreamReady: false,
            isRemoteStreamReady: false,

            localMicOn: true,
            localCamOn: true,

            localStream: null,
            remoteStream: null,
        }
        this.isCaller = props.route.params.isCaller
        this.webRTCManager = WebRTCUntils.getInstance();
    }


    async componentDidMount(): Promise<void> {
        this._setupListenerWebRTCManager()

        let localStream;
        this.webRTCManager?.createPeerConnection(peerConstraints);
        localStream = await this.webRTCManager?.setupLocalStream(MediaValues.audio);
        this.setState({
            localStream,
        });

        SocketIO.getInstcance().on('ICEcandidate', this._handleCandidate)
        SocketIO.getInstcance().on('sdpOffer', this._handleSdpOffer);
        SocketIO.getInstcance().on('sdpAnswer', this._handleSdpAnswer)
        SocketIO.getInstcance().on('cancel', this._handleCancel)
        SocketIO.getInstcance().on('changeToVideoCall', this._handleChangeTovideo)


        if (this.isCaller) {
            const sdpOffer = await this.webRTCManager?.createOffer();
            const data = {
                fromId: CallInfo.getMyId(),
                toId: CallInfo.getOtherUserId(),
                sdp: JSON.stringify(sdpOffer)
            }
            SocketIO.getInstcance().emit('sdpOffer', data);
        }
    }


    componentWillUnmount(): void {
        SocketIO.getInstcance().off('ICEcandidate', this._handleCandidate)
        SocketIO.getInstcance().off('sdpOffer', this._handleSdpOffer);
        SocketIO.getInstcance().off('sdpAnswer', this._handleSdpAnswer)
        SocketIO.getInstcance().off('cancel', this._handleCancel)
        SocketIO.getInstcance().off('changeToVideoCall', this._handleChangeTovideo)

        if (this.webRTCManager) {
            this.webRTCManager?.removeEventListenerByKey(RouteNames.CALL_SCREEN_SOCKET_IO)
        }
        WebRTCUntils.removeInstance()
    }


    _handleSdpOffer = (data: any) => {
        const sdpOffer = JSON.parse(data.sdp)
        this.webRTCManager?.handleOfferAndCreateAnswer(sdpOffer).then(
            answerSdp => {
                if (answerSdp) {
                    const data = {
                        fromId: CallInfo.getMyId(),
                        toId: CallInfo.getOtherUserId(),
                        sdp: JSON.stringify(answerSdp)
                    }
                    SocketIO.getInstcance().emit('sdpAnswer', data);

                }
            }
        )
    }

    _handleSdpAnswer = (data: any) => {
        const sdpAnswer = JSON.parse(data.sdp)
        this.webRTCManager?.handleAnswer(sdpAnswer)
    }

    _handleCancel = (data: any) => {
        this._endCall()
    }

    _handleCandidate = (data: any) => {
        const iceCandidate = JSON.parse(data.iceCandidate)
        this.webRTCManager?.processRemoteCandidate(iceCandidate);
    }

    _handleChangeTovideo = (data: any) => {
        this._changeToVideoCall()
    }

    _setupListenerWebRTCManager() {
        this.webRTCManager?.addListenerWebRTCManager({
            key: RouteNames.CALL_SCREEN_SOCKET_IO,
            onEvent: (_, name, data) => {
                switch (name) {
                    case LisRtcValues.icecandidate:
                        if (data.candidate) {
                            const dataSocket = {
                                fromId: CallInfo.getMyId(),
                                toId: CallInfo.getOtherUserId(),
                                iceCandidate: JSON.stringify(data.candidate)
                            }
                            SocketIO.getInstcance().emit('ICEcandidate', dataSocket);
                        }
                        break;
                    case LisRtcValues.track:
                        const stream = this.webRTCManager?.getRemoteStream()
                        this.setState({ remoteStream: stream });
                        break;

                }
            }
        })
    }


    async _changeToVideoCall() {
        try {
            await this.webRTCManager?.removeAllCurrentTrack();

            this.webRTCManager?.clearRemoteStream()
            const newLocalStream = await this.webRTCManager?.setupLocalStream(MediaValues.video);
            this.setState({ localStream: newLocalStream, isLocalStreamReady: true });

            if (this.isCaller) {
                const sdpOffer = await this.webRTCManager?.createOffer();
                const data = {
                    fromId: CallInfo.getMyId(),
                    toId: CallInfo.getOtherUserId(),
                    sdp: JSON.stringify(sdpOffer)
                }
                SocketIO.getInstcance().emit('sdpOffer', data);
            }


        } catch (error) {
            console.error(error)
        }
    }

    _endCall() {
        this.webRTCManager?.removeEventListenerByKey(RouteNames.CALL_SCREEN_SOCKET_IO)
        WebRTCUntils.removeInstance()
        Navigator.goBack()
    }


    _toggleCamera() {
        this.webRTCManager?.setOnOffCamera(this.state.localStream, !this.state.localCamOn)
        this.setState({ localCamOn: !this.state.localCamOn });
    }

    _toggleMic() {
        this.webRTCManager?.setOnOffMicrophone(this.state.localStream, !this.state.localMicOn)
        this.setState({ localMicOn: !this.state.localMicOn });
    }

    _switchCamera() {
        const { localStream } = this.state;
        localStream.getVideoTracks().forEach((track: MediaStreamTrack) => track._switchCamera())
    }


    render() {
        const { localStream, remoteStream } = this.state;
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ff7a45',
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                }}>
                {
                    this.state.isLocalStreamReady
                        ? <RTCView
                            objectFit={'cover'}
                            style={{
                                flex: 1,
                                backgroundColor: '#fffb8f'
                            }}
                            streamURL={localStream.toURL()}
                        />
                        : null
                }
                {
                    this.state.isRemoteStreamReady
                        ? <RTCView
                            objectFit={'cover'}
                            style={{
                                flex: 1,
                                backgroundColor: '#4096ff',
                                marginTop: 8,
                            }}
                            streamURL={remoteStream.toURL()}
                        />
                        : null
                }
                <View
                    style={{
                        marginVertical: 12,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                    <IconContainer
                        style={{}}
                        backgroundColor={'red'}
                        onPress={() => {
                            const data = {
                                fromId: CallInfo.getMyId(),
                                toId: CallInfo.getOtherUserId()
                            }
                            SocketIO.getInstcance().emit('cancel', data)
                            this._endCall()
                        }}
                        Icon={() => {
                            return <CallEnd height={26} width={26} fill="#FFF" />;
                        }}
                    />

                    <IconContainer
                        style={{
                            borderWidth: 1.5,
                            borderColor: '#2B3034',
                        }}
                        backgroundColor={!this.state.localMicOn ? '#fff' : 'transparent'}
                        onPress={() => {
                            this._toggleMic();
                        }}
                        Icon={() => {
                            return this.state.localMicOn ? (
                                <MicOn height={24} width={24} fill="#FFF" />
                            ) : (
                                <MicOff height={28} width={28} fill="#1D2939" />
                            );
                        }}
                    />
                    <IconContainer
                        style={{
                            borderWidth: 1.5,
                            borderColor: '#2B3034',
                        }}
                        backgroundColor={!this.state.localCamOn ? '#fff' : 'transparent'}
                        onPress={() => {
                            this._toggleCamera();
                        }}
                        Icon={() => {
                            return this.state.localCamOn ? (
                                <VideoOn height={24} width={24} fill="#FFF" />
                            ) : (
                                <VideoOff height={36} width={36} fill="#1D2939" />
                            );
                        }}
                    />

                    <IconContainer
                        style={{
                            borderWidth: 1.5,
                            borderColor: '#2B3034',
                        }}
                        backgroundColor={'transparent'}
                        onPress={() => {
                            this._switchCamera();
                        }}
                        Icon={() => {
                            return <CameraSwitch height={24} width={24} fill="#FFF" />;
                        }}
                    />

                    <IconContainer
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#2B3034',
                        }}
                        backgroundColor={'transparent'}
                        onPress={() => {
                            const data = {
                                fromId: CallInfo.getMyId(),
                                toId: CallInfo.getOtherUserId(),
                            }
                            SocketIO.getInstcance().emit('changeToVideoCall', data);
                            this._changeToVideoCall()
                        }}
                        Icon={() => {
                            return <CameraSwitch height={24} width={24} fill="#FFF" />;
                        }}
                    />
                </View>
                <Button
                    title="asdh"
                    onPress={()=>{
                        const stream = this.webRTCManager?.getRemoteStream()
                        this.setState({ remoteStream: stream });
                        setTimeout(() => this.setState({ isRemoteStreamReady: true }), 1000)

                    }}
                />
            </View>
        )
    }
}

export default CallScreenSocketIO