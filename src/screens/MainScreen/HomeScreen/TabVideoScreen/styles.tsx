import { ColorNames } from "@app/values/ColorNames";
import { FontNames } from "@app/values/FontNames";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    title: {
        textAlign: 'center',
        fontFamily: FontNames.montserrat_black
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        // color: ColorNames.cyan7
    },

})