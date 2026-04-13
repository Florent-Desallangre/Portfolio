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
            className="relative overflow-visible px-6 pt-6 pb-2 md:px-8 md:pt-8 md:pb-3 lg:px-10 lg:pt-10 lg:pb-3"
        >
            <div className="relative z-10 space-y-4">
                {/* Vortex hors flux : particules orange/violet calées sur l image */}
                <div
                    className="pointer-events-none absolute left-[calc(50%+min(5vw,44px))] top-[min(4%,2.5rem)] z-0 hidden -translate-x-1/2 -translate-y-[15%] lg:block"
                    aria-hidden
                >
                    {/* relative + animation sur le même nœud : même repère transform que l'image pour le canvas WebGL */}
                    <div className="animate-vortex-float relative w-[62vw] max-w-[1050px]">
                        <VortexParticlesCanvas burstSignal={burstSignal} />
                        <Image
                            src="/vortex.png"
                            alt=""
                            width={1800}
                            height={1800}
                            priority
                            className="relative z-10 block h-auto w-full opacity-85 saturate-125"
                        />
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,520px)_minmax(343px,469px)] lg:items-start lg:justify-between">
                    <div className="max-w-[520px] lg:relative lg:z-20 lg:top-50">
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

                    <div className="w-[433px] self-start justify-self-end lg:-mt-2">
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
