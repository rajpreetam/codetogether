'use client';
import React from 'react';
import { Avatar } from '@ui/Avatar';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@/types';
import { logout } from '@/store/features/auth/authSlice';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

type Props = {
    clicked: boolean;
};

const ProfileModel = ({clicked}: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector<RootState>(state => state.auth.user);

    return (
        <div className={`${clicked ? 'fc-sy4' : 'hidden'} items-start card-light border border-text-d dark:border-text-l absolute z-20 w-72 right-0 top-12 p-4`}>
            <div className='fr-ic-sx4'>
                <Avatar
                    image='https://res.cloudinary.com/dxgl4eyhq/image/upload/v1687987306/portfolio/me/preetam_ha8a2h.jpg'
                    size='lg'
                />
                <h1>{`${(user as User).first_name} ${(user as User).last_name}`}</h1>
            </div>
            <div className='border-b w-full border-text-d dark:border-text-l' />
            <div
                className='fr-ic-sx2'
                onClick={() => dispatch(logout())}
            >
                <ArrowRightOnRectangleIcon className='icon' />
                <button>Logout</button>
            </div>
        </div>
    );
};

export default ProfileModel;