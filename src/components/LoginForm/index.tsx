'use client';

import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { EyeIcon } from '@heroicons/react/24/outline';
import { login } from '@/store/features/auth/authSlice';
import { AppDispatch } from '@/store';
import Spinner from '@ui/Spinner';
import { baseQuery } from '@/services';

const LoginForm = () => {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const [passwordType, setPasswordType] = useState('password');
    const [eyeClicked, setEyeClicked] = useState(true);
    const [formData, setFormData] = useState({username: '', password: ''});
    const [loading, setLoading] = useState(false);

    const handleEyeClicked = () => {
        setEyeClicked(!eyeClicked);

        if(eyeClicked) setPasswordType('text');
        else setPasswordType('password');

    };

    const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.currentTarget.name]: e.currentTarget.value});
    };

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const username = formData.username;
        const password = formData.password;

        baseQuery.post('/auth/token', {username, password})
            .then(res => {
                localStorage.access = res.data.access
                localStorage.refresh = res.data.refresh

                baseQuery.get('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${res.data.access}`
                    }
                })
                    .then(res => {
                        setLoading(false);
                        localStorage.user = JSON.stringify(res.data.data);
                        dispatch(login(res.data.data));
                        toast.success('Logged in successfully.');
                        router.push('/');
                    })
                    .catch(err => {
                        toast.error(err.response.data.detail);
                    })                
                
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.response.data.detail);
            });
    };    

    return (
        <form className='fc-sy4' onSubmit={handleLogin}>
            <div className='fc-sy2'>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    className='input'
                    placeholder='Username'
                    autoComplete='none'
                    value={formData.username}
                    onChange={handleOnChange}
                    required
                />
            </div>

            <div className='fc-sy2'>
                <label htmlFor="password">Password</label>
                <div className='fr-ic-sx2 input'>
                    <input
                        type={passwordType}
                        name="password"
                        className='w-full bg-transparent outline-none'
                        placeholder='Password'
                        autoComplete='none'
                        value={formData.password}
                        onChange={handleOnChange}
                        required
                    />
                    <EyeIcon className='icon-sm' onClick={handleEyeClicked} />
                </div>
            </div>
            
            <button type='submit' className='btn-outlined'>{
                loading ? (
                    <div className='fr-ic-sx2'>
                        <Spinner />
                        <span>Logging in...</span>
                    </div>
                ) : 'Login'
            }</button>
            
        </form>
    );
};

export default LoginForm;