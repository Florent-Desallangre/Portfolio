'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const VortexParticlesCanvas = dynamic(
    () => import('@/components/portfolio/hero-particles-canvas').then((m) => m.VortexParticlesCanvas),
    { ssr: false }
);
import { InteractivePanelCodeCard } from '@/components/portfolio/interactive-panel-code-card';
import { Button } from '@/components/ui/button';
import { usePortfolioCodePanelState } from '@/lib/hooks/use-portfolio-code-panel-state';

export function HeroSection() {
    /** Incrémenté avec « ready to deploy » pour déclencher l’effet big-bang sur les particules. */
    const [burstSignal, setBurstSignal] = useState(0);
    const onBuildComplete = useCallback(() => {
        setBurstSignal((n) => n + 1);
    }, []);
    const { activeTab, fadeIn, terminalLine, tabLabels, handleTab, handleRun } = usePortfolioCodePanelState({
        onBuildComplete,
    });

    return (
        <section
            id="accueil"
            className="relative overflow-x-clip overflow-y-visible px-6 pt-4 pb-2 sm:pt-6 md:px-8 md:pt-8 md:pb-3 lg:px-10 lg:pt-10 lg:pb-3"
        >
            <div className="relative z-10 space-y-4">
                {/* Vortex en arrière-plan (surtout mobile) ; au-dessus du fond, sous le titre et la grille */}
                <div
                    className="pointer-events-none absolute z-[1] max-lg:left-1/2 max-lg:right-auto max-lg:top-8 max-lg:w-[min(92vw,26rem)] max-lg:max-w-[420px] max-lg:-translate-y-[30%] sm:max-lg:top-12 sm:max-lg:w-[min(88vw,32rem)] lg:left-[calc(50%+min(5vw,44px))] lg:top-[min(4%,2.5rem)] lg:z-0 lg:w-[min(62vw,90vw)] lg:-translate-x-1/2 lg:-translate-y-[15%]"
                    aria-hidden
                >
                    <div className="animate-vortex-float relative w-full">
                        <VortexParticlesCanvas burstSignal={burstSignal} />
                        <Image
                            src="/vortex.png"
                            alt=""
                            width={1800}
                            height={1800}
                            priority
                            className="relative z-10 block h-auto w-full opacity-85 saturate-125 max-lg:opacity-70"
                            sizes="(max-width: 1023px) min(92vw, 420px) min(62vw, 1050px)"
                        />
                    </div>
                </div>

                <div className="relative z-20 grid gap-5 lg:grid-cols-[minmax(0,520px)_minmax(343px,469px)] lg:items-start lg:justify-between">
                    <div className="relative z-10 max-w-[520px] lg:relative lg:z-20 lg:top-50">
                        <p className="portfolio-kicker mb-3 text-xs font-semibold tracking-[0.28em] uppercase">Développeur Full Stack</p>
                        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
                            Je code des{' '}
                            <span className="text-gradient-cosmic">expériences_</span>
                        </h1>
                        <p className="text-muted-foreground mt-4 max-w-[460px] text-sm leading-relaxed md:text-base">
                            Développeur passionné par la création d applications web qui allient esthétique, performance et expérience utilisateur mémorable.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Button variant="cosmic" asChild>
                                <Link href="/#projects">Explorer mon univers</Link>
                            </Button>
                            <Button variant="cosmicOutline" asChild>
                                <Link href="/#contact">Me contacter</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="w-full max-w-[433px] justify-self-center self-start max-lg:min-h-[710px] lg:-mt-2 lg:justify-self-end">
                        <InteractivePanelCodeCard
                            compact
                            tabLabels={tabLabels}
                            activeTab={activeTab}
                            fadeIn={fadeIn}
                            terminalLine={terminalLine}
                            onTabChange={handleTab}
                            onRun={handleRun}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
