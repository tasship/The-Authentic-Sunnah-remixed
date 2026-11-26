import React, { useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { YouTubeVideo } from '../types';

interface VideoPlayerModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [video, onClose]);

  if (!video) return null;

  const isShort = video.type === 'short';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div
        className={`w-full ${
          isShort ? 'max-w-sm' : 'max-w-4xl'
        } rounded-2xl border border-[#D4AF37]/35 bg-[#062115] text-[#FAF6EB] overflow-hidden shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-[#D4AF37]/20">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-[#FAF6EB] truncate">
              {video.title}
            </h3>
            <p className="text-xs text-[#CEC5AD] mt-0.5 truncate">
              The Authentic Sunnah · {video.category}
              {video.publishedAt ? ` · ${video.publishedAt}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#F3E5AB] hover:bg-white/10 transition-colors"
              title="Open on YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close video player"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#FAF6EB] hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={`w-full bg-black ${isShort ? 'aspect-[9/16] max-h-[75vh] mx-auto' : 'aspect-video'}`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
