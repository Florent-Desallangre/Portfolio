'use client';

import { useMemo, useState } from 'react';

import { InteractivePanelCodeCard } from '@/components/portfolio/interactive-panel-code-card';
import { InteractivePanelExperienceCard } from '@/components/portfolio/interactive-panel-experience-card';
import { InteractivePanelExplorationCard } from '@/components/portfolio/interactive-panel-exploration-card';
import { type PanelTab } from '@/lib/portfolio/content';

const tabLabels: { key: PanelTab; label: string }[] = [
    { key: 'code', label: 'Code' },
    { key: 'thoughts', label: 'Pensées' },
    { key: 'notes', label: 'Notes' },
];

type InteractivePanelProps = {
    exploration: boolean;
    light: boolean;
    sound: boolean;
    onToggleExploration: () => void;
    onToggleLight: () => void;
    onToggleSound: () => void;
    showExplorationCard?: boolean;
};

export function InteractivePanel({
    exploration,
    light,
    sound,
    onToggleExploration,
    onToggleLight,
    onToggleSound,
    showExplorationCard = true,
}: InteractivePanelProps) {
    const [activeTab, setActiveTab] = useState<PanelTab>('code');
    const [terminalLine, setTerminalLine] = useState('npm run dev');
    const [fadeIn, setFadeIn] = useState(true);

    const clickAudio = useMemo(() => (typeof window === 'undefined' ? null : new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3')), []);
    const runAudio = useMemo(() => (typeof window === 'undefined' ? null : new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3')), []);

    const playSound = (audio: HTMLAudioElement | null) => {
        if (!sound || !audio) {
            return;
        }

        audio.currentTime = 0;
        void audio.play();
    };

    const handleTab = (tab: PanelTab) => {
        playSound(clickAudio);
        setFadeIn(false);
        setTimeout(() => {
            setActiveTab(tab);
            setFadeIn(true);
        }, 120);
    };

    const handleRun = () => {
        playSound(runAudio);
        setTerminalLine('🚀 Building...');

        const doneTimeout = setTimeout(() => {
            setTerminalLine('✅ Build complete - ready to deploy');
        }, 900);

        const resetTimeout = setTimeout(() => {
            setTerminalLine('npm run dev');
        }, 2400);

        return () => {
            clearTimeout(doneTimeout);
            clearTimeout(resetTimeout);
        };
    };

    return (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
            <InteractivePanelCodeCard tabLabels={tabLabels} activeTab={activeTab} fadeIn={fadeIn} terminalLine={terminalLine} onTabChange={handleTab} onRun={handleRun} />

            <aside className="space-y-4">
                {showExplorationCard ? (
                    <InteractivePanelExplorationCard
                        exploration={exploration}
                        light={light}
                        sound={sound}
                        onToggleExploration={onToggleExploration}
                        onToggleLight={onToggleLight}
                        onToggleSound={onToggleSound}
                    />
                ) : null}

                <InteractivePanelExperienceCard />
            </aside>
        </div>
    );
}
