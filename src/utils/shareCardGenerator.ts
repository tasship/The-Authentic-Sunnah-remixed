export type CardTemplateId = 'matte_obsidian' | 'velvet_slate' | 'brushed_parchment';

export interface ShareCardPayload {
  categoryLabel: string;
  title: string;
  arabicText?: string;
  translationText: string;
  urduText?: string;
  reference: string;
  filenameSlug?: string;
  templateId?: CardTemplateId;
}

export interface CardTemplateConfig {
  id: CardTemplateId;
  label: string;
  subtitle: string;
  bgColor: string;
  surfaceColor: string;
  borderOuter: string;
  borderInner: string;
  ornamentColor: string;
  brandTextColor: string;
  categoryTextColor: string;
  titleColor: string;
  arabicColor: string;
  translationColor: string;
  urduColor: string;
  referenceColor: string;
  footerTextColor: string;
  dividerColor: string;
  glowGradient?: {
    top: string;
    bottom: string;
  };
}

export const CARD_TEMPLATES: Record<CardTemplateId, CardTemplateConfig> = {
  matte_obsidian: {
    id: 'matte_obsidian',
    label: 'Matte Obsidian',
    subtitle: 'Pure OLED black & radiant metallic gold',
    bgColor: '#09090B',
    surfaceColor: '#111115',
    borderOuter: 'rgba(212, 175, 55, 0.65)',
    borderInner: 'rgba(212, 175, 55, 0.28)',
    ornamentColor: '#F3E5AB',
    brandTextColor: '#F3E5AB',
    categoryTextColor: 'rgba(212, 175, 55, 0.95)',
    titleColor: '#F3E5AB',
    arabicColor: '#F3E5AB',
    translationColor: '#FAF6EB',
    urduColor: '#CEC5AD',
    referenceColor: '#D4AF37',
    footerTextColor: '#9E9680',
    dividerColor: 'rgba(212, 175, 55, 0.35)',
    glowGradient: {
      top: 'rgba(212, 175, 55, 0.18)',
      bottom: 'rgba(212, 175, 55, 0.12)',
    },
  },
  velvet_slate: {
    id: 'velvet_slate',
    label: 'Velvet Slate',
    subtitle: 'Midnight velvet slate & platinum chrome lines',
    bgColor: '#0B132B',
    surfaceColor: '#111C38',
    borderOuter: 'rgba(148, 163, 184, 0.55)',
    borderInner: 'rgba(212, 175, 55, 0.32)',
    ornamentColor: '#E2E8F0',
    brandTextColor: '#F8FAFC',
    categoryTextColor: 'rgba(96, 165, 250, 0.95)',
    titleColor: '#F8FAFC',
    arabicColor: '#E2E8F0',
    translationColor: '#F1F5F9',
    urduColor: '#CBD5E1',
    referenceColor: '#60A5FA',
    footerTextColor: '#94A3B8',
    dividerColor: 'rgba(148, 163, 184, 0.35)',
    glowGradient: {
      top: 'rgba(96, 165, 250, 0.16)',
      bottom: 'rgba(212, 175, 55, 0.10)',
    },
  },
  brushed_parchment: {
    id: 'brushed_parchment',
    label: 'Brushed Parchment',
    subtitle: 'Warm antique manuscript & deep walnut ink',
    bgColor: '#F5EFE6',
    surfaceColor: '#FAF5ED',
    borderOuter: 'rgba(139, 90, 43, 0.55)',
    borderInner: 'rgba(139, 90, 43, 0.25)',
    ornamentColor: '#8B5A2B',
    brandTextColor: '#3D2B1F',
    categoryTextColor: 'rgba(139, 90, 43, 0.95)',
    titleColor: '#2C1A0E',
    arabicColor: '#3D2614',
    translationColor: '#2D1F12',
    urduColor: '#4A3525',
    referenceColor: '#8B5A2B',
    footerTextColor: '#7A624E',
    dividerColor: 'rgba(139, 90, 43, 0.30)',
    glowGradient: {
      top: 'rgba(139, 90, 43, 0.08)',
      bottom: 'rgba(176, 137, 30, 0.08)',
    },
  },
};

function loadLogoImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const words = clean.split(' ');
  const lines: string[] = [];
  let current = '';

  for (let i = 0; i < words.length; i++) {
    const test = current ? `${current} ${words[i]}` : words[i];
    if (ctx.measureText(test).width <= maxWidth) {
      current = test;
    } else {
      if (current) {
        lines.push(current);
        current = words[i];
      } else {
        lines.push(words[i]);
        current = '';
      }
      if (lines.length >= maxLines) break;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  if (lines.length === maxLines && words.length > 0) {
    const joined = lines.join(' ');
    if (joined.length < clean.length) {
      lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:\s]+$/, '')}…`;
    }
  }
  return lines;
}

function drawCornerOrnament(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number,
  ornamentColor: string
) {
  ctx.save();
  ctx.strokeStyle = ornamentColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x, y + dy * 34);
  ctx.lineTo(x, y);
  ctx.lineTo(x + dx * 34, y);
  ctx.stroke();

  // Diamond center accent
  ctx.fillStyle = ornamentColor;
  const cx = x + dx * 12;
  const cy = y + dy * 12;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 5);
  ctx.lineTo(cx + 5, cy);
  ctx.lineTo(cx, cy + 5);
  ctx.lineTo(cx - 5, cy);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export async function renderShareCardCanvas(payload: ShareCardPayload): Promise<HTMLCanvasElement> {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore
    }
  }

  const templateId = payload.templateId || 'matte_obsidian';
  const cfg = CARD_TEMPLATES[templateId] || CARD_TEMPLATES.matte_obsidian;

  const width = 1080;
  const height = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context unavailable');
  }

  // 1. Canvas Backdrop
  ctx.fillStyle = cfg.bgColor;
  ctx.fillRect(0, 0, width, height);

  // Radial Glow Aura
  if (cfg.glowGradient) {
    const topGlow = ctx.createRadialGradient(width / 2, 180, 20, width / 2, 220, 560);
    topGlow.addColorStop(0, cfg.glowGradient.top);
    topGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, width, height);

    const bottomGlow = ctx.createRadialGradient(
      width / 2,
      height - 140,
      10,
      width / 2,
      height - 120,
      480
    );
    bottomGlow.addColorStop(0, cfg.glowGradient.bottom);
    bottomGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = bottomGlow;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Inner Surface with Double Border
  const padOuter = 44;
  const padInner = 62;
  ctx.fillStyle = cfg.surfaceColor;
  ctx.fillRect(padOuter, padOuter, width - padOuter * 2, height - padOuter * 2);

  ctx.strokeStyle = cfg.borderOuter;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(padOuter, padOuter, width - padOuter * 2, height - padOuter * 2);

  ctx.strokeStyle = cfg.borderInner;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(padInner, padInner, width - padInner * 2, height - padInner * 2);

  drawCornerOrnament(ctx, padOuter + 8, padOuter + 8, 1, 1, cfg.ornamentColor);
  drawCornerOrnament(ctx, width - padOuter - 8, padOuter + 8, -1, 1, cfg.ornamentColor);
  drawCornerOrnament(ctx, padOuter + 8, height - padOuter - 8, 1, -1, cfg.ornamentColor);
  drawCornerOrnament(ctx, width - padOuter - 8, height - padOuter - 8, -1, -1, cfg.ornamentColor);

  // 3. Header: Brand Logo Watermark (Top & Lower Margin)
  const logoImg =
    (await loadLogoImage('/assets/aistudio/tas_logo_b0f8b87c.jpeg')) ||
    (await loadLogoImage('/pwa-192x192.png'));

  const logoCenterY = 148;
  const logoRadius = 44;

  ctx.save();
  ctx.beginPath();
  ctx.arc(width / 2, logoCenterY, logoRadius + 4, 0, Math.PI * 2);
  ctx.fillStyle = cfg.bgColor;
  ctx.fill();
  ctx.strokeStyle = cfg.ornamentColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  if (logoImg) {
    ctx.beginPath();
    ctx.arc(width / 2, logoCenterY, logoRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(
      logoImg,
      width / 2 - logoRadius,
      logoCenterY - logoRadius,
      logoRadius * 2,
      logoRadius * 2
    );
  } else {
    ctx.fillStyle = cfg.brandTextColor;
    ctx.font = 'bold 28px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('السنة', width / 2, logoCenterY);
  }
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = cfg.brandTextColor;
  ctx.font = '700 25px "Cinzel", Georgia, serif';
  ctx.fillText('THE AUTHENTIC SUNNAH', width / 2, 232);

  ctx.fillStyle = cfg.categoryTextColor;
  ctx.font = '600 17px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(payload.categoryLabel.toUpperCase(), width / 2, 268);

  // Divider
  ctx.strokeStyle = cfg.dividerColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(220, 294);
  ctx.lineTo(width - 220, 294);
  ctx.stroke();

  // 4. Title
  let cursorY = 350;
  ctx.fillStyle = cfg.titleColor;
  ctx.font = '700 32px "Cinzel", Georgia, serif';
  const titleLines = wrapTextLines(ctx, payload.title, width - 190, 2);
  for (const line of titleLines) {
    ctx.fillText(line, width / 2, cursorY);
    cursorY += 44;
  }

  cursorY += 16;
  const contentMaxWidth = width - 190;
  const footerTopY = height - 190;

  // 5. Arabic Verse / Dua Text
  if (payload.arabicText && payload.arabicText.trim()) {
    ctx.save();
    ctx.direction = 'rtl';
    ctx.textAlign = 'center';
    ctx.fillStyle = cfg.arabicColor;
    const arLen = payload.arabicText.trim().length;
    const arSize = arLen > 220 ? 34 : arLen > 120 ? 40 : 46;
    const arLineHeight = Math.round(arSize * 1.65);
    ctx.font = `400 ${arSize}px "Amiri Quran", "Scheherazade New", "Noto Naskh Arabic", serif`;
    const maxArLines = payload.translationText ? 5 : 9;
    const arLines = wrapTextLines(ctx, payload.arabicText, contentMaxWidth, maxArLines);

    for (const line of arLines) {
      if (cursorY + arLineHeight > footerTopY - 210) break;
      ctx.fillText(line, width / 2, cursorY);
      cursorY += arLineHeight;
    }
    ctx.restore();
    cursorY += 20;
  }

  // 6. Primary Translation Text
  if (payload.translationText && payload.translationText.trim()) {
    ctx.save();
    ctx.direction = 'ltr';
    ctx.textAlign = 'center';
    ctx.fillStyle = cfg.translationColor;
    const trLen = payload.translationText.trim().length;
    const trSize = trLen > 450 ? 25 : trLen > 240 ? 29 : 33;
    const trLineHeight = Math.round(trSize * 1.5);
    ctx.font = `400 ${trSize}px "Plus Jakarta Sans", system-ui, sans-serif`;

    const availableHeight = Math.max(120, footerTopY - cursorY - (payload.urduText ? 120 : 20));
    const maxLines = Math.max(3, Math.floor(availableHeight / trLineHeight));
    const trLines = wrapTextLines(ctx, payload.translationText, contentMaxWidth, maxLines);

    for (const line of trLines) {
      if (cursorY > footerTopY - 40) break;
      ctx.fillText(line, width / 2, cursorY);
      cursorY += trLineHeight;
    }
    ctx.restore();
    cursorY += 18;
  }

  // 7. Optional Urdu Text
  if (payload.urduText && payload.urduText.trim() && cursorY < footerTopY - 70) {
    ctx.save();
    ctx.direction = 'rtl';
    ctx.textAlign = 'center';
    ctx.fillStyle = cfg.urduColor;
    ctx.font = '400 28px "Noto Nastaliq Urdu", Georgia, serif';
    const maxUrLines = Math.max(1, Math.floor((footerTopY - cursorY - 12) / 50));
    const urLines = wrapTextLines(ctx, payload.urduText, contentMaxWidth, Math.min(3, maxUrLines));
    for (const line of urLines) {
      ctx.fillText(line, width / 2, cursorY);
      cursorY += 48;
    }
    ctx.restore();
  }

  // 8. Footer Reference & Lower-Margin Brand Logo Watermark
  ctx.strokeStyle = cfg.dividerColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(140, footerTopY);
  ctx.lineTo(width - 140, footerTopY);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = cfg.referenceColor;
  ctx.font = '700 22px "Plus Jakarta Sans", system-ui, sans-serif';
  const refLines = wrapTextLines(ctx, `— ${payload.reference}`, width - 190, 2);
  let refY = footerTopY + 44;
  for (const rLine of refLines) {
    ctx.fillText(rLine, width / 2, refY);
    refY += 30;
  }

  // Embedded Subtle Brand Logo Watermark on Lower Margin
  const watermarkCenterY = height - 68;
  const watermarkRadius = 20;

  if (logoImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2 - 130, watermarkCenterY, watermarkRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(
      logoImg,
      width / 2 - 130 - watermarkRadius,
      watermarkCenterY - watermarkRadius,
      watermarkRadius * 2,
      watermarkRadius * 2
    );
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2 - 130, watermarkCenterY, watermarkRadius, 0, Math.PI * 2);
    ctx.strokeStyle = cfg.ornamentColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  ctx.fillStyle = cfg.footerTextColor;
  ctx.font = '500 16px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('The Authentic Sunnah · Sadaqah Jariyah', width / 2 - 96, watermarkCenterY + 6);

  return canvas;
}

export async function generateShareCardAssets(payload: ShareCardPayload): Promise<{
  blob: Blob;
  dataUrl: string;
}> {
  const canvas = await renderShareCardCanvas(payload);
  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error('Unable to export PNG image'));
    }, 'image/png');
  });
  return { blob, dataUrl };
}
