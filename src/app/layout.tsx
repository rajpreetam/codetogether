import { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import Layout from '@c/hocs/Layout';

export const metadata: Metadata = {
  title: 'Codetogether',
  description: 'Online code collaborative platform!',
}

export default function RootLayout({children}: {children: ReactNode}) {
    return(
        <html lang="en">
            <body>
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    );
}