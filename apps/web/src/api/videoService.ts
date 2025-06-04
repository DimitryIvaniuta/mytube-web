import { videoListSchema, videoSchema, VideoDto } from "@frontend/shared-data";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
const VIDEO_ENDPOINT = `${API_BASE}/api/videos`;

/**
 * Wrapper around fetch with timeout, JSON parsing, and status check.
 */
async function safeRequest<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(input, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
        signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const json = await res.json();
    return json as T;
}

/**
 * Fetch paginated list of videos from backend.
 */
export async function fetchVideos(page: number = 0, size: number = 24): Promise<VideoDto[]> {
    const raw = await safeRequest<unknown[]>(`${VIDEO_ENDPOINT}?page=${page}&size=${size}`);
    return videoListSchema.parse(raw);
}

/**
 * Create a new video on the backend
 */
export async function createVideo(payload: Omit<VideoDto, "id" | "uploadedAt">): Promise<VideoDto> {
    const raw = await safeRequest<unknown>(VIDEO_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return videoSchema.parse(raw);
}

/**
 * Delete a video by its ID
 */
export async function deleteVideo(id: string): Promise<{ success: boolean }> {
    return safeRequest(`${VIDEO_ENDPOINT}/${id}`, { method: "DELETE" });
}

/**
 * Fetch single video by ID
 */
export async function getVideo(id: string): Promise<VideoDto> {
    const raw = await safeRequest<unknown>(`${VIDEO_ENDPOINT}/${id}`);
    return videoSchema.parse(raw);
}

/**
 * Update a video (partial payload allowed)
 */
export async function updateVideo(id: string, update: Partial<VideoDto>): Promise<VideoDto> {
    const raw = await safeRequest<unknown>(`${VIDEO_ENDPOINT}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(update),
    });
    return videoSchema.parse(raw);
}
