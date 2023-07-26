'use client';
import React from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const pathname = usePathname();
    const startPath = pathname.split('/')[1] || '/';

    const isActive = (link: string) => {
        if(pathname===link) {
            return 'text-gray-800 dark:text-gray-200 underline underline-offset-4';
        }
        return '';
    };
    
    
    return (
        <div className={`card py-2 ${startPath === 'dashboard' ? 'min-w-[816px]' : ''}`}>
            <div className={`${startPath === 'dashboard' ? 'container-db' : 'container'}`}>
                <div className='fr-ic-jb'>
                    <img src="/logo.png" alt="Codetogether" className='h-10' />

                    <div className='fr-ic-sx4'>
                        <Link href='/' className={`${isActive('/')}`}>Home</Link>
                        <Link href='/dashboard/123' className={`${isActive('/dashboard/123')}`}>Playground</Link>
                        <Link href='/login' className={`${isActive('/login')}`}>Login</Link>
                        <Link href='/register' className={`${isActive('/register')}`}>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;