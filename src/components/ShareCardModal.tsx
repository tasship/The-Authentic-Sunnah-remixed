import React, { useEffect, useState } from 'react';
import { Check, Download, Loader2, Palette, Share2, Sparkles, X } from 'lucide-react';
import {
  CARD_TEMPLATES,
  CardTemplateId,
  generateShareCardAssets,
  ShareCardPayload,
} from '../utils/shareCardGenerator';

interface ShareCardModalProps {
  payload: ShareCardPayload | null;
  onClose: () => void;
}

const TEMPLATE_OPTIONS: { id: CardTemplateId; label: string; previewBg: string }[] = [
  { id: 'matte_obsidian', label: 'Matte Obsidian', previewBg: '#09090B' },
  { id: 'velvet_slate', label: 'Velvet Slate', previewBg: '#0B132B' },
  { id: 'brushed_parchment', label: 'Brushed Parchment', previewBg: '#F5EFE6' },
];

export const ShareCardModal: React.FC<ShareCardModalProps> = ({ payload, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplateId>('matte_obsidian');
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!payload) {
      setDataUrl(null);
      setBlob(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setStatusMessage(null);

    generateShareCardAssets({ ...payload, templateId: selectedTemplate })
      .then((res) => {
        if (cancelled) return;
        setDataUrl(res.dataUrl);
        setBlob(res.blob);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Unable to generate image card.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [payload, selectedTemplate]);

  if (!payload) return null;

  const fileSlug = (payload.filenameSlug || payload.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  const fileName = `the-authentic-sunnah-${selectedTemplate}-${fileSlug || 'card'}.png`;

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatusMessage('Card saved as PNG image.');
  };

  const handleNativeShare = async () => {
    if (!blob) return;
    try {
      const file = new File([blob], fileName, { type: 'image/png' });
      const nav = navigator as Navigator & {
        canShare?: (data?: ShareData) => boolean;
      };
      if (nav.share && (!nav.canShare || nav.canShare({ files: [file] }))) {
        await nav.share({
          title: `${payload.title} · The Authentic Sunnah`,
          text: `${payload.translationText}\n— ${payload.reference}`,
          files: [file],
        });
        setStatusMessage('Shared successfully as Sadaqah Jariyah.');
        return;
      }
      if (nav.share) {
        await nav.share({
          title: `${payload.title} · The Authentic Sunnah`,
          text: `${payload.translationText}\n— ${payload.reference}\n\n${window.location.origin}`,
          url: window.location.origin,
        });
        setStatusMessage('Text & link shared.');
        return;
      }
    } catch {
      // User dismissed share sheet or browser does not support file sharing
    }
    handleDownload();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Studio-Grade Shareable Image Card"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md max-h-[92vh] flex flex-col rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/45 bg-[#141417] text-[#FAF6EB] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <div>
              <h3 className="font-display text-base font-bold text-[#F3E5AB]">
                Studio-Grade Share Card
              </h3>
              <p className="text-[11px] text-[#CEC5AD]">
                Select aesthetic template &amp; download high-res PNG
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Share Card Modal"
            className="min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center text-[#CEC5AD] hover:text-[#FAF6EB] hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Aesthetic Template Switcher */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#CEC5AD]">
              <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Aesthetic Card Template</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {TEMPLATE_OPTIONS.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`min-h-[42px] px-2 py-1.5 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    selectedTemplate === tmpl.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F3E5AB] shadow-sm'
                      : 'border-[#D4AF37]/20 bg-[#1B1B20] text-[#CEC5AD] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span
                    className="w-4 h-2 rounded-full border border-white/20"
                    style={{ backgroundColor: tmpl.previewBg }}
                  />
                  <span className="truncate w-full text-center">{tmpl.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* High-Resolution Live Canvas Card Preview */}
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#09090B] p-2 flex items-center justify-center min-h-[290px]">
            {loading ? (
              <div className="flex flex-col items-center gap-2 text-xs text-[#CEC5AD] py-12">
                <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin" />
                <span>Crafting high-resolution card...</span>
              </div>
            ) : error ? (
              <p className="text-xs text-amber-200 text-center px-4 py-8">{error}</p>
            ) : dataUrl ? (
              <img
                src={dataUrl}
                alt={`${payload.title} shareable card`}
                className="w-full max-h-[50vh] object-contain rounded-xl shadow-lg"
              />
            ) : null}
          </div>

          {statusMessage && (
            <p className="text-xs text-center font-medium text-[#F3E5AB] inline-flex items-center justify-center gap-1.5 w-full">
              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{statusMessage}</span>
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!dataUrl || loading}
              className="min-h-[46px] px-4 rounded-xl border border-[#D4AF37]/45 bg-[#1B1B20] text-[#F3E5AB] text-xs sm:text-sm font-semibold hover:border-[#D4AF37] disabled:opacity-45 inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>

            <button
              type="button"
              onClick={handleNativeShare}
              disabled={!blob || loading}
              className="min-h-[46px] px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C665] text-[#09090B] text-xs sm:text-sm font-bold hover:brightness-105 disabled:opacity-45 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
