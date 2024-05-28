import { CommunicateWithNative } from "@app/utils/CommunicateWithNative";
import { EventUtils } from "@app/utils/EventUntils";
import { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";


class TopScreen extends Component<any, any>{

    constructor(props: any) {
        super(props)
        this.state = {
            count: 0,
        }
    }

    componentDidMount(): void {
        EventUtils.getInstance().addEventListener({
            key: 'TopScreen',
            onEvent: (id, type, data) => {
                this.setState({ count: data });
            }
        }
        )
    }

    _senData() {
       CommunicateWithNative.getUserName()
    }
    _getFrendInfo() {
        CommunicateWithNative.getFriendInfo()
     }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffe58f' }}>
                <Text style={{ fontSize: 20, color: 'green' }}>
                    Top {this.state.count}
                </Text>
                <TouchableOpacity onPress={this._senData.bind(this)}>
                    <View
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: 'pink'
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this._getFrendInfo.bind(this)}>
                    <View
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: 'cyan'
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}
export default TopScreen;