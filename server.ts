import { GoogleGenAI } from '@google/genai';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DEFAULT_CHANNEL_ID = 'UC9wKJbbywUez7MHYEjEsY1A';

interface YouTubeVideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  views: string;
  type: 'video' | 'short';
  category: 'Quran Tafsir' | 'Authentic Hadith' | 'Reminders' | 'Shorts';
  url: string;
}

interface YouTubePlaylistItem {
  id: string;
  title: string;
  videoCount: string;
  thumbnail: string;
  url: string;
}

interface ChannelFeedPayload {
  channelId: string;
  channelTitle: string;
  channelHandle: string;
  channelUrl: string;
  videos: YouTubeVideoItem[];
  shorts: YouTubeVideoItem[];
  playlists: YouTubePlaylistItem[];
  fetchedAt: string;
}

const channelCache = new Map<string, { expiresAt: number; data: ChannelFeedPayload }>();
const tafsirCache = new Map<string, { expiresAt: number; data: unknown }>();

function categorizeTitle(title: string, isShort: boolean): YouTubeVideoItem['category'] {
  if (isShort) return 'Shorts';
  const lower = title.toLowerCase();
  if (
    lower.includes('quran') ||
    lower.includes('tafsir') ||
    lower.includes('surah') ||
    lower.includes('ayah') ||
    lower.includes('recitation')
  ) {
    return 'Quran Tafsir';
  }
  if (
    lower.includes('hadith') ||
    lower.includes('bukhari') ||
    lower.includes('muslim') ||
    lower.includes('sunnah') ||
    lower.includes('prophet') ||
    lower.includes('narration')
  ) {
    return 'Authentic Hadith';
  }
  return 'Reminders';
}

function extractYtInitialData(html: string): Record<string, any> | null {
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!match?.[1]) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

async function resolveChannelId(input: string): Promise<string> {
  const trimmed = input.trim();
  if (/^UC[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return trimmed;
  }
  const handlePath = trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
  const resp = await fetch(`https://www.youtube.com/${encodeURIComponent(handlePath)}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  const html = await resp.text();
  const idMatch = html.match(/"externalId":"(UC[^"]+)"/);
  if (idMatch?.[1]) return idMatch[1];
  return DEFAULT_CHANNEL_ID;
}

function parseVideosFromData(data: Record<string, any>): YouTubeVideoItem[] {
  const videos: YouTubeVideoItem[] = [];
  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const selectedTab = tabs.find((t: any) => t.tabRenderer?.selected)?.tabRenderer;
  const gridItems = selectedTab?.content?.richGridRenderer?.contents || [];

  for (const entry of gridItems) {
    const content = entry?.richItemRenderer?.content;
    if (!content) continue;

    if (content.lockupViewModel) {
      const lvm = content.lockupViewModel;
      const id = lvm.contentId;
      if (!id) continue;
      const title = lvm.metadata?.lockupMetadataViewModel?.title?.content || 'Untitled Lecture';
      const sources = lvm.contentImage?.thumbnailViewModel?.image?.sources || [];
      const thumbnail = sources[sources.length - 1]?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      const overlays = lvm.contentImage?.thumbnailViewModel?.overlays || [];
      let duration = '';
      for (const ov of overlays) {
        const badge = ov?.thumbnailBottomOverlayViewModel?.badges?.[0]?.thumbnailBadgeViewModel?.text;
        if (badge) duration = badge;
      }
      const rows = lvm.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows || [];
      const parts = rows.flatMap((r: any) => r.metadataParts || []).map((p: any) => p.text?.content).filter(Boolean);
      const views = parts.find((p: string) => /\d/.test(p) && !p.includes('ago')) || '';
      const publishedAt = parts.find((p: string) => p.includes('ago')) || 'Recent';

      videos.push({
        id,
        title,
        thumbnail,
        publishedAt,
        duration,
        views: views ? `${views} views` : '',
        type: 'video',
        category: categorizeTitle(title, false),
        url: `https://www.youtube.com/watch?v=${id}`,
      });
    } else if (content.videoRenderer) {
      const vr = content.videoRenderer;
      const id = vr.videoId;
      if (!id) continue;
      const title = vr.title?.runs?.[0]?.text || 'Untitled Lecture';
      const thumbs = vr.thumbnail?.thumbnails || [];
      const thumbnail = thumbs[thumbs.length - 1]?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      videos.push({
        id,
        title,
        thumbnail,
        publishedAt: vr.publishedTimeText?.simpleText || 'Recent',
        duration: vr.lengthText?.simpleText || '',
        views: vr.shortViewCountText?.simpleText || '',
        type: 'video',
        category: categorizeTitle(title, false),
        url: `https://www.youtube.com/watch?v=${id}`,
      });
    }
  }
  return videos;
}

function parseShortsFromData(data: Record<string, any>): YouTubeVideoItem[] {
  const shorts: YouTubeVideoItem[] = [];
  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const selectedTab = tabs.find((t: any) => t.tabRenderer?.selected)?.tabRenderer;
  const gridItems = selectedTab?.content?.richGridRenderer?.contents || [];

  for (const entry of gridItems) {
    const slvm = entry?.richItemRenderer?.content?.shortsLockupViewModel;
    if (!slvm) continue;
    const id = slvm.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId;
    if (!id) continue;
    const rawAcc = slvm.accessibilityText || '';
    const titleFromOverlay = slvm.overlayMetadata?.primaryText?.content;
    const viewsFromOverlay = slvm.overlayMetadata?.secondaryText?.content;
    const title = titleFromOverlay || rawAcc.split(',')[0]?.trim() || 'Islamic Short Reminder';
    const views = viewsFromOverlay || (rawAcc.match(/([\d.,KMB]+\s+views)/i)?.[1] ?? '');
    const thumbs = slvm.thumbnail?.sources || slvm.onTap?.innertubeCommand?.reelWatchEndpoint?.thumbnail?.thumbnails || [];
    const thumbnail = thumbs[thumbs.length - 1]?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

    shorts.push({
      id,
      title,
      thumbnail,
      publishedAt: 'Short',
      duration: 'Short',
      views,
      type: 'short',
      category: 'Shorts',
      url: `https://www.youtube.com/shorts/${id}`,
    });
  }
  return shorts;
}

function parsePlaylistsFromData(data: Record<string, any>): YouTubePlaylistItem[] {
  const playlists: YouTubePlaylistItem[] = [];
  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const selectedTab = tabs.find((t: any) => t.tabRenderer?.selected)?.tabRenderer;
  const gridItems =
    selectedTab?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.gridRenderer?.items ||
    selectedTab?.content?.richGridRenderer?.contents ||
    [];

  for (const entry of gridItems) {
    const item = entry?.richItemRenderer?.content || entry;
    if (item?.lockupViewModel) {
      const lvm = item.lockupViewModel;
      const id = lvm.contentId;
      if (!id) continue;
      const title = lvm.metadata?.lockupMetadataViewModel?.title?.content || 'Playlist';
      const sources = lvm.contentImage?.collectionThumbnailViewModel?.primaryThumbnail?.thumbnailViewModel?.image?.sources || [];
      const thumbnail = sources[sources.length - 1]?.url || '';
      const badge =
        lvm.contentImage?.collectionThumbnailViewModel?.primaryThumbnail?.thumbnailViewModel?.overlays?.[0]
          ?.thumbnailOverlayBadgeViewModel?.thumbnailBadges?.[0]?.thumbnailBadgeViewModel?.text || '';
      playlists.push({
        id,
        title,
        videoCount: badge,
        thumbnail,
        url: `https://www.youtube.com/playlist?list=${id}`,
      });
    } else if (item?.gridPlaylistRenderer) {
      const gpr = item.gridPlaylistRenderer;
      const id = gpr.playlistId;
      if (!id) continue;
      playlists.push({
        id,
        title: gpr.title?.runs?.[0]?.text || 'Playlist',
        videoCount: gpr.videoCountShortText?.simpleText || '',
        thumbnail: gpr.thumbnail?.thumbnails?.slice(-1)[0]?.url || '',
        url: `https://www.youtube.com/playlist?list=${id}`,
      });
    }
  }
  return playlists;
}

async function fetchChannelFeed(channelInput: string): Promise<ChannelFeedPayload> {
  const channelId = await resolveChannelId(channelInput || DEFAULT_CHANNEL_ID);
  const cached = channelCache.get(channelId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  // Optional YouTube Data API v3 path if user configures YOUTUBE_API_KEY
  const ytApiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (ytApiKey) {
    try {
      const chRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelId}&key=${ytApiKey}`
      );
      const chJson: any = await chRes.json();
      const chItem = chJson.items?.[0];
      const uploadsPlaylistId = chItem?.contentDetails?.relatedPlaylists?.uploads;
      if (uploadsPlaylistId) {
        const plRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=24&playlistId=${uploadsPlaylistId}&key=${ytApiKey}`
        );
        const plJson: any = await plRes.json();
        const videos: YouTubeVideoItem[] = (plJson.items || []).map((item: any) => {
          const vid = item.snippet?.resourceId?.videoId;
          const title = item.snippet?.title || 'Untitled';
          return {
            id: vid,
            title,
            thumbnail:
              item.snippet?.thumbnails?.high?.url ||
              item.snippet?.thumbnails?.medium?.url ||
              `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
            publishedAt: new Date(item.snippet?.publishedAt).toLocaleDateString(),
            duration: '',
            views: '',
            type: 'video',
            category: categorizeTitle(title, false),
            url: `https://www.youtube.com/watch?v=${vid}`,
          };
        });
        const payload: ChannelFeedPayload = {
          channelId,
          channelTitle: chItem?.snippet?.title || 'The Authentic Sunnah',
          channelHandle: chItem?.snippet?.customUrl || '@TheAuthenticSunnah',
          channelUrl: `https://www.youtube.com/channel/${channelId}`,
          videos,
          shorts: [],
          playlists: [],
          fetchedAt: new Date().toISOString(),
        };
        channelCache.set(channelId, { expiresAt: Date.now() + 15 * 60 * 1000, data: payload });
        return payload;
      }
    } catch {
      // Fall through to public channel page extraction
    }
  }

  const [videosHtml, shortsHtml, playlistsHtml] = await Promise.all([
    fetch(`https://www.youtube.com/channel/${channelId}/videos`, { headers }).then((r) => r.text()),
    fetch(`https://www.youtube.com/channel/${channelId}/shorts`, { headers }).then((r) => r.text()),
    fetch(`https://www.youtube.com/channel/${channelId}/playlists`, { headers }).then((r) => r.text()),
  ]);

  const videosData = extractYtInitialData(videosHtml);
  const shortsData = extractYtInitialData(shortsHtml);
  const playlistsData = extractYtInitialData(playlistsHtml);

  const channelTitle =
    videosData?.metadata?.channelMetadataRenderer?.title || 'The Authentic Sunnah';
  const channelHandle =
    videosData?.metadata?.channelMetadataRenderer?.vanityChannelUrl?.split('/').pop() ||
    '@TheAuthenticSunnah';

  const videos = videosData ? parseVideosFromData(videosData) : [];
  const shorts = shortsData ? parseShortsFromData(shortsData).slice(0, 24) : [];
  const playlists = playlistsData ? parsePlaylistsFromData(playlistsData) : [];

  const payload: ChannelFeedPayload = {
    channelId,
    channelTitle,
    channelHandle,
    channelUrl: `https://www.youtube.com/channel/${channelId}`,
    videos,
    shorts,
    playlists,
    fetchedAt: new Date().toISOString(),
  };

  channelCache.set(channelId, { expiresAt: Date.now() + 15 * 60 * 1000, data: payload });
  return payload;
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'The Authentic Sunnah' });
  });

  app.get('/api/youtube/channel', async (req, res) => {
    try {
      const channelInput =
        typeof req.query.channelId === 'string' && req.query.channelId.trim()
          ? req.query.channelId.trim()
          : DEFAULT_CHANNEL_ID;
      const data = await fetchChannelFeed(channelInput);
      res.json(data);
    } catch (error) {
      res.status(502).json({
        error: 'Unable to fetch YouTube channel feed right now.',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  app.get('/api/tafsir/:ayahKey', async (req, res) => {
    try {
      const ayahKey = req.params.ayahKey;
      const resourceId = req.query.resourceId === '160' ? '160' : '169';
      if (!/^\d+:\d+$/.test(ayahKey)) {
        res.status(400).json({ error: 'Invalid ayah key format. Expected surah:ayah.' });
        return;
      }
      const cacheKey = `${resourceId}:${ayahKey}`;
      const cached = tafsirCache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) {
        res.json(cached.data);
        return;
      }
      const upstream = await fetch(`https://api.quran.com/api/v4/tafsirs/${resourceId}/by_ayah/${ayahKey}`);
      if (!upstream.ok) {
        res.status(upstream.status).json({ error: 'Failed to load Tafsir Ibn Kathir.' });
        return;
      }
      const json = await upstream.json();
      tafsirCache.set(cacheKey, { expiresAt: Date.now() + 60 * 60 * 1000, data: json });
      res.json(json);
    } catch (error) {
      res.status(502).json({
        error: 'Unable to reach Tafsir service.',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  app.post('/api/sunnah-ai/chat', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      if (!apiKey) {
        res.status(503).json({
          error: 'Live Sunnah AI service is not configured yet (missing server GEMINI_API_KEY).',
        });
        return;
      }

      const rawMessages: unknown[] = Array.isArray(req.body?.messages)
        ? (req.body.messages as unknown[])
        : [];
      const languagePref =
        typeof req.body?.language === 'string' ? req.body.language : 'english';

      const sanitizedMessages: { role: 'user' | 'model'; text: string }[] = rawMessages
        .filter(
          (m: unknown): m is { role: 'user' | 'model'; text: string } =>
            Boolean(m) &&
            typeof m === 'object' &&
            ((m as { role?: string }).role === 'user' ||
              (m as { role?: string }).role === 'model') &&
            typeof (m as { text?: string }).text === 'string' &&
            (m as { text: string }).text.trim().length > 0
        )
        .slice(-12);

      if (sanitizedMessages.length === 0) {
        res.status(400).json({ error: 'Please provide a question for Sunnah AI.' });
        return;
      }

      const languageGuidance =
        languagePref === 'urdu'
          ? 'Respond primarily in clear, scholarly Urdu (اردو) while keeping exact Quranic/Arabic terms transliterated or cleanly written where helpful.'
          : languagePref === 'roman_urdu'
            ? 'Respond primarily in clear, respectful Roman Urdu (Latin script) while citing exact Surah:Ayah and verified Hadith books.'
            : languagePref === 'both'
              ? 'Provide the complete structured answer in crisp English first, followed by a concise Urdu (اردو) summary of the ruling and evidences.'
              : 'Respond in clear, respectful English.';

      const systemInstruction = `You are "Sunnah AI", an authentic, orthodox Sunni Islamic scholar-assistant integrated inside "The Authentic Sunnah" application.
NEVER mention Google, Gemini, AI models, APIs, or technology providers. Your sole identity is Sunnah AI.

Scope:
- Answer EVERY Islamic question asked by the user sincerely and comprehensively—including foundational Aqeedah ("Who is Allah?", Tawheed, Names & Attributes, Angels, Revealed Books, Prophets, Qadr, Akhirah), Fiqh & Worship (Wudu, Salah, Zakah, Fasting, Hajj), Seerah, Hadith explanations, daily manners, family life, Islamic finance, repentance, and contemporary doubts.

Strict Scholarly Rules:
- Cite ONLY authentic, verifiable sources: exact Quran references (Surah Name Chapter:Verse) and verified Hadith books (Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami' at-Tirmidhi, Sunan an-Nasa'i, Sunan Ibn Majah, Muwatta Malik, 40 Hadith Nawawi, Hadith Qudsi). Never fabricate a Hadith number; if unsure of an exact number, cite the verified book and chapter honestly.
- Do NOT issue personal binding fatwas for complex individual disputes, divorce, inheritance, or oaths; explain general scholarly principles with humility.
- Maintain utmost reverence and Adab toward Allah, Prophet Muhammad (ﷺ), his Companions, the Salaf as-Salih, and the Four Great Imams.

Language Instruction:
${languageGuidance}

MANDATORY RESPONSE STRUCTURE (always include these headings in every answer):

### 1. Direct Answer from Quran & Authentic Sunnah
Provide a clear, thorough answer grounded in Quran verses (Surah:Ayah) and authentic Hadith.

### 2. Understanding of the Salaf as-Salih
Explain how the Companions (Sahabah), Tabi'un, and classical Sunni scholars (such as Imam Ahmad, al-Bukhari, Ibn Kathir, Ibn Taymiyyah, and Ibn al-Qayyim) understood and practiced this matter.

### 3. Views of the Four Imams
Summarize consensus (Ijma') across the Hanafi, Maliki, Shafi'i, and Hanbali schools, and explain any recognized scholarly differences where applicable.

### 4. Adab & Closing Note
Close gently with "Wallahu A'lam (And Allah knows best)." and encourage consulting a qualified local scholar for personal situation-specific rulings.`;

      const contents = sanitizedMessages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text.trim() }],
      }));

      const wantsStream = Boolean(req.body?.stream);
      const candidateModels = ['gemini-2.5-flash', 'gemini-4-hydrogen', 'gemini-3.1-flash-lite'];

      if (wantsStream) {
        let streamedSuccessfully = false;
        let lastError: unknown = null;

        for (const modelName of candidateModels) {
          for (let attempt = 0; attempt < 2; attempt++) {
            let headersSent = false;
            try {
              const streamResult = await ai.models.generateContentStream({
                model: modelName,
                contents,
                config: {
                  systemInstruction,
                },
              });

              for await (const chunk of streamResult) {
                const piece = chunk.text;
                if (!piece) continue;
                if (!headersSent) {
                  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
                  res.setHeader('Cache-Control', 'no-cache, no-transform');
                  res.setHeader('Connection', 'keep-alive');
                  res.flushHeaders?.();
                  headersSent = true;
                }
                res.write(`data: ${JSON.stringify({ chunk: piece })}\n\n`);
                streamedSuccessfully = true;
              }

              if (streamedSuccessfully) {
                res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
                res.end();
                return;
              }
            } catch (err: unknown) {
              lastError = err;
              if (headersSent) {
                res.write(
                  `data: ${JSON.stringify({ error: 'Stream interrupted.' })}\n\n`
                );
                res.end();
                return;
              }
              const errObj = err as { status?: number };
              if (errObj?.status === 400 || errObj?.status === 403) {
                break;
              }
              await new Promise((r) => setTimeout(r, 300 * Math.pow(2, attempt)));
            }
          }
        }

        const errObj = lastError as { status?: number; message?: string };
        const status =
          typeof errObj?.status === 'number' && errObj.status >= 400 ? errObj.status : 503;
        res.status(status).json({
          error:
            errObj?.message ||
            'Sunnah AI streaming service is temporarily busy. Please retry in a moment.',
        });
        return;
      }

      // Non-streaming JSON mode fallback
      let replyText = '';
      let lastError: unknown = null;

      for (const modelName of candidateModels) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents,
              config: {
                systemInstruction,
              },
            });
            const text = response.text?.trim();
            if (text) {
              replyText = text;
              break;
            }
          } catch (err: unknown) {
            lastError = err;
            const errObj = err as { status?: number };
            if (errObj?.status === 400 || errObj?.status === 403) {
              break;
            }
            const delayMs = 300 * Math.pow(2, attempt);
            await new Promise((r) => setTimeout(r, delayMs));
          }
        }
        if (replyText) break;
      }

      if (!replyText) {
        const errObj = lastError as { status?: number; message?: string };
        const status =
          typeof errObj?.status === 'number' && errObj.status >= 400 ? errObj.status : 503;
        res.status(status).json({
          error:
            errObj?.message ||
            'Sunnah AI upstream service is temporarily busy. Please retry in a moment.',
        });
        return;
      }

      res.json({ reply: replyText });
    } catch (error: unknown) {
      const errObj = error as { status?: number; message?: string };
      const status = typeof errObj?.status === 'number' && errObj.status >= 400 ? errObj.status : 502;
      if (!res.headersSent) {
        res.status(status).json({
          error: errObj?.message || 'Unable to process Sunnah AI request right now.',
        });
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        allowedHosts: true,
        ws: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`The Authentic Sunnah server running on http://localhost:${PORT}`);
  });
}

startServer();
