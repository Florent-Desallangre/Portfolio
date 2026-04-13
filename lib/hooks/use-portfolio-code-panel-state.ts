'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { panelTabLabels, type PanelTab } from '@/lib/portfolio/content';

type UsePortfolioCodePanelStateOptions = {
    /** Appelé quand la ligne terminal affiche « ready to deploy » (ex. impulsion particules). */
    onBuildComplete?: () => void;
};

export function usePortfolioCodePanelState(options?: UsePortfolioCodePanelStateOptions) {
    const [activeTab, setActiveTab] = useState<PanelTab>('code');
    const [terminalLine, setTerminalLine] = useState('npm run dev');
    const [fadeIn, setFadeIn] = useState(true);
    const timeoutsRef = useRef<number[]>([]);
    const onBuildCompleteRef = useRef(options?.onBuildComplete);

    useEffect(() => {
        onBuildCompleteRef.current = options?.onBuildComplete;
    }, [options?.onBuildComplete]);

    const clearScheduled = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
    }, []);

    useEffect(
        () => () => {
            clearScheduled();
        },
        [clearScheduled]
    );

    const handleTab = useCallback(
        (tab: PanelTab) => {
            clearScheduled();
            setFadeIn(false);
            const id = window.setTimeout(() => {
                setActiveTab(tab);
                setFadeIn(true);
            }, 120);
            timeoutsRef.current.push(id);
        },
        [clearScheduled]
    );

    const handleRun = useCallback(() => {
        clearScheduled();
        setTerminalLine('🚀 Building...');
        const t1 = window.setTimeout(() => {
            setTerminalLine('✅ Build complete - ready to deploy');
            onBuildCompleteRef.current?.();
        }, 900);
        const t2 = window.setTimeout(() => {
            setTerminalLine('npm run dev');
        }, 2400);
        timeoutsRef.current.push(t1, t2);
    }, [clearScheduled]);

    return {
        activeTab,
        fadeIn,
        terminalLine,
        tabLabels: panelTabLabels,
        handleTab,
        handleRun,
    };
}
