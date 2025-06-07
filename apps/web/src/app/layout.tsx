// apps/web/src/app/layout.tsx
'use client';

import React from 'react';
import { QueryProvider } from '@/components/QueryProvider';
import '../globals.scss';
import Footer from "@/app/resources/Footer"; // your global styles

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="app-root">
        <QueryProvider>
            {/* If you have a header, put it here */}
            <div className="app-content">
                {children}
            </div>
            <Footer />
        </QueryProvider>
        </body>
        </html>
    );
}
