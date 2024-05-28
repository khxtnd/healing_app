import { EventUtils } from "@app/utils/EventUntils";
import { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

class BottomScreen extends Component<any, any>{
    eventListener: Event[];
    count: number;

    constructor(props: any) {
        super(props)
        this.eventListener = []
        this.count = this.props.count
    }


    _senData() {
        this.count++
        EventUtils.getInstance().sendEvent(this.count)
    }
    render() {
        return (
            <View style={{ flex: 1 , backgroundColor: '#ffe7ba'}}>
                 <Text style={{ fontSize: 20, color: 'blue' }}>
                    Top {this.props.name}
                </Text>
                <TouchableOpacity onPress={this._senData.bind(this)}>
                    <View
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: 'red'
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}
export default BottomScreen;