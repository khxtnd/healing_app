
import { BottomTabManager } from "@app/routes/BottomTabManager";
import { Component } from "react";


class HomeScreen extends Component<any, any> {
    constructor(props: any) {
        super(props)
        console.log(props.route.params. data)
    }

    render() {
        return (
            <BottomTabManager />
        )
    }
}
export default HomeScreen;