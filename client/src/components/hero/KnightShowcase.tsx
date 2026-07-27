'use client';

import { useEffect, useRef } from 'react';

export default function KnightShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Soft luma‑key thresholds – tuned to remove the bright white background of the source video
  const MIN_WHITE = 190;
  const MAX_WHITE = 245;

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Ensure video plays silently and loops
    video.muted = true;
    video.loop = true;
    video.play().catch(() => {});

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const render = () => {
      if (video.readyState >= 2) {
        // Resize canvas on first frame
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = img.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const whiteness = Math.min(r, g, b);
            if (whiteness > MIN_WHITE) {
              const ratio = (whiteness - MIN_WHITE) / (MAX_WHITE - MIN_WHITE);
              const clamped = Math.min(1, Math.max(0, ratio));
              data[i + 3] = Math.round(255 * (1 - clamped));
            }
          }
          ctx.putImageData(img, 0, 0);
        } catch (e) {
          // Some browsers restrict readPixels on cross‑origin content – ignore silently
        }
      }
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <div className="knight-showcase-container">
      {/* Hidden video element – we only display the processed canvas */}
      <video ref={videoRef} src="/knight.mp4" style={{ display: 'none' }} />
      <canvas ref={canvasRef} className="knight-render-canvas" />
    </div>
  );
}
