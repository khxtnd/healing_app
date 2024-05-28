import { EventWebRTCType } from "@app/types/EventTypes";
import { WebRTCMediaType } from "@app/types/WebRTCTyoe";
import { LisRtcValues, MediaValues } from "@app/values/WebRTCValues";
import { MediaStream, MediaStreamTrack, RTCIceCandidate, RTCPeerConnection, RTCRtpSender, RTCSessionDescription, mediaDevices } from "react-native-webrtc";
import { Logger } from "./Logger";
import { CallInfo } from "./CallInfo";

const tag = "WebRTCUtils"
let instance: WebRTCManager | null;
export const peerConstraints = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
        {
            urls: 'stun:stun1.l.google.com:19302',
        },
        {
            urls: 'stun:stun2.l.google.com:19302',
        },
    ],
};
export const WebRTCUntils = {
    getInstance: () => {
        if (!instance) {
            instance = new WebRTCManager();
        }

        return instance
    },

    removeInstance: () => {
        if (instance) {
            instance?.closeWebRTC()
        }
        instance = null
    }
}


export class WebRTCManager {
    private peerConnection?: RTCPeerConnection|null;
    private localStream?: MediaStream | null;
    private remoteStream?: MediaStream | null;
    private pendingCandidateList?: RTCIceCandidate[]; // luu tam candidate
    private createdOfferSdp?: RTCSessionDescription | null;
    private listEventListener: EventWebRTCType[]
    private createdTrackSender: RTCRtpSender[];

    constructor() {
        this.createdTrackSender = []
        this.pendingCandidateList = []
        this.listEventListener = [];
    }

    handleListnertWebRTC(event: any) {

    }

    async handleTrack(event: any) {

        // let remoteMediaStream: any = this.remoteStream || new MediaStream(undefined);
        // remoteMediaStream.addTrack(event.track, remoteMediaStream);
        // this.remoteStream = remoteMediaStream;

        if (!this.remoteStream) {
            this.remoteStream = new MediaStream(undefined)
        }
        await this.remoteStream.addTrack(event.track);

        this.listEventListener.forEach(it => it.onEvent("123", LisRtcValues.track, event));

    }

    handleIcecandidate(event: any) {
        if (event.candidate != null) {
            this.listEventListener.forEach(it => it.onEvent("123", LisRtcValues.icecandidate, event));
        }
    }

    createPeerConnection(webrtcConfig: any) {
        this.peerConnection = new RTCPeerConnection(webrtcConfig);

        this.peerConnection.addEventListener(LisRtcValues.connectionstatechange, (event: any) => {
            this.handleListnertWebRTC(event)
        });
        this.peerConnection.addEventListener(LisRtcValues.datachannel, (event: any) => {
            this.handleListnertWebRTC(event)

        });

        this.peerConnection.addEventListener(LisRtcValues.icecandidate, (event: any) => {
            this.handleIcecandidate(event)
        });

        this.peerConnection.addEventListener(LisRtcValues.icecandidateerror, (event: any) => {
            this.handleListnertWebRTC(event)

        });
        this.peerConnection.addEventListener(LisRtcValues.iceconnectionstatechange, (event: any) => {
            this.handleListnertWebRTC(event)

        });

        this.peerConnection.addEventListener(LisRtcValues.icegatheringstatechange, (event: any) => {
            this.handleListnertWebRTC(event)

        });

        this.peerConnection.addEventListener(LisRtcValues.negotiationneeded, (event: any) => {
            this.handleListnertWebRTC(event)

        });

        this.peerConnection.addEventListener(LisRtcValues.signalingstatechange, (event: any) => {
            this.handleListnertWebRTC(event)

        });

        this.peerConnection.addEventListener(LisRtcValues.track, async (event: any) => {
            this.handleTrack(event)
        });
    }

    async setupLocalStream(mediadType: WebRTCMediaType) {

        //noise cancellation
        const audioConfig = {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            googEchoCancellation: true,
            googAutoGainControl: true,
            googNoiseSuppression: true,
            googHighpassFilter: true,
            googTypingNoiseDetection: true,
            googNoiseReduction: true
        };
        let mediaConstraints

        if (mediadType === MediaValues.audio) {
            mediaConstraints = {
                audio: audioConfig,
                video: false
            };
        } else if (mediadType === MediaValues.video) {
            mediaConstraints = {
                audio: audioConfig,
                video: true
            };
        } else {
            mediaConstraints = {
                audio: true,
                video: true
            };
        }


        try {
            this.localStream = await mediaDevices.getUserMedia(mediaConstraints)

            //add track to local stream
            this.localStream.getTracks().forEach((track: MediaStreamTrack) => this.createdTrackSender!!.push(this.peerConnection!!.addTrack(track, this.localStream!!)))
            return this.localStream
        } catch (error) {
            Logger.log("setupLocalStream", error)
        };
    }


    // createOffer() {
    //     return new Promise<RTCSessionDescription | any>(async (resolve, reject) => {
    //         try {
    //             this.createdOfferSdp = await this.peerConnection?.createOffer({});
    //             if (this.createdOfferSdp) {
    //                 await this.peerConnection?.setLocalDescription(this.createdOfferSdp);
    //                 resolve(this.createdOfferSdp);
    //             }
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }

    async createOffer() {
        if (this.peerConnection) {
            try {
                this.createdOfferSdp = await this.peerConnection?.createOffer({});
                await this.peerConnection?.setLocalDescription(this.createdOfferSdp!!);
                return this.createdOfferSdp
            } catch (error) {
                Logger.error(tag, "createOffer => " + error)
                return
            }
        } else {
            Logger.error(tag, "createOffer => peerConnection null")
            return
        }
    }

    async handleOfferAndCreateAnswer(sdpOffer: RTCSessionDescription) {
        if (this.peerConnection) {
            try {
                const offerDescFromSdp = new RTCSessionDescription(sdpOffer);
                await this.peerConnection.setRemoteDescription(offerDescFromSdp)

                const answerSdp: RTCSessionDescription | any = await this.peerConnection?.createAnswer();
                await this.peerConnection?.setLocalDescription(answerSdp);

                this.processPendingCandidateList()

                return answerSdp
            } catch (error) {
                Logger.error(tag, "handleOfferAndCreateAnswer => " + error)
                return
            }
        } else {
            Logger.error(tag, "createOffer => peerConnection null")
            return
        }
    }

    processPendingCandidateList() {
        if (this.peerConnection) {
            if (this.pendingCandidateList && this.pendingCandidateList?.length > 0) {
                this.pendingCandidateList.forEach((candidate: RTCIceCandidate) => this.peerConnection?.addIceCandidate(candidate))
                this.pendingCandidateList = []
            }
        } else {
            Logger.error(tag, "processPendingCandidateList => peerConnection null")
        }
    }


    getRemoteStream() {
        return this.remoteStream;
    }


    clearRemoteStream() {
        this.remoteStream?.release()
        this.remoteStream=null
    }

    addListenerWebRTCManager(event: EventWebRTCType) {
        this.removeEventListenerByKey(event.key)
        this.listEventListener.push(event);
    }

    async handleAnswer(sdpAnswer: RTCSessionDescription | any) {
        try {
            const answerDescFromSdp = new RTCSessionDescription(sdpAnswer);
            await this.peerConnection?.setRemoteDescription(answerDescFromSdp);

            this.processPendingCandidateList();


        } catch (error) {
            console.error("handleAnswer", error)
        }
    }

    processRemoteCandidate(candidateObj: any) {
        if (this.peerConnection?.remoteDescription == null) {
            return this.pendingCandidateList?.push(new RTCIceCandidate(candidateObj));
        }

        return this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidateObj))
    }

    removeEventListenerByKey(key: string) {
        this.listEventListener.splice(this.listEventListener.findIndex(it => it.key === key), 1);
    }

    removeAllCurrentTrack() {
        this.createdTrackSender.forEach((track: RTCRtpSender) => {
            this.peerConnection!!.removeTrack(track)
        })
    }

    toggleOnOffMicrophone(localStream: MediaStream | any): boolean {
        let result: boolean = false;
        localStream.getAudioTracks().forEach((audioTrack: MediaStreamTrack) => {
            audioTrack.enabled = !audioTrack.enabled;
            result = audioTrack.enabled
        });
        return result;
    }

    setOnOffMicrophone(localStream: MediaStream | any, state: boolean) {
        localStream.getAudioTracks().forEach((audioTrack: MediaStreamTrack) => {
            audioTrack.enabled = state;
        });
    }

    toggleOnOffCamera(localStream: MediaStream | any): boolean {
        let result: boolean = false;
        localStream.getVideoTracks().forEach((videoTrack: MediaStreamTrack) => {
            videoTrack.enabled = !videoTrack.enabled;
            result = videoTrack.enabled
        });
        return result;
    }

    setOnOffCamera(localStream: MediaStream | any, state: boolean) {
        localStream.getVideoTracks().forEach((videoTrack: MediaStreamTrack) => {
            videoTrack.enabled = state;
        });
    }

    restartIce() {
        this.peerConnection?.restartIce();
    }


    closeWebRTC() {
        Logger.log("close", CallInfo.getMyId())
        try {
            this.localStream?.getTracks()?.forEach((track: MediaStreamTrack) => track.stop());
            this.remoteStream?.getTracks()?.forEach((track: MediaStreamTrack) => track.stop());

            this.removeAllCurrentTrack()

            if (this.peerConnection) {
                this.peerConnection?.removeEventListener(LisRtcValues.connectionstatechange, this.handleListnertWebRTC);
                this.peerConnection?.removeEventListener(LisRtcValues.datachannel, this.handleListnertWebRTC);
                this.peerConnection?.removeEventListener(LisRtcValues.icecandidate, this.handleIcecandidate);
                this.peerConnection?.removeEventListener(LisRtcValues.icecandidateerror, this.handleListnertWebRTC);
                this.peerConnection?.removeEventListener(LisRtcValues.iceconnectionstatechange, this.handleListnertWebRTC);
                this.peerConnection?.removeEventListener(LisRtcValues.icegatheringstatechange, this.handleListnertWebRTC);
                this.peerConnection?.removeEventListener(LisRtcValues.negotiationneeded, this.handleListnertWebRTC);
                this.peerConnection?.removeEventListener(LisRtcValues.signalingstatechange, this.handleListnertWebRTC);
                this.peerConnection?.removeEventListener(LisRtcValues.track, this.handleTrack);
                this.peerConnection?.close();
            }

            this.peerConnection = null
            this.localStream = null;
            this.remoteStream = null;
            this.createdOfferSdp = null
            this.listEventListener = []
            this.pendingCandidateList = [];
            this.createdTrackSender = [];
        } catch (error) {
            Logger.log(tag, "closeWebRTC => " + error)
        }
    }
}