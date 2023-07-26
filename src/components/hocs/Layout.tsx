import React, { ComponentProps, ReactNode } from 'react';
import Navbar from '@c/Navbar';

export interface LayoutProps extends ComponentProps<'div'> {
    children: ReactNode;
};

const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;