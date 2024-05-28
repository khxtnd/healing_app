import * as RNLocalize from "react-native-localize";
import { I18n } from "i18n-js";

import en from './en.json';
import vi from './vi.json';

export const availableLocale = ["en", "vi",]

const i18n = new I18n({ en, vi});

i18n.locale = RNLocalize.getLocales()[0].languageCode;

i18n.enableFallback = true;

export default i18n;