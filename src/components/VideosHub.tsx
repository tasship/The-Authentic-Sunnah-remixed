import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Play, RefreshCw, Search, WifiOff, Youtube } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { fetchYouTubeChannelFeed } from '../services/youtubeApi';
import { ReaderSettings, YouTubeChannelFeed, YouTubeVideo } from '../types';
import { VideoPlayerModal } from './VideoPlayerModal';

interface VideosHubProps {
  settings: ReaderSettings;
  onOpenSettings: () => void;
}

type CategoryFilter = 'All' | 'Lectures' | 'Shorts' | 'Quran Tafsir' | 'Authentic Hadith' | 'Reminders';

export const VideosHub: React.FC<VideosHubProps> = ({ settings, onOpenSettings }) => {
  const isOnline = useOnlineStatus();
  const [feed, setFeed] = useState<YouTubeChannelFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const loadFeed = async () => {
    if (!isOnline) {
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchYouTubeChannelFeed(settings.youtubeChannelId);
      setFeed(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to fetch YouTube channel uploads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [settings.youtubeChannelId, isOnline]);

  const allItems = useMemo(() => {
    if (!feed) return [];
    return [...feed.videos, ...feed.shorts];
  }, [feed]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (category === 'Lectures' && item.type !== 'video') return false;
      if (category === 'Shorts' && item.type !== 'short') return false;
      if (
        category !== 'All' &&
        category !== 'Lectures' &&
        category !== 'Shorts' &&
        item.category !== category
      ) {
        return false;
      }
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allItems, category, search]);

  const categories: CategoryFilter[] = [
    'All',
    'Lectures',
    'Shorts',
    'Quran Tafsir',
    'Authentic Hadith',
    'Reminders',
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Channel Banner */}
      <section className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#0A3321] to-[#062115] text-[#FAF6EB] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/pwa-192x192.png"
            alt="The Authentic Sunnah Channel"
            className="w-14 h-14 rounded-2xl border border-[#D4AF37]/50 object-cover shrink-0"
          />
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB]">
              {feed?.channelTitle || 'The Authentic Sunnah'}
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD] mt-0.5">
              {feed?.channelHandle || '@TheAuthenticSunnah'} · Quran Reminders, Authentic Hadith & Lectures
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={feed?.channelUrl || `https://www.youtube.com/channel/${settings.youtubeChannelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] font-semibold text-xs sm:text-sm hover:bg-[#F3E5AB] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Youtube className="w-4 h-4" />
            <span>Visit Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onOpenSettings}
            className="min-h-[44px] px-3.5 py-2 rounded-xl border border-[#D4AF37]/35 text-xs font-medium text-[#F3E5AB] hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Channel Config
          </button>
        </div>
      </section>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#365645] dark:text-[#CEC5AD]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lectures, reminders, shorts..."
            className="w-full min-h-[44px] pl-10 pr-4 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-sm text-[#092A1B] dark:text-[#FAF6EB] placeholder:text-[#365645]/60 dark:placeholder:text-[#CEC5AD]/50 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                category === cat
                  ? 'bg-[#D4AF37] text-[#04180F]'
                  : 'bg-white dark:bg-[#062115] border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Playlists Section */}
      {!loading && feed && feed.playlists.length > 0 && category === 'All' && !search.trim() && (
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
            Channel Playlists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feed.playlists.map((pl) => (
              <a
                key={pl.id}
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-3 flex items-center gap-3.5 hover:border-[#D4AF37] transition-colors"
              >
                <div className="w-24 aspect-video rounded-xl overflow-hidden bg-[#0A3321] shrink-0">
                  {pl.thumbnail ? (
                    <img
                      src={pl.thumbnail}
                      alt={pl.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#D4AF37]">
                      <Youtube className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB] truncate group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB]">
                    {pl.title}
                  </h3>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-1">
                    {pl.videoCount || 'YouTube Playlist'}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Video Grid */}
      {!isOnline ? (
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#141417] p-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
            <WifiOff className="w-6 h-6" />
          </div>
          <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
            YouTube Feed Unavailable Offline
          </h2>
          <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD] max-w-md mx-auto">
            Video streaming requires an active internet connection. Your Cached Quran Surahs, Hifz Tracker, Adhkar, Duas, Seerah &amp; Aqeedah remain available offline.
          </p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#D4AF37]/15 bg-white dark:bg-[#062115] p-3 animate-pulse space-y-3"
            >
              <div className="aspect-video w-full rounded-xl bg-[#F2EDE0] dark:bg-[#0A3321]" />
              <div className="h-4 bg-[#F2EDE0] dark:bg-[#0A3321] rounded w-5/6" />
              <div className="h-3 bg-[#F2EDE0] dark:bg-[#0A3321] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#062115] p-6 text-center space-y-3">
          <p className="text-sm text-[#365645] dark:text-[#CEC5AD]">{error}</p>
          <button
            onClick={loadFeed}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Feed
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-8 text-center">
          <p className="text-sm text-[#365645] dark:text-[#CEC5AD]">
            No videos matched your search or filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((video) => (
            <button
              key={`${video.type}-${video.id}`}
              onClick={() => setSelectedVideo(video)}
              className="group text-left rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] overflow-hidden hover:border-[#D4AF37] transition-colors flex flex-col cursor-pointer"
            >
              <div className="relative aspect-video w-full bg-[#04180F] overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="w-12 h-12 rounded-full bg-[#D4AF37]/95 text-[#04180F] flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </span>
                </div>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[#FAF6EB] text-[11px] font-medium tabular-nums">
                    {video.duration}
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB] line-clamp-2 group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] transition-colors">
                  {video.title}
                </h3>
                <p className="mt-2 text-xs text-[#365645] dark:text-[#CEC5AD]">
                  {video.category}
                  {video.views ? ` · ${video.views}` : ''}
                  {video.publishedAt && video.publishedAt !== 'Short' ? ` · ${video.publishedAt}` : ''}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
};
