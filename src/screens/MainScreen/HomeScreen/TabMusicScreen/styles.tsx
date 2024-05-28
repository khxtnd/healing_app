import { ColorNames } from "@app/values/ColorNames";
import { widthScreen } from "@app/values/DeviceInfo";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: ColorNames.blue1, flex: 1
  },
  containerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorNames.lime1,
    height: 55,
  },
  logoImage: {
    marginStart: 15,
    height: 40,
    width: 40,
    borderRadius: 20
  },

  textViewCate: {
    color: ColorNames.black,
    fontSize: 20,
    marginStart: 15,
    fontFamily: 'quicksand_600',
    marginBottom: 6
  },



  imageItemSongBestGenre: {
    width: (widthScreen - 45) / 2,
    height: 75,
    borderRadius: 10
  },
  textViewAll: {
    color: ColorNames.black,
    fontSize: 16,
    marginEnd: 15,
    fontFamily: 'quicksand_500'
  },
  imageItemSongCollection: {
    marginEnd: 10,
    marginBottom: 10,
    width: 120,
    height: 120,
    borderRadius: 10
  },
});