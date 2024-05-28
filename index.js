import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';

const MainApp = (props) => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <App {...props}/>
        </GestureHandlerRootView>
    )
};

AppRegistry.registerComponent(appName, () => MainApp);
