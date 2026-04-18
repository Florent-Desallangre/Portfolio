import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { portfolioNav } from '@/lib/portfolio/content';
import { cn } from '@/lib/utils';

type PortfolioNavContentProps = {
    /** Fermer le menu mobile après navigation (hash / ancres). */
    onNavLinkClick?: () => void;
    className?: string;
    /** Menu latéral mobile : zone haute défilable, carte statut ancrée en bas du panneau. */
    layout?: 'default' | 'sheet';
};

export function PortfolioNavContent({ onNavLinkClick, className, layout = 'default' }: PortfolioNavContentProps) {
    const topBlock = (
        <div className="space-y-5">
            <div>
                <div className="relative mb-2 size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/25">
                    <Image
                        src="/avatar.jpeg"
                        alt="Florent D."
                        width={36}
                        height={36}
                        className="size-full object-cover"
                        sizes="36px"
                        priority
                    />
                </div>
                <p className="text-base font-semibold">Florent D.</p>
                <p className="text-muted-foreground text-xs">Développeur Full Stack</p>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Navigation de la page">
                {portfolioNav.map((item) => (
                    <Button
                        key={item.href}
                        variant="ghost"
                        className="h-9 justify-start px-2 text-sm transition-[font-size] duration-200 ease-out hover:text-base"
                        asChild
                    >
                        <a href={item.href} onClick={onNavLinkClick}>
                            {item.label}
                        </a>
                    </Button>
                ))}
            </nav>
        </div>
    );

    const statusCard = (
        <div className="rounded-lg border p-3">
            <p className="text-xs font-semibold tracking-[0.2em]">STATUT</p>
            <Badge className="mt-2 text-xs">Disponible</Badge>
            <p className="text-muted-foreground mt-2 text-sm">Pour de nouveaux projets</p>
        </div>
    );

    if (layout === 'sheet') {
        return (
            <div className={cn('flex min-h-0 min-w-0 flex-1 flex-col', className)}>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{topBlock}</div>
                <div className="mt-auto shrink-0 border-t border-white/10 pt-4">{statusCard}</div>
            </div>
        );
    }

    return (
        <div className={cn('flex min-h-0 min-w-0 flex-1 flex-col', className)}>
            {topBlock}
            <div className="mt-auto shrink-0 pt-6">{statusCard}</div>
        </div>
    );
}
