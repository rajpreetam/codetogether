import { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import Layout from '@c/hocs/Layout';
import StoreProvider from '@/providers/StoreProvider';

export const metadata: Metadata = {
  title: 'Codetogether',
  description: 'Online code collaborative platform!',
}

export default function RootLayout({children}: {children: ReactNode}) {
    return(
        <html lang="en">
            <body>
                <StoreProvider>
                    <Layout>
                        {children}
                    </Layout>
                </StoreProvider>
            </body>
        </html>
    );
}