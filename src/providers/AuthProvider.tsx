'use client';
import React, { ReactNode, useEffect, useState } from 'react'

export interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if(localStorage.isAuthenticated !== undefined) {
            setIsAuthenticated(JSON.parse(localStorage.isAuthenticated))
        }

        console.log(isAuthenticated);
        
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default AuthProvider;