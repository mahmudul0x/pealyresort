import { useEffect, useRef, useState } from "react";

type Props = {
  /** Ordered video sources (try in order). */
  sources: { src: string; type?: string }[];
  /** Poster image — always shown; remains as fallback if video fails. */
  poster: string;
  alt?: string;
  className?: string;
  /** Disable video below this viewport width (px). */
  mobileBreakpoint?: number;
  /** Extra overlay element rendered above the video. */
  children?: React.ReactNode;
  /** Additional className for the poster img. */
  imgClassName?: string;
};

/**
 * Cinematic auto-playing video background with graceful fallbacks:
 *  - Always renders the poster <img> behind the video (instant paint, SEO-friendly).
 *  - Skips video on small screens or when the user prefers reduced motion / saves data.
 *  - Hides the <video> if it errors, leaving the poster visible.
 */
export function VideoBackground({
  sources,
  poster,
  alt = "",
  className = "",
  imgClassName = "ken-burns",
  mobileBreakpoint = 768,
  children,
}: Props) {
  const [enableVideo, setEnableVideo] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error - non-standard but widely supported
    const saveData = navigator.connection?.saveData === true;
    const isNarrow = window.innerWidth < mobileBreakpoint;
    if (!reducedMotion && !saveData && !isNarrow) {
      setEnableVideo(true);
    }
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (!enableVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {/* autoplay blocked — poster remains */});
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("canplay", tryPlay, { once: true });
  }, [enableVideo]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={poster}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        fetchPriority="high"
      />
      {enableVideo && videoOk && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1200ms]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
          onCanPlay={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = "1"; }}
          onError={() => setVideoOk(false)}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type ?? "video/mp4"} />
          ))}
        </video>
      )}
      {children}
    </div>
  );
}
