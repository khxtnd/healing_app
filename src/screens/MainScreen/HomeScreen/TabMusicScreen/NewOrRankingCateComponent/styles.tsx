import { ColorNames } from "@app/values/ColorNames";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  textViewCate: {
    color: ColorNames.black,
    fontSize: 20,
    marginStart: 15,
    fontFamily: 'quicksand_600',
    marginBottom: 6
  },
  tabItem: {
    marginEnd: 10,
    height: 30
  },
  tabBarItemText: {
    color: ColorNames.gray7,
    fontFamily: 'quicksand_500',
    fontSize: 16
  },
  activeTabText: {
    fontFamily: 'quicksand_500',
    color: ColorNames.oragnge6,
    fontSize: 16

  },
  container: {
    height: 300,
    width: Dimensions.get('window').width
  },
  imageItemSong: {
    marginEnd: 10,
    width: 50,
    height: 50,
    borderRadius: 5
  },

});