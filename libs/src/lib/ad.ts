import { z } from "zod";

/**
 * Ad schema: describes an advertisement shown before a video.
 */
export const adSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string().url(),
    videoUrl: z.string().url(),
    durationSeconds: z.number().int().positive(), // e.g. 5–30
    skippableAfter: z.number().int().nonnegative().optional(), // optional, e.g. 5 seconds
    createdBy: z.string().uuid(),
    uploadedAt: z.number() // timestamp in ms
});

/**
 * Schema for validating a list of ads.
 */
export const adListSchema = z.array(adSchema);

/**
 * TypeScript DTO type inferred from Zod.
 */
export type AdDto = z.infer<typeof adSchema>;