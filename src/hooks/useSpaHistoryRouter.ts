import { useCallback, useEffect, useRef } from 'react';
import { AppTab, ExploreModule, QuranSubMode } from '../types';

export interface SpaNavState {
  tab: AppTab;
  exploreModule: ExploreModule;
  quranSubMode: QuranSubMode;
}

interface HistoryPayload {
  tasNav: SpaNavState;
  seq: number;
}

export function useSpaHistoryRouter(
  current: SpaNavState,
  onRestore: (state: SpaNavState) => void
) {
  const onRestoreRef = useRef(onRestore);
  onRestoreRef.current = onRestore;

  const isPoppingRef = useRef(false);
  const seqRef = useRef(0);
  const currentRef = useRef(current);
  currentRef.current = current;

  useEffect(() => {
    const initial: HistoryPayload = {
      tasNav: currentRef.current,
      seq: 0,
    };
    try {
      window.history.replaceState(initial, '', window.location.href);
    } catch {
      // Ignore restricted history API contexts
    }

    const handlePopState = (event: PopStateEvent) => {
      const payload = event.state as Partial<HistoryPayload> | null;
      isPoppingRef.current = true;

      if (payload?.tasNav) {
        onRestoreRef.current(payload.tasNav);
      } else {
        // Prevent exiting app accidentally if user pressed back from a deep view without prior history
        const cur = currentRef.current;
        if (cur.tab !== 'home' || cur.exploreModule !== 'hub') {
          const homeState: SpaNavState = {
            tab: 'home',
            exploreModule: 'hub',
            quranSubMode: 'read',
          };
          onRestoreRef.current(homeState);
          try {
            seqRef.current += 1;
            window.history.pushState({ tasNav: homeState, seq: seqRef.current }, '', window.location.href);
          } catch {
            // ignore
          }
        }
      }

      window.setTimeout(() => {
        isPoppingRef.current = false;
      }, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const pushNavState = useCallback((next: SpaNavState) => {
    if (isPoppingRef.current) return;
    const prev = currentRef.current;
    if (
      prev.tab === next.tab &&
      prev.exploreModule === next.exploreModule &&
      prev.quranSubMode === next.quranSubMode
    ) {
      return;
    }

    try {
      seqRef.current += 1;
      const payload: HistoryPayload = { tasNav: next, seq: seqRef.current };
      const hashTab =
        next.tab === 'explore' && next.exploreModule !== 'hub'
          ? `#explore/${next.exploreModule}`
          : next.tab === 'quran' && next.quranSubMode !== 'read'
            ? `#quran/${next.quranSubMode}`
            : next.tab === 'home'
              ? ''
              : `#${next.tab}`;
      const nextUrl = `${window.location.pathname}${window.location.search}${hashTab}`;
      window.history.pushState(payload, '', nextUrl);
    } catch {
      // Ignore history pushState errors
    }
  }, []);

  return { pushNavState };
}
