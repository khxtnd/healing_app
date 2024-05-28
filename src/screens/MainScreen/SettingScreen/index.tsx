import { CommunicateWithNative } from "@app/utils/CommunicateWithNative";
import { Component } from "react";
import { Button, EventSubscription, Text, View } from "react-native";


class SettingScreen extends Component<any, any> {

    eventFromNativeSubscriber?: EventSubscription;

    constructor(props: any) {
        super(props)
    }

    componentDidMount(): void {
        this._startListener()
    }



    componentWillUnmount(): void {
        console.log("unmount")
        this._stopListener()

    }


    _startListener(){
        if (this.eventFromNativeSubscriber) {
            CommunicateWithNative.removeEventFromNativeListener(this.eventFromNativeSubscriber);
        }
        console.log("bat")
        this.eventFromNativeSubscriber = CommunicateWithNative.addEventFromNativeListener(count5 => {
            console.log("count " + count5)
        })
    }

    _stopListener=()=>{
        if (this.eventFromNativeSubscriber) {
            console.log("tat")
            CommunicateWithNative.removeEventFromNativeListener(this.eventFromNativeSubscriber);
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffe7ba' }}>
                <Text style={{ fontSize: 20, color: 'blue' }}>
                    SettingScreen
                </Text>
                <Button
                    title="Bat"
                    onPress={
                       this._startListener.bind(this)
                    }
                />

                <Button
                    title="Tat"
                    onPress={() => {
                        this._stopListener()
                    }}
                />
            </View>
        )
    }
}
export default SettingScreen;