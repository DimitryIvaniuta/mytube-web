'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                {/*
          - Next.js automatically serves anything in `public/` at the root.
          - So `/logo.svg` works as long as you placed logo.svg in `apps/web/public/`.
        */}
                <Image
                    src="/logo.svg"
                    alt="MyTube Java Logo"
                    width={32}
                    height={32}
                    priority={true}
                />
            </div>
            <h1 className={styles.title}>MyTube</h1>
        </header>
    );
};

export default Header;
