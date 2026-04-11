import Link from 'next/link';

import { ProjectsSection } from '@/components/portfolio/projects-section';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
    return (
        <div className="dark portfolio-bg min-h-svh">
            <div className="portfolio-section space-y-6">
                <div className="portfolio-section-px flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Projets</h1>
                    <Button variant="cosmicOutline" asChild>
                        <Link href="/">Retour à l accueil</Link>
                    </Button>
                </div>
                <ProjectsSection withCta={false} />
            </div>
        </div>
    );
}
