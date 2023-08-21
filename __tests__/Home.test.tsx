import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';

import Home from '../src/components/Main/Home';
import {getByTestId} from '@testing-library/react';
import {initState} from '../src/redux/Reducer';
import {createStore} from 'redux';
import {store} from '../src/redux/store';
import {Provider} from 'react-redux';
import {act} from 'react-test-renderer';
import {launchImageLibrary} from 'react-native-image-picker';
import { Platform } from 'react-native';

export const heightPercentageToDP = jest.fn(percentage => percentage);
export const widthPercentageToDP = jest.fn(percentage => percentage);
jest.mock('react-native-responsive-screen', () => ({
  heightPercentageToDP: jest.fn(),
  widthPercentageToDP: jest.fn(),
}));
jest.mock("react-native/Libraries/Utilities/Platform",()=>({
  OS:'ios'
  }))
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn((option, callback) => {
    callback({assets: [{uri: ''}]});
  }),
}));
jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  const {View: MockView} = require('react-native');
  return {
    ...actualNavigation,
    NavigationContainer: () => <MockView />,
  };
});

jest.mock('react-native-document-picker', () => ({
  pick: jest.fn(),
}));
jest.mock('react-native-contacts', () => ({
  getAll: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Screen: jest.fn(),
    Navigator: jest.fn(),
  }),
}));
jest.mock("react-native/Libraries/Utilities/Platform",()=>({
  OS:'android'
  }))
jest.mock('react-native-image-crop-picker', () => ({
  openCamera: jest.fn(),
}));
//mocking the icons
jest.mock('react-native-vector-icons/Entypo', () => () => <></>);

const Props = {
  addDocument: jest.fn(),
  Add_Image: jest.fn(),
};

describe('Home Component', () => {
  test('camera button test', () => {
    const state = {
      image: 'ilflsdj',
    };
    const image = 'satalkjlk';
    const {getByTestId} = render(
      <Provider store={store}>
        <Home {...Props} />
      </Provider>,
    );
    const CameraBtn = getByTestId('camera_btn');
    act(() => {
      fireEvent.press(CameraBtn);
    });
  });
  test('Contact button check', () => {
    jest.mock('react-native-contacts', () => ({
      getAll: jest.fn(),
    }));
    const image = '';
    const {getByTestId} = render(
      <Provider store={store}>
        <Home {...Props} />
      </Provider>,
    );
    const ContactBtn = getByTestId('contact_btn');
    act(() => {
      fireEvent.press(ContactBtn);
    });
  });
  test('Alubm button check', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Home {...Props} />
      </Provider>,
    );
    const AlubmBtn = getByTestId('Alubm_btn');
    act(() => {
      fireEvent.press(AlubmBtn);
    });
    expect(launchImageLibrary).toBeCalled();
  });

  test('Document button check', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Home {...Props} />
      </Provider>,
    );
    const DocumentBtn = getByTestId('document');
    act(() => {
      fireEvent.press(DocumentBtn);
    });
   expect(Props.addDocument).toBeCalled
  });
  test("",()=>{
    const image = 'satalkjlk';
    Platform.OS="android"
    const {getByTestId} = render(
      <Provider store={store}>
        <Home {...Props} />
      </Provider>,
    );
    const container=getByTestId("homecontainer");
  })
  test('Contact button check error', () => {
    const image = '';
    jest.mock('react-native-contacts', ()=>{});
    const {getByTestId} = render(
      <Provider store={store}>
        <Home {...Props} />
      </Provider>,
    );
    const ContactBtn = getByTestId('contact_btn');
    fireEvent.press(ContactBtn);
    
  });
});
