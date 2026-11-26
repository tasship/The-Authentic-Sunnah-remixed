import { YOUTUBE_CONFIG } from '../config/youtubeConfig';
import { YouTubeChannelFeed } from '../types';

const CACHE_PREFIX = 'tas_yt_feed_v1_';

export async function fetchYouTubeChannelFeed(channelId?: string): Promise<YouTubeChannelFeed> {
  const targetId = (channelId || YOUTUBE_CONFIG.DEFAULT_YOUTUBE_CHANNEL_ID).trim();
  const cacheKey = `${CACHE_PREFIX}${targetId}`;

  try {
    const res = await fetch(`/api/youtube/channel?channelId=${encodeURIComponent(targetId)}`);
    if (!res.ok) {
      throw new Error(`YouTube feed returned ${res.status}`);
    }
    const data = (await res.json()) as YouTubeChannelFeed;
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch {
      // ignore storage quota
    }
    return data;
  } catch (err) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached) as YouTubeChannelFeed;
    } catch {
      // ignore
    }
    throw err;
  }
}
