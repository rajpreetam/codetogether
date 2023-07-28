'use client';
import { store } from '@/store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

export interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider = ({children}: StoreProviderProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default StoreProvider;