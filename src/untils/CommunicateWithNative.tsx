import { EventSubscription, NativeEventEmitter, NativeModules } from "react-native";

const { DatabaseNativeModule, SharedPreferenceNativeModule, ApiNativeModule } = NativeModules;
interface FriendInfo {
    nameFriend: string;
    ageFriend: number;
}
const eventFromNativeEmitter = new NativeEventEmitter(ApiNativeModule);
export const CommunicateWithNative = {

    getUserName: () => {
        const userInfo = {
            username: 'thanhtam',
            password: '23082001',

        };

        DatabaseNativeModule.sendDataToNative("khanhpq", userInfo)
    },

    getFriendInfo: () => {
        return new Promise((resolve, reject) => {
            SharedPreferenceNativeModule.getFriendInfo("alao")
                .then((friendInfo: FriendInfo) => {
                    console.log("khanh123", friendInfo.nameFriend)
                    resolve(friendInfo);
                })
                .catch((error: any) => {

                    reject(error);
                });
        });
    },

    addEventFromNativeListener: (callback: (count6: string) => void) => eventFromNativeEmitter.addListener("EventToRN", data => {
        callback(data.count7)
        console.log(JSON.stringify(data))
    }

    ),

    removeEventFromNativeListener: (event: EventSubscription) => {
        event.remove()
    },
}