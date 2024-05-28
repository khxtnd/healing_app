import { Component } from "react";
import { Button, Text, View } from "react-native";

import { Dialog, Portal, Text as TextReactNativePager, Button as ButonReactNativePager, Drawer, FAB, Icon, Menu } from "react-native-paper";
import styles from "./styles";
import { ColorNames } from "@app/values/ColorNames";


class TabVideoScreen extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            isVisiable: false
        }
    }

    showDialog = () => {
        this.setState({
            isVisiable: true
        })
    };

    handleCancel = () => {
        this.setState({
            isVisiable: false
        })
    };

    handleDelete = () => {
        this.setState({
            isVisiable: false
        })
    };


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffe7ba' }}>
                <Text style={{ fontSize: 20, color: 'blue' }}>
                    TabVideoScreen
                </Text>
                <Button title="Show dialog" onPress={this.showDialog} />
                <Portal>
                    <Dialog visible={this.state.isVisiable} onDismiss={this.handleDelete}>
                        <Dialog.Icon icon="alert" />
                        <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
                        <Dialog.Content>
                            <TextReactNativePager variant="bodyMedium">This is simple dialog</TextReactNativePager>
                        </Dialog.Content>

                        <Dialog.Actions>
                            <ButonReactNativePager onPress={() => console.log('Cancel')}>Cancel</ButonReactNativePager>
                            <ButonReactNativePager onPress={() => console.log('Ok')}>Ok</ButonReactNativePager>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                <Drawer.Section title="Mailbox">
                    <Drawer.CollapsedItem
                        focusedIcon="inbox"
                        unfocusedIcon="inbox-outline"
                        label="Inbox"
                    />
                    <Drawer.CollapsedItem
                        focusedIcon="email"
                        unfocusedIcon="email-outline"
                        label="Email"
                    />
                    <Drawer.CollapsedItem
                        focusedIcon="send"
                        unfocusedIcon="send-outline"
                        label="Send"
                    />
                </Drawer.Section>

                <FAB
                    variant="tertiary"
                    // color={ColorNames.gold1}
                    mode="elevated"
                    icon="plus"
                    style={styles.fab}
                    onPress={() => console.log('Pressed')}
                />

                <Icon
                    source="home"
                    color={ColorNames.lime5}
                    size={20}
                />

                <View style={{ flex: 1 }}>
                    <Menu.Item leadingIcon="redo" onPress={() => { }} title="Redo" />
                    <Menu.Item leadingIcon="undo" onPress={() => { }} title="Undo" />
                    <Menu.Item leadingIcon="content-cut" onPress={() => { }} title="Cut" disabled />
                    <Menu.Item leadingIcon="content-copy" onPress={() => { }} title="Copy" disabled />
                    <Menu.Item leadingIcon="content-paste" onPress={() => { }} title="Paste" />
                </View>
            </View >
        )
    }
}
export default TabVideoScreen;