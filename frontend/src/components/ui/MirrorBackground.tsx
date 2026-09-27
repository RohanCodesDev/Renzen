import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  tileSize?: number;
  opacity?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
}

/**
 * Renders a mirrored-repeat tiled background using canvas.
 * Horizontally adjacent tiles are flipped on the X axis.
 * Vertically adjacent tiles are flipped on the Y axis.
 * This makes any non-seamless texture tile without visible seams.
 */
export default function MirrorBackground({
  src,
  tileSize = 250,
  opacity = 0.15,
  mixBlendMode = 'overlay',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;

    const img = new Image();
    img.src = src;

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      if (!w || !h) return;

      canvas.width = w;
      canvas.height = h;

      const tw = tileSize;
      const th = img.width > 0 ? tileSize * (img.height / img.width) : tileSize;

      // Build a 2x2 mirror super-tile on an offscreen canvas:
      //  [ normal   | flip-X  ]
      //  [ flip-Y   | flip-XY ]
      const off = document.createElement('canvas');
      off.width = tw * 2;
      off.height = th * 2;
      const oc = off.getContext('2d')!;

      // Top-left: normal
      oc.drawImage(img, 0, 0, tw, th);

      // Top-right: flip horizontal
      oc.save();
      oc.translate(tw * 2, 0);
      oc.scale(-1, 1);
      oc.drawImage(img, 0, 0, tw, th);
      oc.restore();

      // Bottom-left: flip vertical
      oc.save();
      oc.translate(0, th * 2);
      oc.scale(1, -1);
      oc.drawImage(img, 0, 0, tw, th);
      oc.restore();

      // Bottom-right: flip both axes
      oc.save();
      oc.translate(tw * 2, th * 2);
      oc.scale(-1, -1);
      oc.drawImage(img, 0, 0, tw, th);
      oc.restore();

      // Tile the super-tile across the canvas
      const pattern = ctx.createPattern(off, 'repeat');
      if (pattern) {
        ctx.globalAlpha = opacity;
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, w, h);
      }
    };

    img.onload = draw;

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(draw);
    });
    const parent = canvas.parentElement;
    if (parent) ro.observe(parent);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [src, tileSize, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode,
        zIndex: 0,
      }}
    />
  );
}
