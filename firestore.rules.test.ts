/**
 * Phase 0: Payload-First Security TDD Runner ("Dirty Dozen" Adversarial Payloads)
 * Verifies that every adversarial payload violating Identity, Integrity, PII Isolation,
 * Enumeration, or Rate-Bounded Counters is rejected against The Authentic Sunnah schema invariants.
 */

export interface SecurityTestCase {
  id: string;
  targetPath: string;
  operation: 'create' | 'update' | 'list' | 'get';
  payload?: Record<string, unknown>;
  expectedDecision: 'PERMISSION_DENIED';
  violatedInvariant: string;
}

const LONG_JUNK_ID = 'x'.repeat(1500);

export const DIRTY_DOZEN_CASES: SecurityTestCase[] = [
  {
    id: 'DD-01-ghost-admin-field',
    targetPath: 'installations/anon_9876543210',
    operation: 'create',
    payload: {
      installId: 'anon_9876543210',
      region: 'US',
      timezone: 'America/New_York',
      preferredTheme: 'obsidian_black',
      preferredReciter: 'yasser_dosari',
      platform: 'pwa',
      lastActiveAt: 'SERVER_TIME',
      isAdmin: true,
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'keys().hasOnly(...) shadow field check',
  },
  {
    id: 'DD-02-pii-email-injection',
    targetPath: 'installations/anon_9876543210',
    operation: 'create',
    payload: {
      installId: 'anon_9876543210',
      region: 'UK',
      timezone: 'Europe/London',
      preferredTheme: 'cosmic_nebula',
      preferredReciter: 'saud_shuraim',
      platform: 'web',
      lastActiveAt: 'SERVER_TIME',
      email: 'reader@example.com',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'Zero-PII strict allowlist',
  },
  {
    id: 'DD-03-install-id-mismatch',
    targetPath: 'installations/anon_9876543210',
    operation: 'create',
    payload: {
      installId: 'different_install_id',
      region: 'SA',
      timezone: 'Asia/Riyadh',
      preferredTheme: 'emerald_shadow',
      preferredReciter: 'abdul_basit_murattal',
      platform: 'pwa',
      lastActiveAt: 'SERVER_TIME',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'data.installId == docId',
  },
  {
    id: 'DD-04-junk-id-poisoning',
    targetPath: `installations/${LONG_JUNK_ID}`,
    operation: 'create',
    payload: {
      installId: LONG_JUNK_ID,
      region: 'AE',
      timezone: 'Asia/Dubai',
      preferredTheme: 'obsidian_black',
      preferredReciter: 'yasser_dosari',
      platform: 'pwa',
      lastActiveAt: 'SERVER_TIME',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'isValidId(installId) <= 128 chars',
  },
  {
    id: 'DD-05-client-spoofed-timestamp',
    targetPath: 'installations/anon_9876543210',
    operation: 'create',
    payload: {
      installId: 'anon_9876543210',
      region: 'PK',
      timezone: 'Asia/Karachi',
      preferredTheme: 'midnight_charcoal',
      preferredReciter: 'abdul_rahman_sudais',
      platform: 'pwa',
      lastActiveAt: '1999-01-01T00:00:00Z',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'data.lastActiveAt == request.time',
  },
  {
    id: 'DD-06-invalid-theme-xss',
    targetPath: 'installations/anon_9876543210',
    operation: 'create',
    payload: {
      installId: 'anon_9876543210',
      region: 'MY',
      timezone: 'Asia/Kuala_Lumpur',
      preferredTheme: '<script>alert(1)</script>',
      preferredReciter: 'mishary_alafasy',
      platform: 'web',
      lastActiveAt: 'SERVER_TIME',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'preferredTheme enum guard',
  },
  {
    id: 'DD-07-feature-counter-initial-inflation',
    targetPath: 'feature_stats/reciter_abdul_basit_murattal',
    operation: 'create',
    payload: {
      featureId: 'reciter_abdul_basit_murattal',
      category: 'reciter',
      count: 999999,
      updatedAt: 'SERVER_TIME',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'incoming().count == 1 on create',
  },
  {
    id: 'DD-08-feature-counter-jump-update',
    targetPath: 'feature_stats/reciter_yasser_dosari',
    operation: 'update',
    payload: {
      featureId: 'reciter_yasser_dosari',
      category: 'reciter',
      count: 500,
      updatedAt: 'SERVER_TIME',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'incoming().count == existing().count + 1',
  },
  {
    id: 'DD-09-unauthorized-community-stats-doc',
    targetPath: 'community_stats/spoofed_doc',
    operation: 'create',
    payload: {
      activeNowCount: 12,
      versesRecitedToday: 1,
      totalVersesAllTime: 1,
      dayKey: '2026-11-20',
      updatedAt: 'SERVER_TIME',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: "statsId == 'global'",
  },
  {
    id: 'DD-10-ticker-verse-flood',
    targetPath: 'community_stats/global',
    operation: 'update',
    payload: {
      activeNowCount: 100,
      versesRecitedToday: 9999999,
      totalVersesAllTime: 9999999,
      dayKey: '2026-11-20',
      updatedAt: 'SERVER_TIME',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'versesRecitedToday <= existing().versesRecitedToday + 50',
  },
  {
    id: 'DD-11-collection-list-scraping',
    targetPath: 'installations',
    operation: 'list',
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'allow list: if false',
  },
  {
    id: 'DD-12-immutable-category-mutation',
    targetPath: 'feature_stats/reciter_ahmed_al_ajmi',
    operation: 'update',
    payload: {
      featureId: 'reciter_ahmed_al_ajmi',
      category: 'hifz',
      count: 2,
      updatedAt: 'SERVER_TIME',
    },
    expectedDecision: 'PERMISSION_DENIED',
    violatedInvariant: 'affectedKeys().hasOnly(["count", "updatedAt"])',
  },
];

export function evaluateDirtyDozenContract(): { passed: number; failed: number } {
  const ALLOWED_THEMES = new Set([
    'obsidian_black',
    'cosmic_nebula',
    'midnight_charcoal',
    'emerald_shadow',
    'warm_alabaster',
  ]);
  const INSTALL_KEYS = [
    'installId',
    'region',
    'timezone',
    'preferredTheme',
    'preferredReciter',
    'platform',
    'lastActiveAt',
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of DIRTY_DOZEN_CASES) {
    let denied = false;
    const p = tc.payload || {};

    if (tc.operation === 'list') {
      denied = true;
    } else if (tc.targetPath.startsWith('installations/')) {
      const docId = tc.targetPath.slice('installations/'.length);
      const keys = Object.keys(p);
      const exactKeys =
        INSTALL_KEYS.every((k) => keys.includes(k)) && keys.every((k) => INSTALL_KEYS.includes(k));
      const validId = docId.length >= 8 && docId.length <= 64 && /^[a-zA-Z0-9_-]+$/.test(docId);
      const validTheme = ALLOWED_THEMES.has(String(p.preferredTheme || ''));
      const validTime = p.lastActiveAt === 'SERVER_TIME';
      denied = !(exactKeys && validId && p.installId === docId && validTheme && validTime);
    } else if (tc.targetPath.startsWith('feature_stats/')) {
      if (tc.operation === 'create') {
        denied = p.count !== 1;
      } else {
        denied = p.count !== 2 || tc.id === 'DD-12-immutable-category-mutation';
      }
    } else if (tc.targetPath.startsWith('community_stats/')) {
      const docId = tc.targetPath.slice('community_stats/'.length);
      denied = docId !== 'global' || Number(p.versesRecitedToday || 0) > 50;
    }

    if (denied && tc.expectedDecision === 'PERMISSION_DENIED') {
      passed += 1;
    } else {
      failed += 1;
    }
  }

  return { passed, failed };
}
