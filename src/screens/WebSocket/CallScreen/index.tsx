import { Component } from "react";
import { View } from "react-native";
import { MediaStream, MediaStreamTrack, RTCIceCandidate, RTCPeerConnection, RTCRtpSender, RTCSessionDescription, RTCView, mediaDevices } from "react-native-webrtc";
import { Navigator } from "@app/utils/Navigator";
import { CallInfo } from "@app/utils/CallInfo";
import IconContainer from "@app/components/CallComponent/IconContainer";
import MicOff from "@app/assets/icons/MicOff";
import MicOn from "@app/assets/icons/MicOn";
import VideoOn from "@app/assets/icons/VideoOn";
import CameraSwitch from "@app/assets/icons/CameraSwitch";
import CallEnd from "@app/assets/icons/CallEnd";
import { EventSocketNames } from "@app/values/SocketValues";
import VideoOff from "@app/assets/icons/VideoOff";
import { WebSocketUntils } from "@app/utils/WebSocketUntils";

class CallScreenWebsocket extends Component<any, any> {
    peerConnection: RTCPeerConnection;
    localStream: MediaStream | any;
    remoteStream: MediaStream | any;
    pendingCandidateList?: RTCIceCandidate[]; // luu tam candidate

    createdTrackSender: RTCRtpSender[] | any;
    isCaller: boolean
    constructor(props: any) {
        super(props)
        this.state = {
            isLocalStreamReady: false,
            isRemoteStreamReady: false,
            localMicOn: true,
            localCamOn: true
        }
        this.peerConnection = new RTCPeerConnection()
        this.isCaller = props.route.params.isCaller
        this.createdTrackSender = []
        this.pendingCandidateList = []

        this._handleMessage = this._handleMessage.bind(this);
    }


    _handleMessage(event: any) {
        const message = JSON.parse(event.data);

        if (message.type === EventSocketNames.CANDIDATE) {
            console.log("ICEcandidate socket")

            const iceCandidate = JSON.parse(message.iceCandidate)
            this._processRemoteCandidate(iceCandidate)
        } else if (message.type === EventSocketNames.SDP_OFFER) {

            const sdpOffer = JSON.parse(message.sdp)
            console.log("sdpOffer socket", sdpOffer)
            this._handleOfferAndCreateAnswer(sdpOffer)
        } else if (message.type === EventSocketNames.SDP_ANSWER) {
            console.log("sdpAnswer socket")

            const sdpAnswer = JSON.parse(message.sdp)
            this._handleAnswer(sdpAnswer)
        } else if (message.type === EventSocketNames.CANCEL) {
            console.log("cancel socket")

            this._endCall()
            Navigator.goBack()
        }
    }


    async componentDidMount(): Promise<void> {

        WebSocketUntils.getInstance().addEventListener('message', this._handleMessage);

        this.peerConnection.addEventListener('icecandidate', (event: any) => {
            if (!event.candidate)
                return

            this._sendCandidate(event)
        })

        this.peerConnection.addEventListener('track', (event: any) => {
            this._addRemoteStream(event.track)

        })

        this.peerConnection.addEventListener('iceconnectionstatechange', (event: any) => {
            console.log("iceconnectionstatechange", event, this.peerConnection?.iceConnectionState)
        })

        this.peerConnection.addEventListener('connectionstatechange', (event: any) => {
            console.log("connectionstatechange", event, this.peerConnection?.connectionState)
        })

        await this._setLocalStream()
        this._setOnOffMic(true)
        this._setOnOffCam(true)

        if (this.isCaller) {
            this._createOffer()
        }
    }

    componentWillUnmount(): void {
        WebSocketUntils.getInstance().removeEventListener('message', this._handleMessage);

    }
    _endCall() {
        try {
            this.localStream?.getTracks()?.forEach((track: MediaStreamTrack) => track.stop());
            this.remoteStream?.getTracks()?.forEach((track: MediaStreamTrack) => track.stop());

            this.createdTrackSender.forEach((track: RTCRtpSender) => {
                this.peerConnection?.removeTrack(track)
            })
            this.peerConnection?.close();
        } catch (error) {
            console.log("endCall", error)
        }
    }

    async _setLocalStream() {
        let mediaConstraints = {
            audio: true,
            video: true
        };


        try {
            const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);
            this.localStream = mediaStream;
            this.localStream.getTracks().forEach((track: MediaStreamTrack) => this.createdTrackSender.push(this.peerConnection?.addTrack(track, this.localStream)))
            this.setState({ isLocalStreamReady: true })
        } catch (error) {
            console.error("setLocalStream", error)

        };
    }

    async _handleOfferAndCreateAnswer(sdpOffer: any) {
        try {
            const offerDescFromSdp = new RTCSessionDescription(sdpOffer);
            await this.peerConnection.setRemoteDescription(offerDescFromSdp)

            const answerSdp: RTCSessionDescription | any = await this.peerConnection?.createAnswer();
            await this.peerConnection?.setLocalDescription(answerSdp);

            this._processPendingCandidateList()

            const data = {
                type: EventSocketNames.SDP_ANSWER,
                fromId: CallInfo.getMyId(),
                toId: CallInfo.getOtherUserId(),
                sdp: JSON.stringify(answerSdp)
            }
            WebSocketUntils.getInstance().send(JSON.stringify(data));

        } catch (error) {
            console.error("handleOfferAndCreateAnswer", error)
        }
    }

    async _handleAnswer(sdpAnswer: RTCSessionDescription | any) {
        try {
            const answerDescFromSdp = new RTCSessionDescription(sdpAnswer);
            await this.peerConnection?.setRemoteDescription(answerDescFromSdp);

            this._processPendingCandidateList();


        } catch (error) {
            console.error("handleAnswer", error)
        }
    }

    _processPendingCandidateList() {
        if (this.pendingCandidateList && this.pendingCandidateList?.length > 0) {
            console.log('start _processPendingCandidateList')
            this.pendingCandidateList.forEach((candidate: RTCIceCandidate) => this.peerConnection.addIceCandidate(candidate))
            this.pendingCandidateList = []
        }
    }
    _setOnOffMic(state: boolean) {
        this.localStream.getAudioTracks().forEach((audioTrack: MediaStreamTrack) => {
            audioTrack.enabled = state;
        });
    }

    _setOnOffCam(state: boolean) {
        this.localStream.getVideoTracks().forEach((videoTrack: MediaStreamTrack) => {
            videoTrack.enabled = state;
        });
    }

    _addRemoteStream(streamTrack: MediaStreamTrack | any) {
        let remoteStream: any = this.remoteStream || new MediaStream(undefined);
        remoteStream.addTrack(streamTrack, remoteStream);
        this.remoteStream = remoteStream;
        setTimeout(() => this.setState({ isRemoteStreamReady: true }), 1000)
    }

    _sendCandidate(event: any) {
        if (event.candidate) {
            const data = {
                type: EventSocketNames.CANDIDATE,
                fromId: CallInfo.getMyId(),
                toId: CallInfo.getOtherUserId(),
                iceCandidate: JSON.stringify(event.candidate)
            }
            WebSocketUntils.getInstance().send(JSON.stringify(data));

        }

    }

    _processRemoteCandidate(candidateObj: any) {
        if (this.peerConnection?.remoteDescription == null) {
            console.log("processRemoteCandidate - push to pending", candidateObj)
            this.pendingCandidateList?.push(new RTCIceCandidate(candidateObj));
        }
        else {
            console.log("processRemoteCandidate - addIceCandidate", candidateObj)
            this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidateObj))
        }
    }

    async _createOffer() {

        try {
            const createdOfferSdp = await this.peerConnection?.createOffer({});
            await this.peerConnection?.setLocalDescription(createdOfferSdp);
            const data = {
                type: EventSocketNames.SDP_OFFER,
                fromId: CallInfo.getMyId(),
                toId: CallInfo.getOtherUserId(),
                sdp: JSON.stringify(createdOfferSdp)
            }
            WebSocketUntils.getInstance().send(JSON.stringify(data));


        } catch (error) {
            console.error("createOffer", error)
        }

    }

    async _createAnswer() {

        try {
            const createdAnswerSdp = await this.peerConnection?.createOffer({});
            await this.peerConnection?.setLocalDescription(createdAnswerSdp);
            const data = {
                type: EventSocketNames.SDP_ANSWER,
                fromId: CallInfo.getMyId(),
                toId: CallInfo.getOtherUserId(),
                sdp: JSON.stringify(createdAnswerSdp)
            }
            WebSocketUntils.getInstance().send(JSON.stringify(data));


        } catch (error) {
            console.error("createAnswe", error)

        }

    }

    _switchCamera() {
        if (this.state.localCamOn) {
            this.localStream.getVideoTracks().forEach((track: any) => {
                track._switchCamera();
            });
        }

    }

    _toggleCamera() {
        this.setState({ localCamOn: !this.state.localCamOn });

        this.localStream.getVideoTracks().forEach((track: any) => {
            this.state.localCamOn ? (track.enabled = false) : (track.enabled = true);
        });
    }

    _toggleMic() {
        this.setState({ localMicOn: !this.state.localMicOn });

        this.localStream.getAudioTracks().forEach((track: any) => {
            this.state.localMicOn ? (track.enabled = false) : (track.enabled = true);
        });
    }
    render() {
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
                            streamURL={this.localStream.toURL()}
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
                            streamURL={this.remoteStream.toURL()}
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
                                type: EventSocketNames.CANCEL,
                                fromId: CallInfo.getMyId(),
                                toId: CallInfo.getOtherUserId()
                            }
                            WebSocketUntils.getInstance().send(JSON.stringify(data));

                            this._endCall()
                            Navigator.goBack()
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
                </View>
            </View>
        )
    }
}

export default CallScreenWebsocket