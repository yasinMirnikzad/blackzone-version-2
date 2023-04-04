

import * as React from 'react';
import { AppRegistry, I18nManager } from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';
// I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
//         sharedI18nUtilInstance.allowRTL(context, true);


const Index = () => {
    I18nManager.forceRTL(false);
    // I18nManager.allowRTL(true);
    return (
        <Provider store={store}>
            <NavigationContainer>
                <NativeBaseProvider

                >
                    <App />
                    <Toast
                        position='top'
                        bottomOffset={20}
                    />

                </NativeBaseProvider>
            </NavigationContainer>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Index);
