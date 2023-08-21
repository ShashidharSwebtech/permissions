/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { PERMISSIONS, checkMultiple, request } from 'react-native-permissions';
import { Alert, Platform } from 'react-native';
jest.mock("@react-navigation/native", () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  const { View: MockView } = require("react-native")
  return {
    ...actualNavigation,
    NavigationContainer: () => <MockView />
  }
});


const { View: MockView } = require('react-native');
jest.mock("@react-navigation/bottom-tabs", () => {
  
  return {
      createBottomTabNavigator: () => ({
          Navigator: () => <MockView />,
          Screen: () => (props: any) => <></>
      })
  };
})
jest.mock("react-native-contacts",()=>({
  getAll:jest.fn()
}))

jest.mock("react-native-permissions", () => ({
  PERMISSIONS: {IOS: {
    CAMERA: "ios.permission.CAMERA", 
    CONTACTS: "ios.permission.CONTACTS", 
    PHOTO_LIBRARY: "ios.permission.PHOTO_LIBRARY"
  }, ANDROID: { 
    CAMERA: "android.permission.CAMERA",
    READ_CONTACTS: "android.permission.READ_CONTACTS",
    READ_MEDIA_IMAGES: "android.permission.READ_MEDIA_IMAGES"
  }
},
RESULT:{
GRANTED:"denied",

},
  requestMultiple:jest.fn() ,
  checkMultiple:jest.fn().mockImplementation(()=>{
    return Promise.resolve({
      
    })
  }),
  check:jest.fn()
}))
jest.spyOn(Alert, 'alert');
export const heightPercentageToDP = jest.fn(percentage => percentage);
export const widthPercentageToDP = jest.fn(percentage => percentage);
jest.mock("react-native-responsive-screen", () => ({
    heightPercentageToDP: jest.fn(),
    widthPercentageToDP: jest.fn()
  }))
  jest.mock("react-native-document-picker",()=>({
    pick:jest.fn()
  }))
  jest.mock("react-native-image-picker",()=>({
    launchImageLibrary:jest.fn()
  }))
jest.mock("react-native-vector-icons/AntDesign", () => () => <></>)
jest.mock("react-native-vector-icons/Entypo", () => () => <></>)
jest.mock("react-native-vector-icons/Ionicons", () => () => <></>)


jest.mock("@react-navigation/stack",()=>({
  createStackNavigator:()=>({
      Screen:jest.fn(),
      Navigator:jest.fn()
  })
}))
jest.mock("react-native-image-crop-picker",()=>({
  openCamera:jest.fn()
}))
jest.mock("@react-navigation/bottom-tabs",()=>({

  createBottomTabNavigator:()=>({
      Screen:jest.fn(),
      Navigator:jest.fn()
  })
}))



jest.mock("react-native/Libraries/Utilities/Platform",()=>({
OS:'ios'
}))


describe("app component",()=>{
  it('renders correctly granded', () => {
        let requestMultipleMock =require('react-native-permissions').requestMultiple;
        requestMultipleMock.mockResolvedValue({
                [PERMISSIONS.IOS.CAMERA]: 'granted',
                [PERMISSIONS.IOS.CONTACTS]: 'granted',
                [PERMISSIONS.IOS.PHOTO_LIBRARY]: 'granted',
        });
        jest.mock("react-native/Libraries/Utilities/Platform",()=>({
          OS:'ios',
          select:()=>null
          }))
        renderer.create(<App/>)
  });
  it('renders correctly denied', () => {
    let requestMultipleMock =require('react-native-permissions').requestMultiple;
    requestMultipleMock.mockResolvedValue({
            [PERMISSIONS.IOS.CAMERA]: 'denied',
            [PERMISSIONS.IOS.CONTACTS]: 'denied',
            [PERMISSIONS.IOS.PHOTO_LIBRARY]: 'denied',
    });
    jest.mock("react-native/Libraries/Utilities/Platform",()=>({
      OS:'ios',
      select:()=>null
      }))
    renderer.create(<App/>)
});
  it("resuest permitions for ios",async()=>{
        Platform.OS="android"
    const requestMultipleMock =require('react-native-permissions').requestMultiple;
requestMultipleMock.mockResolvedValue({
        [PERMISSIONS.ANDROID.CAMERA]: 'granted',
        [PERMISSIONS.ANDROID.READ_CONTACTS]: 'granted',
        [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]: 'granted',
});
    render(<App/>)
          
        })
        it("resuest permitions for ios",async()=>{
          Platform.OS="android"
      const requestMultipleMock =require('react-native-permissions').requestMultiple;
  requestMultipleMock.mockResolvedValue({
          [PERMISSIONS.ANDROID.CAMERA]: 'denied',
          [PERMISSIONS.ANDROID.READ_CONTACTS]: 'denied',
          [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]: 'denied',
  });
      render(<App/>)
            
          })
})
