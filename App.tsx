import { storeRedux } from "@app/redux/store";
import { StackManager } from "@app/routes/StackManager";
import { DataInitialProps } from "@app/utils/DataInitialProps";
import { Navigator } from "@app/utils/Navigator";
import { NavigationContainer } from "@react-navigation/native"
import React from "react";
import { View } from "react-native"
import { Provider as ReactNativePagerProvider} from "react-native-paper";
import { Provider as ReduxProvider } from 'react-redux';


const App = (props: any) => {
  DataInitialProps.save(props);
  return (
    <ReactNativePagerProvider>
      <ReduxProvider store={storeRedux}>

        <View style={{ flex: 1 }}>
          <NavigationContainer
            ref={Navigator.navigationReference}>
            <StackManager />
          </NavigationContainer>

        </View>
      </ReduxProvider>
    </ReactNativePagerProvider>

  )
}
export default App;