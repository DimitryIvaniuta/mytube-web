// apps/web/src/app/resources/page.tsx
import React from 'react';
import Link from 'next/link';

export default function ResourcesIndex() {
    return (
        <section style={{ padding: '2rem' }}>
            <h1>Resources</h1>
            <p>Please pick a topic from the sidebar:</p>
            <ul>
                <li><Link href="/resources/Overview">Overview</Link></li>
                <li><Link href="/resources/Details">Details</Link></li>
                <li><Link href="/resources/ViewContent">ViewContent</Link></li>
            </ul>
        </section>
    );
}
