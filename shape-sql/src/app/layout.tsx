import './globals.css';

export const metadata = {
  title: 'Shape',
  description: 'Get answers from an AI data scientist',
};

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
