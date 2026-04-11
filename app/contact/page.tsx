import Link from 'next/link';

import { ContactSection } from '@/components/portfolio/contact-section';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
    return (
        <div className="dark portfolio-bg min-h-svh">
            <div className="portfolio-section space-y-6">
                <div className="portfolio-section-px flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Contact</h1>
                    <Button variant="cosmicOutline" asChild>
                        <Link href="/">Retour à l accueil</Link>
                    </Button>
                </div>
                <ContactSection />
            </div>
        </div>
    );
}
