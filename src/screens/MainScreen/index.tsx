
import { DrawerManager } from "@app/routes/DrawerManager";
import React, { Component } from "react";
class MainScreen extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <DrawerManager name={this.props.route.params.name}/>
        )
    }
}
export default MainScreen;