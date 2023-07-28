import LoginForm from '@c/LoginForm';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    return (
        <div className='container fr-ic-jc w-full h-[calc(100vh-56px)]'>
            <div className='card p-10 w-full max-w-[400px] fc-sy4'>
                <h1 className='brand'>Code Together - Login</h1>
                <LoginForm />
                <p>Do not have an account? <Link href='/auth/register' className='text-blue-500'>Register</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;