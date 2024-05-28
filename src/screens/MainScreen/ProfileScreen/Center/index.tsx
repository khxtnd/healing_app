import { EventUtils } from "@app/utils/EventUntils";
import { Component } from "react";
import { Button, EventSubscription, Text, View } from "react-native";
import { connect } from "react-redux";


class CenterScreen extends Component<any, any> {
    eventFromNativeSubscriber?: EventSubscription;

    constructor(props: any) {
        super(props)
        this.state = {
            count: 0,
        }
    }

    componentDidMount(): void {
        EventUtils.getInstance().addEventListener({
            key: 'Center',
            onEvent: (id, type, data) => {
                this.setState({ count: data });
            }
        }
        )
    }


    render() {
        const { count3, increment, decrement } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#eaff8f' }}>
                <Text style={{ fontSize: 20, color: 'green' }}>
                    Center {this.state.count}
                </Text>

                <Text style={{ fontSize: 20, color: 'black' }}>Counter: {count3}</Text>
                <Button
                    title="Increment"
                    onPress={increment}
                />
                <Button
                    title="Decrement"
                    onPress={decrement}
                />
            </View>
        )
    }

}
const mapStateToProps = (states: any) => {
    return {
        count3: states.counterReducer.count2,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        increment: () => dispatch({ type: 'INCREMENT' }),
        decrement: () => dispatch({ type: 'DECREMENT' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterScreen);