import { StackActions, createNavigationContainerRef } from '@react-navigation/native';

let navigationReference = createNavigationContainerRef();

const setNavigateReference = (newRef: any) => {
  navigationReference = newRef;
}

const navigate = (name: string, params?: object) => {
  navigationReference.navigate({
    name, params
  } as never);
};

const resetAndPush = (name: string, params?: object) => navigationReference.reset({
  index: 0,
  routes: [{ name, params }]
})

const push = (name: string, params?: object) => {
  const popAction = StackActions.push(name, params);
  navigationReference.dispatch(popAction);
};

const popScreen = (n: number) => {
  const popAction = StackActions.pop(n);
  navigationReference.dispatch(popAction);
};

const replace = (name: string, params?: object) => navigationReference.dispatch(
  StackActions.replace(name, params)
)

const goBack = () => navigationReference.goBack();

const isReady = () => navigationReference.isReady();

export const Navigator = {
  navigationReference,
  navigate,
  resetAndPush,
  popScreen,
  goBack,
  push,
  isReady,
  setNavigateReference,
  replace
}