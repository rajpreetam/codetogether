'use client';
import React, { ComponentProps, ReactNode, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@c/Navbar';
import { baseQuery } from '@/services';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import Spinner from '../ui/Spinner';

export interface LayoutProps extends ComponentProps<'div'> {
    children: ReactNode;
};

const Layout = ({children}: LayoutProps) => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        const access = localStorage.access;
        const refresh = localStorage.refresh;        

        if(access === undefined && refresh === undefined) {
            dispatch(logout());
            toast.info('Session expired, login again');
            router.push('/')
        } else {

            baseQuery.post('/auth/token/verify', {token: access})
                .then(res => {
                    dispatch(login(JSON.parse(localStorage.user)));
                })
                .catch(err => {
                    console.log(err.response.status === 401);
                    baseQuery.post('/auth/token/refresh', {refresh})
                        .then(res => {
                            const access = res.data.access;
                            localStorage.access = access;
                            dispatch(login(JSON.parse(localStorage.user)));
                            
                        })
                        .catch(err => {
                            dispatch(logout());
                            toast.info('Session expired, login again');
                            router.push('/');
                        });
                })
        }
    }, []);

    if(loading) {
        return(
            <div className='h-screen w-full fr-ic-jc'>
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;