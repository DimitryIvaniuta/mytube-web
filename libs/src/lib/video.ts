import { z } from "zod";

export const videoSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string().url(),
    videoUrl: z.string().url(),
    createdBy: z.string().uuid(),
    uploadedAt: z.number()
});

export const videoListSchema = z.array(videoSchema);
export type VideoDto = z.infer<typeof videoSchema>;
