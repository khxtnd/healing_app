import { LisRtcType } from "./WebRTCTyoe";

export declare interface EventScreenType {
    key: string;
    onEvent: (id: number, type: string, data: any) => void
}
export declare interface EventWebRTCType {
    key: string;
    onEvent: (id: string, name: LisRtcType, data: any) => void
  }