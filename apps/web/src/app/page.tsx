'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchVideos } from '@/api/videoService';
import { VideoDto } from '@frontend/shared-data';
import VideoGrid from '@/components/VideoGrid';
import { useRouter } from 'next/navigation';

const PAGE_SIZE = 24;

export default function HomePage() {
    const router = useRouter();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery<VideoDto[], Error>({
        queryKey: ['videos'],
        queryFn: ({ pageParam = 0 }) => fetchVideos(pageParam  as number, PAGE_SIZE),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length === PAGE_SIZE ? allPages.length : undefined,
    });

    const allVideos = data?.pages.flat() ?? [];

    const observerRef = useRef<IntersectionObserver | null>(null);

    const observeLast = useCallback(
        (node: HTMLDivElement | null) => {
            if (isFetchingNextPage) return;

            // disconnect previous observer instance
            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            if (node) {
                observerRef.current.observe(node);
            }
        },
        [fetchNextPage, isFetchingNextPage, hasNextPage]
    );

    const handleSelect = (video: VideoDto) => {
        router.push(`/watch/${video.id}`);
    };

    return (
        <main className="container" style={{ paddingTop: '2rem' }}>
            {isError && (
                <p role="alert" style={{ color: 'red' }}>
                    Failed to load videos: {error?.message}
                </p>
            )}

            <VideoGrid
                videos={allVideos}
                onSelect={handleSelect}
                isLoading={isLoading}
            />

            <div ref={observeLast} style={{ height: 1 }} />

            {isFetchingNextPage && (
                <p style={{ textAlign: 'center', padding: '1rem' }}>Loading more…</p>
            )}
        </main>
    );
}
