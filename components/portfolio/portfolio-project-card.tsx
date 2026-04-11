'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCardMedia } from '@/components/portfolio/project-card-media';
import type { PortfolioProject } from '@/lib/portfolio/content';

type PortfolioProjectCardProps = {
    project: PortfolioProject;
};

export function PortfolioProjectCard({ project }: PortfolioProjectCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Card
            className="glass-card py-0 transition-[border-color,box-shadow] duration-300 ease-out hover:border-violet-400/50 hover:shadow-lg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <CardHeader>
                <Badge
                    variant="secondary"
                    className="w-fit border border-violet-500/35 bg-violet-950/65 text-xs tracking-[0.14em] text-violet-100 uppercase"
                >
                    {project.tag}
                </Badge>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-sm">{project.stack}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
                <ProjectCardMedia isHovered={hovered} previewMedia={project.previewMedia} title={project.title} />
                <p className="text-base">{project.description}</p>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    {project.points.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
                <p className="text-primary text-sm font-medium">{project.status}</p>
            </CardContent>
        </Card>
    );
}
