'use client';

import type { CSSProperties } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import shadesOfPurple from 'react-syntax-highlighter/dist/esm/styles/prism/shades-of-purple';

import { Button } from '@/components/ui/button';
import { panelContent, type PanelTab } from '@/lib/portfolio/content';
import { cn } from '@/lib/utils';

type InteractivePanelCodeCardProps = {
    tabLabels: { key: PanelTab; label: string }[];
    activeTab: PanelTab;
    fadeIn: boolean;
    terminalLine: string;
    onTabChange: (tab: PanelTab) => void;
    onRun: () => void;
    /** Hero : taille figée (~433×710) alignée sur l’onglet Code */
    compact?: boolean;
};

const preBlock = "pre[class*='language-']";

/** Thème « Shades of Purple » ajusté pour coller à l’UI (violets, orange, lisibilité) */
const portfolioPrismStyle: Record<string, CSSProperties> = {
    ...shadesOfPurple,
    [preBlock]: {
        ...(shadesOfPurple as Record<string, CSSProperties>)[preBlock],
        background: 'transparent',
        boxShadow: 'none',
    },
    keyword: { ...(shadesOfPurple as Record<string, CSSProperties>).keyword, color: '#ffb84d', fontWeight: 600 },
    string: { ...(shadesOfPurple as Record<string, CSSProperties>).string, color: '#b8ffa3' },
    function: { ...(shadesOfPurple as Record<string, CSSProperties>).function, color: '#ffe566' },
    'class-name': { ...(shadesOfPurple as Record<string, CSSProperties>)['class-name'], color: '#f0abfc' },
    number: { ...(shadesOfPurple as Record<string, CSSProperties>).number, color: '#ff7eb3' },
    comment: { ...(shadesOfPurple as Record<string, CSSProperties>).comment, color: '#d4b4ff' },
    punctuation: { ...(shadesOfPurple as Record<string, CSSProperties>).punctuation, color: '#e8e2f5' },
};

const codeBlockCustomStyle: CSSProperties = {
    margin: 0,
    padding: '1rem',
    height: '100%',
    minHeight: 0,
    boxSizing: 'border-box',
    background: 'transparent',
    fontSize: '0.875rem',
    lineHeight: 1.7,
    overflowX: 'hidden',
    overflowY: 'auto',
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
                compact ? 'h-[710px] w-full max-w-[433px]' : 'h-[36rem] w-full min-w-0 max-w-[36rem] lg:h-[38rem]'
            )}
        >
            <div className="mb-3 shrink-0 flex flex-wrap gap-2">
                {tabLabels.map((tab) => (
                    <Button key={tab.key} variant={activeTab === tab.key ? 'default' : 'outline'} size="sm" className="h-8 px-3 text-xs" onClick={() => onTabChange(tab.key)}>
                        {tab.label}
                    </Button>
                ))}
            </div>

            {isCodeTab ? (
                <div className={cn(bodyShellClass, 'overflow-hidden [&>pre]:h-full [&>pre]:min-h-0')}>
                    <SyntaxHighlighter
                        language="javascript"
                        style={portfolioPrismStyle}
                        wrapLongLines
                        showLineNumbers={false}
                        customStyle={codeBlockCustomStyle}
                        codeTagProps={{
                            className: 'font-mono',
                            style: {
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            },
                        }}
                    >
                        {body}
                    </SyntaxHighlighter>
                </div>
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
