
import { ColorNames } from "@app/values/ColorNames";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    containerBanner: {
        flex: 1,
    },
    dot: {
        width: 15,
        height: 2,
        borderRadius: 4,
        backgroundColor: ColorNames.gray6,
        marginHorizontal: 5,
    },
    dotContainer: {
        width: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 45,
        alignSelf: 'center'
    },
    activeDot: {
        width: 20,
        height: 4,
        backgroundColor: ColorNames.while,
    },
});