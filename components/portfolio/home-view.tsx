import { ContactSection } from '@/components/portfolio/contact-section';
import { HeroSection } from '@/components/portfolio/hero-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { Sidebar } from '@/components/portfolio/sidebar';
import { SkillsProcessSection } from '@/components/portfolio/skills-process-section';

export function HomeView() {
    return (
        <div className="dark portfolio-bg min-h-svh">
            <div className="portfolio-section">
                <div className="portfolio-grid items-start">
                    <Sidebar />
                    <main className="flex min-h-0 flex-col gap-4 lg:gap-5">
                        <HeroSection />
                        <ProjectsSection />
                        <SkillsProcessSection />
                        <ContactSection />
                    </main>
                </div>
            </div>
        </div>
    );
}
