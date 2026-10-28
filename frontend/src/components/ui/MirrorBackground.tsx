import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  tileSize?: number;
  opacity?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  mode?: 'horizontal' | 'both';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders a mirrored-repeat tiled background using canvas.
 * - 'horizontal': Tiles alternate horizontally: [ Original | Flipped Horizontally | Original | ... ]
 * - 'both': 2x2 mirror flipping on both X and Y axes for seamless pattern matching.
 */
export default function MirrorBackground({
  src,
  tileSize = 300,
  opacity = 0.18,
  mixBlendMode = 'multiply',
  mode = 'horizontal',
  className,
  style,
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

      if (mode === 'horizontal') {
        // Alternating horizontal tiles: [ Original | Flipped Horizontally ]
        const off = document.createElement('canvas');
        off.width = tw * 2;
        off.height = th;
        const oc = off.getContext('2d');
        if (!oc) return;

        // Tile 1: Original
        oc.drawImage(img, 0, 0, tw, th);

        // Tile 2 (beside): Flipped horizontally
        oc.save();
        oc.translate(tw * 2, 0);
        oc.scale(-1, 1);
        oc.drawImage(img, 0, 0, tw, th);
        oc.restore();

        const pattern = ctx.createPattern(off, 'repeat');
        if (pattern) {
          ctx.clearRect(0, 0, w, h);
          ctx.globalAlpha = opacity;
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, w, h);
        }
      } else {
        // 2x2 mirror super-tile (both X and Y)
        const off = document.createElement('canvas');
        off.width = tw * 2;
        off.height = th * 2;
        const oc = off.getContext('2d');
        if (!oc) return;

        // Top-left: original
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

        const pattern = ctx.createPattern(off, 'repeat');
        if (pattern) {
          ctx.clearRect(0, 0, w, h);
          ctx.globalAlpha = opacity;
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, w, h);
        }
      }
    };

    if (img.complete) {
      draw();
    } else {
      img.onload = draw;
    }

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
  }, [src, tileSize, opacity, mixBlendMode, mode]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode,
        zIndex: 0,
        ...style,
      }}
    />
  );
}
