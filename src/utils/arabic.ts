/**
 * Counts true Arabic alphabet letters in Uthmani/standard Arabic text,
 * excluding harakat/diacritics, spaces, and Quranic stop marks.
 * Based on Jami' at-Tirmidhi (2910): every letter recited carries 10 Hasanat.
 */
export function countArabicLetters(text: string): number {
  if (!text) return 0;
  // Match standard Arabic letters (Alef through Ya + Alef Wasla + Hamza forms + Teh Marbuta + Alef Maksura)
  const matches = text.match(/[\u0621-\u063A\u0641-\u064A\u0671]/g);
  return matches ? matches.length : 0;
}

export function calculateHasanat(text: string): number {
  return countArabicLetters(text) * 10;
}

const ARABIC_INDIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toArabicIndic(num: number): string {
  return String(num)
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0) - 48;
      return code >= 0 && code <= 9 ? ARABIC_INDIC_DIGITS[code] : ch;
    })
    .join('');
}

export function stripBom(text: string): string {
  return text.replace(/^\uFEFF/, '').trim();
}

export function getTodayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatHijriDate(date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    try {
      return new Intl.DateTimeFormat('en-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return '';
    }
  }
}

export function formatGregorianDate(date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatDurationMMSS(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
