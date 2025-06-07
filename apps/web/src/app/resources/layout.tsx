// apps/web/src/app/resources/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import styles from './layout.module.scss';
import {sidebarSections, topicList} from "@/app/resources/sidebarLinks";
import {Header} from "@/app/resources/components/Header";

export default function ResourcesLayout({
                                            children,
                                        }: {
    children: ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div style={{marginBottom: 50}}>
            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <Header/>
                    {sidebarSections.map((section, sectionIdx) => (
                        <nav key={sectionIdx} className={styles.navSection}>
                            {section.title && (
                                <h3 className={styles.sectionTitle}>{section.title}</h3>
                            )}
                            {section.links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        href={link.href}
                                        key={link.href}
                                        className={
                                            isActive
                                                ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                                                : styles.sidebarLink
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    ))}
                    {topicList.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    isActive
                                        ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                                        : styles.sidebarLink
                                }
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </aside>

                <main className={styles.content}>{children}</main>
            </div>
            <div>&nbsp;</div>
        </div>
    );
}
