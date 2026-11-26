import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'card';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    if (variant === 'card') {
      return (
        <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0A3321]/10 dark:bg-[#0A3321]/60 p-4 text-sm text-[#092A1B] dark:text-[#FAF6EB]">
          Installed on your device. Running in standalone app mode.
        </div>
      );
    }
    return null;
  }

  const handleTrigger = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowIOSGuide(true);
    }
  };

  if (variant === 'card') {
    return (
      <>
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#062115] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/pwa-192x192.png"
              alt="The Authentic Sunnah App Icon"
              className="w-12 h-12 rounded-xl border border-[#D4AF37]/40 shrink-0 object-cover"
            />
            <div>
              <h3 className="font-display text-base font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
                Install Home Screen App
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                Save The Authentic Sunnah for offline Quran reading and daily streak tracking.
              </p>
            </div>
          </div>
          <button
            onClick={handleTrigger}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#04180F] font-semibold text-sm hover:bg-[#F3E5AB] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {isInstallable ? 'Install App' : isIOS ? 'Install on iOS' : 'How to Install'}
          </button>
        </div>

        {showIOSGuide && <InstallGuideModal isIOS={isIOS} onClose={() => setShowIOSGuide(false)} />}
      </>
    );
  }

  // Compact sidebar/header button (always renders when installable or on iOS; hidden otherwise in compact bar to keep header clean)
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleTrigger}
        className="min-h-[40px] px-3.5 py-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/25 transition-colors flex items-center gap-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-[#B0891E] dark:text-[#D4AF37]" />
        <span>{isIOS ? 'Add to Home' : 'Install App'}</span>
      </button>

      {showIOSGuide && <InstallGuideModal isIOS={isIOS} onClose={() => setShowIOSGuide(false)} />}
    </>
  );
};

const InstallGuideModal: React.FC<{ isIOS: boolean; onClose: () => void }> = ({ isIOS, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
    onClick={onClose}
  >
    <div
      className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-[#D4AF37]/35 bg-[#F9F6EE] dark:bg-[#062115] p-6 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
          {isIOS ? 'Install on iPhone or iPad' : 'Install The Authentic Sunnah'}
        </h3>
        <button
          onClick={onClose}
          aria-label="Close install instructions"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#365645] dark:text-[#CEC5AD] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {isIOS ? (
        <ol className="mt-4 space-y-3 text-sm text-[#365645] dark:text-[#CEC5AD]">
          <li className="flex items-start gap-3">
            <span className="font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">1.</span>
            <span>
              Tap the <Share className="inline w-4 h-4 mx-0.5 text-[#D4AF37]" /> <strong>Share</strong> button in
              Safari&apos;s toolbar.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">2.</span>
            <span>
              Scroll down and tap <strong>Add to Home Screen</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">3.</span>
            <span>
              Tap <strong>Add</strong> to launch with the official crest icon.
            </span>
          </li>
        </ol>
      ) : (
        <p className="mt-4 text-sm text-[#365645] dark:text-[#CEC5AD] leading-relaxed">
          Open your browser menu (Chrome, Edge, or Brave) and select <strong>Install App</strong> or{' '}
          <strong>Add to Home Screen</strong> to use The Authentic Sunnah in full-screen standalone mode.
        </p>
      )}
      <button
        onClick={onClose}
        className="mt-6 w-full min-h-[44px] rounded-xl bg-[#D4AF37] text-[#04180F] font-semibold text-sm hover:bg-[#F3E5AB] transition-colors cursor-pointer"
      >
        Done
      </button>
    </div>
  </div>
);
