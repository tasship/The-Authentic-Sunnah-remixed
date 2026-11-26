import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-5 left-4 z-50 flex items-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#141417] px-3.5 py-2 text-xs font-medium text-[#F3E5AB] shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#D4AF37]" />
      <span>Offline Mode · IndexedDB &amp; cached library active</span>
    </div>
  );
};
