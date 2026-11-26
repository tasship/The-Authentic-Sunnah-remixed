# Security Specification — The Authentic Sunnah (Anonymous Telemetry & Global Ticker)

## 1. Data Invariants
1. **Zero PII Policy:** Neither `/installations/{installId}`, `/feature_stats/{featureId}`, nor `/community_stats/{statsId}` may ever accept `email`, `phone`, `name`, `ip`, or user credentials. Strict key allowlists (`keys().hasOnly(...)`) reject any extra shadow or PII fields.
2. **Path & ID Integrity:** Document IDs (`installId`, `featureId`, `statsId`) must pass `isValidId()` (`^[a-zA-Z0-9_\-]+$`, `<= 128` chars), and incoming `installId` / `featureId` must strictly equal their path parameters (`installId`, `featureId`).
3. **No Bulk Collection Scraping:** `allow list: if false;` on all collections (`installations`, `feature_stats`, `community_stats`) ensures clients can never enumerate device IDs or bulk-read arbitrary collections. Only direct `get` on known singleton/owned document IDs is permitted.
4. **Server-Enforced Temporal Integrity:** `lastActiveAt` and `updatedAt` MUST equal `request.time` on every write (`create` and `update`). Client-forged timestamps are rejected.
5. **Bounded Monotonic Counters:**
   - `feature_stats`: `create` requires `count == 1`; `update` requires `count == existing().count + 1` and `affectedKeys().hasOnly(['count', 'updatedAt'])`.
   - `community_stats/global`: `statsId` must equal `'global'`. Updates can only bump `versesRecitedToday` by `0..50` (same day) or reset cleanly on new `dayKey`, bump `totalVersesAllTime` by `0..50`, and keep `activeNowCount` within `1..100000`.
6. **Optional Read Connection Check:** `/test/connection` allows single-document `get` (`allow list: if false;`) exclusively for startup `testConnection()` verification, with zero write access (`allow write: if false;`).

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Ghost Admin Field:** `{ "installId": "uuid-1234", "region": "NA", "timezone": "UTC", "preferredTheme": "obsidian_black", "preferredReciter": "yasser_dosari", "platform": "pwa", "lastActiveAt": "request.time", "isAdmin": true }` -> Rejected by `hasOnly(...)`.
2. **PII Injection (`email`):** Adding `"email": "user@example.com"` on `/installations/uuid-1234` -> Rejected by `hasOnly(...)`.
3. **Spoofed Install ID Mismatch:** Writing `{ "installId": "other-id", ... }` to `/installations/uuid-1234` -> Rejected by `incoming().installId == installId`.
4. **1.5KB Junk ID Poisoning:** Targeting `/installations/<1500-char-junk>` -> Rejected by `isValidId(installId)`.
5. **Client-Spoofed Timestamp:** `{ ..., "lastActiveAt": "1999-01-01T00:00:00Z" }` -> Rejected by `incoming().lastActiveAt == request.time`.
6. **Invalid Theme Enum:** `{ ..., "preferredTheme": "<script>alert(1)</script>" }` -> Rejected by enum allowlist + size guard.
7. **Feature Counter Manipulation on Create:** Writing `{ "featureId": "reciter_saud", "category": "reciter", "count": 999999, "updatedAt": "request.time" }` -> Rejected by `incoming().count == 1`.
8. **Feature Counter Decrement / Jump on Update:** Updating `count` from `10` to `1000` or `5` -> Rejected by `incoming().count == existing().count + 1`.
9. **Unauthorized Community Stats Path:** Writing to `/community_stats/spoofed` -> Rejected by `statsId == 'global'`.
10. **Ticker Inflation Attack:** Updating `/community_stats/global` with `versesRecitedToday = existing().versesRecitedToday + 50000` -> Rejected by `<= existing().versesRecitedToday + 50`.
11. **Collection Enumeration (`list`):** Executing `getDocs(collection(db, 'installations'))` -> Rejected by `allow list: if false;`.
12. **Mutating Immutable `installId` / `featureId` / `category`:** Attempting to change `category` during update -> Rejected by `affectedKeys().hasOnly(...)` + immutable checks.
