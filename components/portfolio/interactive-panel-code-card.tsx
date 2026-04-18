'use client';

import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { panelContent, type PanelTab } from '@/lib/portfolio/content';
import { cn } from '@/lib/utils';

const PortfolioCodePrism = dynamic(() => import('./interactive-panel-code-prism').then((m) => m.PortfolioCodePrism), {
    ssr: false,
    loading: () => <div className="bg-muted/20 min-h-[12rem] flex-1 animate-pulse rounded-lg" aria-hidden />,
});

type InteractivePanelCodeCardProps = {
    tabLabels: readonly { key: PanelTab; label: string }[];
    activeTab: PanelTab;
    fadeIn: boolean;
    terminalLine: string;
    onTabChange: (tab: PanelTab) => void;
    onRun: () => void;
    /** Hero : largeur max ~433px ; hauteur fixe (évite les variations svh/dvh au scroll mobile) */
    compact?: boolean;
};

export function InteractivePanelCodeCard({
    tabLabels,
    activeTab,
    fadeIn,
    terminalLine,
    onTabChange,
    onRun,
    compact = false,
}: InteractivePanelCodeCardProps) {
    const body = panelContent[activeTab];
    const isCodeTab = activeTab === 'code';

    const bodyShellClass = cn(
        'bg-muted/40 border-border/70 min-h-0 min-w-0 flex-1 rounded-lg border shadow-sm',
        'flex flex-col transition-opacity duration-150',
        fadeIn ? 'opacity-100' : 'opacity-30'
    );

    return (
        <div
            className={cn(
                'glass-card box-border flex shrink-0 flex-col overflow-hidden p-4 lg:p-5',
                compact
                    ? 'w-full max-w-[433px] max-lg:flex-none'
                    : 'h-[36rem] w-full min-w-0 max-w-[36rem] lg:h-[38rem]'
            )}
            style={
                compact
                    ? {
                          height: 710,
                          minHeight: 710,
                          maxHeight: 'none',
                          flexShrink: 0,
                      }
                    : undefined
            }
        >
            <div className="mb-3 shrink-0 flex flex-wrap gap-2">
                {tabLabels.map((tab) => (
                    <Button
                        key={tab.key}
                        variant={activeTab === tab.key ? 'default' : 'outline'}
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => onTabChange(tab.key)}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

            {isCodeTab ? (
                <PortfolioCodePrism
                    code={body}
                    className={cn(bodyShellClass, 'min-h-0 overflow-hidden [&>pre]:h-full [&>pre]:min-h-0')}
                />
            ) : (
                <pre
                    className={cn(
                        bodyShellClass,
                        'overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words p-4 text-xs leading-relaxed md:text-sm'
                    )}
                >
                    <code className="block min-h-0 whitespace-pre-wrap break-words">{body}</code>
                </pre>
            )}

            <div className="mt-3 shrink-0 flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm">
                <span className="font-mono">{terminalLine}</span>
                <Button size="sm" className="h-8 px-3 text-xs" onClick={onRun}>
                    ▶ Run
                </Button>
            </div>
        </div>
    );
}
