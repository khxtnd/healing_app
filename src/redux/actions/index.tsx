import { ReduxActionNames } from "@app/values/ReduxActionNames";

export const reloadName = (name: string) => ({
  type: ReduxActionNames.UPDATE_NAME,
  name
})
export const setLanguage = (languageCode: string) => ({
  type: ReduxActionNames.SET_LANGUAGE,
  languageCode
});