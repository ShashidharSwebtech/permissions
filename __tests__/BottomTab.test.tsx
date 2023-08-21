import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import BottomTab from '../src/components/BottomTab';

jest.mock("react-native-responsive-screen", () => ({
    heightPercentageToDP: jest.fn(),
    widthPercentageToDP: jest.fn()
  }))
  jest.mock("react-native-contacts",()=>({
    getAll:jest.fn()
  }))
  jest.mock("react-native-image-crop-picker",()=>({
    openCamera:jest.fn()
  }))
  const {View:MockView}=require("react-native")
  jest.mock("@react-navigation/bottom-tabs",()=>({
    createBottomTabNavigator: jest.fn(() => ({
        Navigator: (props: any) => {
            return <MockView {...props} />
        },
        Screen: (props: any) => {
            props.options.tabBarIcon({ focused: true })
            props.options.tabBarIcon({ focused: false })
            return <MockView {...props} />
        }
    }))
  }))
  jest.mock("react-native-document-picker",()=>({
    pick:jest.fn()
  }))
  jest.mock("react-native-contacts",()=>({
    getAll:jest.fn()
  }))
  jest.mock("react-native-image-picker",()=>({
    launchImageLibrary:jest.fn()
  }))
  jest.mock("react-native-vector-icons/AntDesign", () => () => <></>)
  jest.mock("react-native-vector-icons/Ionicons", () => () => <></>)
  jest.mock("react-native-vector-icons/Entypo", () => () => <></>)
  
  
  describe("Bottom Tab Comonent",()=>{
    test("render",()=>{
        const {getByTestId}=render(<BottomTab/>)
    })
  })