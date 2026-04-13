'use client';

import { CodeIcon, CompassIcon, PenNibIcon, RocketLaunchIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

const processIconBase =
    'size-11 shrink-0 text-violet-400/85 transition-all duration-300 ease-out will-change-transform';

export function ProcessStepIcon({ stepId }: { stepId: string }) {
    switch (stepId) {
        case '01':
            return (
                <CompassIcon
                    className={cn(
                        processIconBase,
                        'group-hover:rotate-[22deg] group-hover:scale-110 group-hover:text-violet-300',
                        'group-hover:drop-shadow-[0_0_14px_rgba(167,139,250,0.4)]',
                    )}
                    weight="duotone"
                    aria-hidden
                />
            );
        case '02':
            return (
                <PenNibIcon
                    className={cn(
                        processIconBase,
                        'group-hover:-translate-y-1 group-hover:translate-x-0.5 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-violet-300',
                        'group-hover:drop-shadow-[0_0_14px_rgba(167,139,250,0.4)]',
                    )}
                    weight="duotone"
                    aria-hidden
                />
            );
        case '03':
            return (
                <CodeIcon
                    className={cn(
                        processIconBase,
                        'group-hover:scale-110 group-hover:text-violet-300',
                        'group-hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.35)]',
                    )}
                    weight="duotone"
                    aria-hidden
                />
            );
        case '04':
            return (
                <RocketLaunchIcon
                    className={cn(
                        processIconBase,
                        'group-hover:-translate-y-2 group-hover:translate-x-0.5 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-violet-300',
                        'group-hover:drop-shadow-[0_0_16px_rgba(167,139,250,0.45)]',
                    )}
                    weight="duotone"
                    aria-hidden
                />
            );
        default:
            return null;
    }
}
