'use client';

import type { CSSProperties } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import shadesOfPurple from 'react-syntax-highlighter/dist/esm/styles/prism/shades-of-purple';

const preBlock = "pre[class*='language-']";

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

type PortfolioCodePrismProps = {
    code: string;
    className?: string;
};

/** Chunk séparé : chargé via `next/dynamic` côté client uniquement. */
export function PortfolioCodePrism({ code, className }: PortfolioCodePrismProps) {
    return (
        <div className={className}>
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
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
