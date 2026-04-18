import { PortfolioNavContent } from '@/components/portfolio/portfolio-nav-content';

export function Sidebar() {
    return (
        <aside className="glass-card sticky top-0 hidden h-svh flex-col p-3 lg:flex lg:p-4">
            <PortfolioNavContent />
        </aside>
    );
}
