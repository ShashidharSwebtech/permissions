import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import Document from '../src/components/Main/Document';


test("rendering Document component",()=>{
    render(<Provider store={store}>
        <Document/>
    </Provider>)
})