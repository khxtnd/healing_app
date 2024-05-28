import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050A0E',
        justifyContent: 'center',
        paddingHorizontal: 42,
    },
    view_1: {
        padding: 35,
        backgroundColor: '#1A1C22',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    },
    text_title: {
        fontSize: 18,
        color: '#D0D4DD',
    },
    view_2: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
    },
    text_my_id: {
        fontSize: 32,
        color: '#ffff',
        letterSpacing: 6,
    },
    view_3:{
        backgroundColor: '#1A1C22',
        padding: 40,
        marginTop: 25,
        justifyContent: 'center',
        borderRadius: 14,
    }
})