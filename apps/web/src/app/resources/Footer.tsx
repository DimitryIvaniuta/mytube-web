'use client';

import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <p>© {new Date().getFullYear()} MyTube. All rights reserved.</p>
                <nav className={styles.links}>
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
                    <a href="/terms"  target="_blank" rel="noopener noreferrer">Terms</a>
                    <a href="https://github.com/your-org/mytube" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
