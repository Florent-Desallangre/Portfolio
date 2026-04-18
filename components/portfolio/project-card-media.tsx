'use client';

import { ArrowsOut, Play } from '@phosphor-icons/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

import { Button } from '@/components/ui/button';
import type { PortfolioPreviewMedia } from '@/lib/portfolio/content';
import { cn } from '@/lib/utils';

type VideoWithIOSFullscreen = HTMLVideoElement & {
    webkitEnterFullscreen?: () => void;
};

type ProjectCardMediaProps = {
    title: string;
    previewMedia?: PortfolioPreviewMedia;
    /** Animation / lecture uniquement tant que la carte est survolée. */
    isHovered: boolean;
};

/**
 * Zone 16/9 : image statique, GIF (`img`) ou vidéo (`video`).
 * Vidéo / GIF : lecture ou animation seulement au survol. `object-contain` conserve le cadre entier.
 */
export function ProjectCardMedia({ title, previewMedia, isHovered }: ProjectCardMediaProps) {
    const src = previewMedia?.src?.trim();
    const hasMedia = Boolean(src && previewMedia);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const requestVideoFullscreen = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const v = videoRef.current as VideoWithIOSFullscreen | null;
        if (!v) {
            return;
        }
        if (typeof v.requestFullscreen === 'function') {
            void v.requestFullscreen().catch(() => {
                v.webkitEnterFullscreen?.();
            });
        } else {
            v.webkitEnterFullscreen?.();
        }
    }, []);

    useEffect(() => {
        const el = videoRef.current;
        if (!el || previewMedia?.kind !== 'video') {
            return;
        }
        if (isHovered) {
            void el.play().catch(() => {});
        } else {
            el.pause();
            el.currentTime = 0;
        }
    }, [isHovered, previewMedia?.kind]);

    const shellClass =
        'bg-muted/30 relative aspect-video w-full overflow-hidden rounded-md border border-dashed border-border/60';

    if (!hasMedia) {
        return (
            <div
                className={shellClass}
                aria-label={`Emplacement réservé à un aperçu média — ${title}`}
            >
                <div className="flex h-full min-h-[7rem] items-center justify-center px-2">
                    <span className="text-muted-foreground text-center text-xs">Aperçu à venir</span>
                </div>
            </div>
        );
    }

    const kind = previewMedia!.kind;

    if (kind === 'image') {
        return (
            <div className={shellClass} aria-label={`Aperçu du projet : ${title}`}>
                <Image
                    src={src!}
                    alt={`Capture d’écran — ${title}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                    decoding="async"
                />
            </div>
        );
    }

    if (kind === 'video') {
        return (
            <div
                className={shellClass}
                aria-label={isHovered ? `Aperçu vidéo en lecture — ${title}` : `Aperçu vidéo — survoler la carte pour lire — ${title}`}
            >
                <video
                    ref={videoRef}
                    src={src}
                    poster={previewMedia!.poster}
                    className="h-full w-full object-contain"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`Aperçu vidéo du projet : ${title}`}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                />
                {isPlaying ? (
                    <div className="absolute right-2 bottom-2 z-20">
                        <Button
                            type="button"
                            size="icon-sm"
                            variant="secondary"
                            className="border border-white/20 bg-background/85 text-violet-100 shadow-md backdrop-blur-sm hover:bg-background/95"
                            aria-label="Agrandir la vidéo en plein écran"
                            onClick={requestVideoFullscreen}
                        >
                            <ArrowsOut className="size-4" weight="bold" aria-hidden />
                        </Button>
                    </div>
                ) : null}
                <div
                    aria-hidden
                    className={cn(
                        'pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out',
                        isHovered ? 'opacity-0' : 'opacity-100',
                    )}
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/70 text-violet-200 shadow-md backdrop-blur-[2px] ring-1 ring-violet-500/30">
                        <Play className="ml-0.5 size-7" weight="fill" aria-hidden />
                    </div>
                </div>
            </div>
        );
    }

    // kind === 'gif' : image animée uniquement au survol
    return (
        <div
            className={shellClass}
            aria-label={
                isHovered
                    ? `Aperçu animé du projet ${title}`
                    : `Aperçu animé — survoler la carte pour lancer — ${title}`
            }
        >
            {isHovered ? (
                <Image
                    src={src!}
                    alt={`Aperçu animé du projet : ${title}`}
                    fill
                    className="object-contain"
                    unoptimized
                    sizes="(max-width: 1280px) 100vw, 33vw"
                />
            ) : (
                <div className="flex h-full min-h-[7rem] items-center justify-center px-2">
                    <span className="text-muted-foreground text-center text-xs">Survoler la carte pour voir l’aperçu animé</span>
                </div>
            )}
        </div>
    );
}
