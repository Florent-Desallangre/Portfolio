'use client';

import { List, X } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';

import { PortfolioNavContent } from '@/components/portfolio/portfolio-nav-content';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function MobileNav({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);

    return (
        <header className={cn('sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur-md lg:hidden', className)}>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
                <a href="#accueil" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/25">
                        <Image
                            src="/avatar.jpeg"
                            alt=""
                            width={36}
                            height={36}
                            className="size-full object-cover"
                            sizes="36px"
                        />
                    </div>
                    <span className="truncate text-sm font-semibold">Florent D.</span>
                </a>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-white/20"
                    aria-expanded={open}
                    aria-controls="portfolio-mobile-nav"
                    onClick={() => setOpen(true)}
                >
                    <List className="size-5" weight="bold" aria-hidden />
                    <span className="sr-only">Ouvrir le menu de navigation</span>
                </Button>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    id="portfolio-mobile-nav"
                    className="glass-card w-[min(100vw,14rem)] overflow-hidden border-violet-500/20 p-0 sm:max-w-[14rem]"
                >
                    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
                        <SheetTitle className="text-base">Navigation</SheetTitle>
                        <SheetClose asChild>
                            <Button type="button" variant="ghost" size="icon-sm" aria-label="Fermer le menu">
                                <X className="size-5" weight="bold" aria-hidden />
                            </Button>
                        </SheetClose>
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-2">
                        <PortfolioNavContent layout="sheet" onNavLinkClick={() => setOpen(false)} />
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}
