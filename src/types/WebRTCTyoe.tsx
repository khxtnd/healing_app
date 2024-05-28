import { LisRtcValues, MediaValues } from "@app/values/WebRTCValues"


export declare type LisRtcType =
    typeof LisRtcValues.connectionstatechange
    | typeof LisRtcValues.datachannel
    | typeof LisRtcValues.icecandidate
    | typeof LisRtcValues.icecandidateerror
    | typeof LisRtcValues.iceconnectionstatechange
    | typeof LisRtcValues.icegatheringstatechange
    | typeof LisRtcValues.negotiationneeded
    | typeof LisRtcValues.signalingstatechange
    | typeof LisRtcValues.track

export declare type WebRTCMediaType = typeof MediaValues.audio | typeof MediaValues.video
