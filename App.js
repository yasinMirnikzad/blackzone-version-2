import React, { useState, useEffect } from 'react';
import {
  StyleSheet
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { setLoaderInVisible } from './src/redux/actions/loadingAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDevice } from './src/redux/actions/deviceAction';



// ----------- pages
import {
  Home,
  FirstPage,

  ModeratesPage,
  EditModratePage,

  ContactsPage,
  EditContactPage,

  ZonesPage,
  EditZonePage,
  RemotesPage,
  EditRemotePage,
  SettingPage,

  DevicesPage,
  EditDevicePage,

  FastSetupPageOne, FastSetupPageThree, FastSetupPageTwo,
  SplashPage,

  DeviceInfoPage,
  DeviceNumberPage,
  SubmitDevicePage,

  AddUserPage
} from './src/screens'

// ----------- component
import { CustomDrawer, LoadingModal } from './src/components';


// ----------- color
import { Background } from './src/config/colors.json';

const Drawer = createDrawerNavigator();


const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}

      screenOptions={{
        // badan dorost she alan elzami nist :D
        // drawerHideStatusBarOnOpen: true,
        drawerStyle: {
          width: '80%',
          zIndex: 100,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          overflow: 'hidden'
        },
        headerShown: false,
        drawerPosition: 'right'
      }}
      initialRouteName="Home">

      <Drawer.Screen name="Home" component={Home} />

    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Background,
    flex: 1
  },

});


const Stack = createNativeStackNavigator();


const App = (props) => {
  const dispatch = useDispatch();

  const showLoadingModal = useSelector((store) => store.loader_visibility.show_loader);

  const handleChange = () => {
    dispatch(setLoaderInVisible());
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
        initialRouteName={props.hasdevice ? 'HomeDrawer' : 'FirstPage'}
      >

        <Stack.Screen name="DeviceInfoPage" component={DeviceInfoPage} />
        <Stack.Screen name="DeviceNumberPage" component={DeviceNumberPage} />
        <Stack.Screen name="SubmitDevicePage" component={SubmitDevicePage} />

        <Stack.Screen name="FirstPage" component={FirstPage} />

        <Stack.Screen name="HomeDrawer" component={DrawerStack} />
        <Stack.Screen name="Moderates" component={ModeratesPage} />
        <Stack.Screen name="EditModratePage" component={EditModratePage} />

        <Stack.Screen name="ContactsPage" component={ContactsPage} />
        <Stack.Screen name="EditContactPage" component={EditContactPage} />

        <Stack.Screen name="AddUserPage" component={AddUserPage} />


        <Stack.Screen name="ZonesPage" component={ZonesPage} />
        <Stack.Screen name="EditZonesPage" component={EditZonePage} />

        <Stack.Screen name="RemotesPage" component={RemotesPage} />
        <Stack.Screen name="EditRemotePage" component={EditRemotePage} />



        <Stack.Screen name="SettingPage" component={SettingPage} />

        <Stack.Screen name="DevicesPage" component={DevicesPage} />
        <Stack.Screen name="EditDevicePage" component={EditDevicePage} />



        <Stack.Screen name="FastSetupOne" component={FastSetupPageOne} />
        <Stack.Screen name="FastSetupTwo" component={FastSetupPageTwo} />
        <Stack.Screen name="FastSetupThree" component={FastSetupPageThree} />




      </Stack.Navigator>

      <LoadingModal
        show={showLoadingModal}
        changeshow={handleChange}
      />

    </>
  )
}



const FirstStart = (props) => {
  const dispatch = useDispatch();
  const [loading, changeLoading] = useState(true);
  const [hasdevice, changeHasDevice] = useState(false);

  const Check = async () => {
    let values = await AsyncStorage.multiGet(['selected_device', 'devices']);

    console.log('devices', devices)
    let devices = await JSON.parse(values[1][1]);
    let selected_device = await JSON.parse(values[0][1]);

    if (devices) {
      await dispatch(setDevice(devices[selected_device]));
      await changeHasDevice(true);

    } else {
      await changeHasDevice(false);
    }

    changeLoading(false)
    // let device = await AsyncStorage.setItem('selected_devices', value)
    //  inja timesh malom she
    // setTimeout(() => {
    //   console.log('dev')

    // }, 500)
    // changeLoading(false)
    // if (device) {
    // }
  }

  useEffect(() => {
    // Check();
    setTimeout(() => {
      Check();
    }, 2200)

  }, [])

  if (loading)
    return (<SplashPage />)
  else
    return (
      <App hasdevice={hasdevice} />
    )
}


export default FirstStart;
