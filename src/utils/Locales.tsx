import * as RNLocalize from "react-native-localize";
import _ from 'lodash';
import { availableLocale } from '../locales';

const getCurrentLocale = () => {
  const current = RNLocalize.getLocales()[0].languageCode;
  if (_.indexOf(availableLocale, current) >= 0)
    return current;
  else
    return availableLocale[0];
}

export const Locales = {
  getCurrentLocale
}