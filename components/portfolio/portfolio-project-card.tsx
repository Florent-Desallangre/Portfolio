'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCardMedia } from '@/components/portfolio/project-card-media';
import type { PortfolioProject } from '@/lib/portfolio/content';
import { cn } from '@/lib/utils';

type PortfolioProjectCardProps = {
    project: PortfolioProject;
};

function subscribeHoverCapability(callback: () => void) {
    const mq = window.matchMedia('(hover: hover)');
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
}

function getHoverCapabilitySnapshot() {
    return window.matchMedia('(hover: hover)').matches;
}

function getHoverCapabilityServerSnapshot() {
    return true;
}

/** translateZ évite sur mobile (WebKit) un flash du contenu de la face avant « miroir » pendant la rotation. */
const faceClass =
    'absolute inset-0 flex flex-col [backface-visibility:hidden] [-webkit-backface-visibility:hidden] motion-reduce:[transform:none]';

/** Hauteur mini commune (face avant + arrière) pour éviter chevauchement contenu / footer. */
const cardMinHeightClass = 'min-h-[40rem]';

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
    const [hovered, setHovered] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const canHover = useSyncExternalStore(subscribeHoverCapability, getHoverCapabilitySnapshot, getHoverCapabilityServerSnapshot);

    useEffect(() => {
        if (!flipped) {
            return;
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setFlipped(false);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [flipped]);

    const { flipDetails } = project;

    return (
        <div className="perspective-[1400px] w-full">
            <div
                className={cn(
                    'relative w-full transition-transform duration-700 ease-in-out motion-reduce:transition-none [transform-style:preserve-3d]',
                    cardMinHeightClass,
                    flipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
                )}
            >
                {/* Face avant — rotateY(0) + translateZ pour le tri 3D correct avec la face arrière */}
                <div
                    className={cn(
                        faceClass,
                        '[transform:rotateY(0deg)_translateZ(1px)]',
                        flipped && 'pointer-events-none'
                    )}
                    aria-hidden={flipped}
                >
                    <Card
                        className={cn(
                            'glass-card flex h-full flex-col overflow-hidden py-0 transition-[border-color,box-shadow] duration-300 ease-out hover:border-violet-400/50 hover:shadow-lg',
                            cardMinHeightClass
                        )}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <CardHeader className="pt-4">
                            <Badge
                                variant="secondary"
                                className="w-fit border border-violet-500/35 bg-violet-950/65 text-xs tracking-[0.14em] text-violet-100 uppercase"
                            >
                                {project.tag}
                            </Badge>
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                            <CardDescription className="text-sm">{project.stack}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex min-h-0 flex-1 flex-col space-y-3 overflow-y-auto overscroll-contain pb-4">
                            <div
                                className={!canHover ? 'touch-manipulation' : undefined}
                                onPointerDown={
                                    canHover
                                        ? undefined
                                        : () => {
                                              setHovered(true);
                                          }
                                }
                            >
                                <ProjectCardMedia
                                    isHovered={hovered && !flipped}
                                    previewMedia={project.previewMedia}
                                    title={project.title}
                                />
                            </div>
                            <p className="text-base">{project.description}</p>
                            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                                {project.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                            <p className="text-primary text-sm font-medium">{project.status}</p>
                        </CardContent>
                        <CardFooter className="mt-auto shrink-0 border-t border-white/10 bg-white/[0.04] px-4 pb-4 pt-5 sm:px-6">
                            <Button
                                type="button"
                                variant="cosmicOutline"
                                className="w-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setHovered(false);
                                    setFlipped(true);
                                }}
                            >
                                Plus de détail
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Face arrière */}
                <div
                    className={cn(
                        faceClass,
                        '[transform:rotateY(180deg)_translateZ(1px)]',
                        !flipped && 'pointer-events-none'
                    )}
                    aria-hidden={!flipped}
                >
                    <Card
                        className={cn(
                            'glass-card flex h-full flex-col overflow-hidden border-violet-500/25 py-0 shadow-lg',
                            cardMinHeightClass
                        )}
                    >
                        <CardHeader className="pt-4">
                            <Badge
                                variant="secondary"
                                className="w-fit border border-violet-500/35 bg-violet-950/65 text-xs tracking-[0.14em] text-violet-100 uppercase"
                            >
                                {project.tag}
                            </Badge>
                            <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
                            <CardDescription className="text-sm">{project.stack}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-4">
                            <div className="space-y-3 text-sm leading-relaxed">
                                {flipDetails.paragraphs.map((p) => (
                                    <p key={p} className="text-muted-foreground">
                                        {p}
                                    </p>
                                ))}
                            </div>
                            {flipDetails.bullets && flipDetails.bullets.length > 0 ? (
                                <ul className="text-muted-foreground list-disc space-y-1.5 pl-5 text-sm">
                                    {flipDetails.bullets.map((b) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </CardContent>
                        <CardFooter className="mt-auto shrink-0 border-t border-white/10 bg-white/[0.04] px-4 pb-4 pt-5 sm:px-6">
                            <Button
                                type="button"
                                variant="cosmicOutline"
                                className="w-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFlipped(false);
                                }}
                            >
                                Retour
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
