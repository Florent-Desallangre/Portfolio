import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PortfolioProjectCard } from '@/components/portfolio/portfolio-project-card';
import { projects } from '@/lib/portfolio/content';

export function ProjectsSection({ withCta = true }: { withCta?: boolean }) {
    return (
        <section id="projects" className="portfolio-section-px scroll-mt-6 -mt-2 space-y-5 pt-0 sm:-mt-3 md:px-8">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="portfolio-kicker md:text-2xl font-semibold tracking-[0.28em] uppercase">Mon univers</h2>
                    <p className="text-muted-foreground mt-1 text-base">Trois projets représentatifs de mon approche produit et technique.</p>
                </div>
                {withCta ? (
                    <Button variant="cosmicOutline" className="!min-h-10 py-2 text-sm" asChild>
                        <Link href="/projects">Voir tout</Link>
                    </Button>
                ) : null}
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                {projects.map((project) => (
                    <PortfolioProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}
