import React, { KeyboardEvent } from "react";
import { VideoDto } from "@frontend/shared-data";
import styles from "./VideoGrid.module.scss";

export interface VideoGridProps {
    /** Array of videos to render */
    videos: VideoDto[];
    /**
     * Called when a user selects a video.
     * Passes the full VideoDto object.
     */
    onSelect: (video: VideoDto) => void;
    /**
     * If true, show a loading state (skeletons) instead of real cards.
     * Optional.
     */
    isLoading?: boolean;
    /**
     * Number of placeholder cards to show while loading.
     * Defaults to 8.
     */
    placeholderCount?: number;
}

/**
 * Discriminated union for grid items:
 *  - Either a placeholder item (no `video` field),
 *  - Or a real item with `video: VideoDto`.
 */
type GridItem =
    | { placeholder: true; id: string }
    | { placeholder: false; id: string; video: VideoDto };

const truncateText = (text: string, maxLength: number): string =>
    text.length <= maxLength
        ? text
        : text.slice(0, maxLength - 1).trimEnd() + "…";

export const VideoGrid: React.FC<VideoGridProps> = ({
                                                        videos,
                                                        onSelect,
                                                        isLoading = false,
                                                        placeholderCount = 8,
                                                    }) => {
    // Build an array of GridItem
    const items: GridItem[] = isLoading
        ? Array.from({ length: placeholderCount }).map((_, idx) => ({
            placeholder: true,
            id: `placeholder-${idx}`,
        }))
        : videos.map((v) => ({
            placeholder: false,
            id: v.id,
            video: v,
        }));

    // Only called when placeholder === false
    const handleSelect = (video: VideoDto) => {
        onSelect(video);
    };

    // Keyboard handler now typed as HTMLDivElement
    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLElement>,
        video: VideoDto
    ) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(video);
        }
    };
    return (
        <div className={styles.gridContainer}>
            {items.map((item) =>
                item.placeholder ? (
                    <div
                        key={item.id}
                        className={`${styles.card} ${styles.skeleton}`}
                        aria-hidden="true"
                    >
                        <div className={styles.thumbnailSkeleton} />
                        <div className={styles.infoSkeleton}>
                            <div className={styles.titleSkeleton} />
                            <div className={styles.descSkeleton} />
                        </div>
                    </div>
                ) : (
                    <article
                        key={item.id}
                        className={styles.card}
                        tabIndex={0}
                        role="button"
                        onClick={() => handleSelect(item.video)}
                        onKeyDown={(e) => handleKeyPress(e, item.video)}
                        aria-label={`Play video: ${item.video.title}`}
                    >
                        <div className={styles.thumbnailWrapper}>
                            <img
                                src={item.video.thumbnailUrl}
                                alt={`Thumbnail for ${item.video.title}`}
                                className={styles.thumbnailImage}
                            />
                        </div>
                        <div className={styles.infoWrapper}>
                            <h3 className={styles.title}>
                                {truncateText(item.video.title, 60)}
                            </h3>
                            <p className={styles.description}>
                                {truncateText(item.video.description, 100)}
                            </p>
                        </div>
                    </article>
                )
            )}
        </div>
    );
};

export default VideoGrid;
