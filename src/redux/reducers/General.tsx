import { Locales } from "@app/utils/Locales";
import { ReduxActionNames } from "@app/values/ReduxActionNames";


const initialStates = {
  languageCode: 'vi',
};

const general=(state2 = initialStates, actionData: any) => {
  switch (actionData.type) {
    case ReduxActionNames.SET_LANGUAGE:
      return {
        ...state2, 
        languageCode: actionData.languageCode
      }


    default:
      return state2;
  }
}
export default general;