// apps/web/src/app/resources/[topicId]/page.tsx
'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// We’ll read the `topicId` from the pathname (or use useSearchParams if you prefer).
export default function TopicPage() {
    const pathname = usePathname();               // e.g. "/resources/ViewContent"
    const parts = pathname.split('/');            // ["", "resources", "ViewContent"]
    const topicId = parts[2] || '';               // "ViewContent"

    // Dynamically import the component from ../content/${topicId}.tsx
    // Note: this must match the exact filename under content/
    const DynamicComp = dynamic(
        () => import(`../content/${topicId}`),
        {
            ssr: false,   // optional: if you want purely client-side. Remove this if you want SSR.
            loading: () => <p>Loading {topicId}…</p>,
            // If you DO want server-side rendering, remove `ssr: false` or set it to true:
            //    ssr: true
        }
    );

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Topic: {topicId}</h1>
            <Suspense fallback={<p>Loading content…</p>}>
                <DynamicComp />
            </Suspense>
        </main>
    );
}
