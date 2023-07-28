'use client';
import React, { useState } from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { User } from '@/types';
import { logout } from '@/store/features/auth/authSlice';
import { Avatar } from '@ui/Avatar';
import ProfileModel from './ProfileModel';

const Navbar = () => {
    const dispatch: AppDispatch = useDispatch();
    const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);
    const user = useSelector<RootState>(state => state.auth.user);
    const [profileModelClicked, setProfileModelClicked] = useState(false);

    const pathname = usePathname();
    const startPath = pathname.split('/')[1] || '/';

    const isActive = (link: string) => {
        if(pathname===link) {
            return 'text-gray-800 dark:text-gray-200 underline underline-offset-4';
        }
        return '';
    };
    
    const handleProfileClicked = () => {
        setProfileModelClicked(!profileModelClicked);
    };
    
    return (
        <div className={`card py-2 ${startPath === 'dashboard' ? 'min-w-[816px]' : ''}`}>
            <div className={`${startPath === 'dashboard' ? 'container-db' : 'container'}`}>
                <div className='fr-ic-jb relative'>
                    {isAuthenticated ? <ProfileModel clicked={profileModelClicked} /> : null}
                    <img src="/logo.png" alt="Codetogether" className='h-10' />

                    <div className='fr-ic-sx4'>
                        <Link href='/' className={`${isActive('/')}`}>Home</Link>
                        <Link href='/dashboard/123' className={`${isActive('/dashboard/123')}`}>Playground</Link>
                        {isAuthenticated ? (
                            <Avatar
                                image='https://res.cloudinary.com/dxgl4eyhq/image/upload/v1687987306/portfolio/me/preetam_ha8a2h.jpg'
                                onClick={handleProfileClicked}
                            />
                        ) : (
                            <Link href='/auth/login' className={`${isActive('/auth/login')}`}>Login/Register</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;