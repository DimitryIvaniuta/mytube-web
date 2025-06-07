// apps/web/src/app/resources/sidebarLinks.ts

import PresentationCard from "@/app/resources/content/PresentationCard";
import DeepMergePresentation from "@/app/resources/content/DeepMergePresentation";
import InputWithTooltip from "@/app/resources/content/InputWithTooltip";

/**
 * A single link item in the sidebar.
 * - `label`: The text displayed in the sidebar.
 * - `href`: The URL path to navigate to.
 * - (Optional) You could add `icon` here if you want to show an icon.
 */
export interface SidebarLink {
    label: string;
    href: string;
}

/**
 * If you have logical groupings (e.g. categories), you can nest them:
 */
export interface SidebarSection {
    title?: string;            // Optional heading for a group of links
    links: SidebarLink[];
}

/**
 * Top-level array of sections. Each section may have a `title`, or be anonymous.
 * Add hundreds of links here if needed.
 */
export const sidebarSections: SidebarSection[] = [
    {
        title: "General",
        links: [
            { label: "Overview", href: "/resources/overview" },
            { label: "Details",  href: "/resources/details"  },
            // … add more “General” links here
        ],
    },
    {
        title: "Guides",
        links: [
            { label: "Getting Started", href: "/resources/guides/getting-started" },
            { label: "Best Practices",   href: "/resources/guides/best-practices" },
            // … add more “Guides” links here
        ],
    },
    {
        title: "API References",
        links: [
            { label: "Video API",    href: "/resources/api/video" },
            { label: "Auth API",     href: "/resources/api/auth"  },
            { label: "Comments API", href: "/resources/api/comments" },
            // … add more APIs here
        ],
    },
    // You can add as many sections as you like:
    {
        title: "Advanced Topics",
        links: [
            { label: "Scaling Architecture", href: "/resources/advanced/scaling" },
            { label: "Security Patterns",    href: "/resources/advanced/security" },
            // etc.
        ],
    },
    // If you want a section without a heading, just omit `title`:
    {
        links: [
            { label: "Changelog", href: "/resources/changelog" },
            { label: "Roadmap",   href: "/resources/roadmap" },
        ]
    },
];

export const topicList = [
    { label: 'Overview', href: '/resources/Overview' },
    { label: 'Details', href: '/resources/Details' },
    { label: 'ViewContent', href: '/resources/ViewContent' },
    { label: 'DoubleArrayComponent', href: '/resources/DoubleArrayComponent' },
    { label: 'PresentationCardWrapper', href: '/resources/PresentationCardWrapper' },
    { label: 'DoubleArrayComponentImplWrapper', href: '/resources/DoubleArrayComponentImplWrapper' },
    { label: 'DeepMergePresentation', href: '/resources/DeepMergePresentation' },
    { label: 'ForwardRefButtonWrapper', href: '/resources/ForwardRefButtonWrapper' },
    { label: 'InputWithTooltip', href: '/resources/InputWithTooltip' },
    { label: 'LimitedInputWithWarning', href: '/resources/LimitedInputWithWarning' },
];
