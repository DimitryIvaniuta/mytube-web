// apps/web/src/app/components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { topicList } from '../resources/sidebarLinks';

export default function Sidebar() {
    const pathname = usePathname() || '';

    return (
        <nav
            style={{
                width: '220px',
                background: '#f5f5f5',
                padding: '1rem',
                boxSizing: 'border-box',
                borderRight: '1px solid #ddd',
            }}
        >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}>
                    <Link
                        href="/"
                        style={{
                            textDecoration: 'none',
                            color: pathname === '/' ? 'blue' : 'black',
                        }}
                    >
                        Home
                    </Link>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                    <Link
                        href="/other"
                        style={{
                            textDecoration: 'none',
                            color: pathname === '/other' ? 'blue' : 'black',
                        }}
                    >
                        Other Page
                    </Link>
                </li>

                <li style={{ margin: '1rem 0 0.5rem', fontWeight: 'bold' }}>
                    Additional Topics
                </li>

                {topicList.map((topicId) => {
                    const href = `/resources/${topicId}`;
                    const isActive = pathname === href;
                    return (
                        <li key={topicId} style={{ marginBottom: '0.4rem' }}>
                            <Link
                                href={href}
                                style={{
                                    textDecoration: 'none',
                                    color: isActive ? 'blue' : 'black',
                                }}
                            >
                                {topicId}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
