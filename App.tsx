import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from "./src/components/BottomTab";
import { check,PERMISSIONS,RESULTS,openSettings,request, requestMultiple, checkMultiple } from "react-native-permissions";
import { Alert, Linking, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
const Stack = createStackNavigator();
 class App extends React.Component {
  componentDidMount(): void {
    if(Platform.OS=="ios"){
      requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.CONTACTS,
      ]).then(statuses => {
        if (
          (statuses[PERMISSIONS.IOS.CAMERA]=="granted" &&
            statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]=="granted" &&
            statuses[PERMISSIONS.IOS.CONTACTS]) === 'granted'
        ) {
          Alert.alert("Successfully Give Permissions")
        }
        else {
          Linking.openSettings();
        }
      });
    }else {
      requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_CONTACTS,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ]).then(result=>{
      if(result[PERMISSIONS.ANDROID.CAMERA]=="granted"&&
      result[PERMISSIONS.ANDROID.READ_CONTACTS]=="granted"&&
      result[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]=="granted"){
          Alert.alert("Successfully Give Permissions")
        }
        else {
          Linking.openSettings();

        }
    })
      
     
    
    }
  }
  render(): React.ReactNode {
    return (
      <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}
        >
      <Stack.Screen name="main" component={BottomTab}/>
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
    
  }
}

export default App;