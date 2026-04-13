import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ContactSection() {
    return (
        <section id="contact" className="portfolio-section-px scroll-mt-6 md:px-8">
            <Card className="glass-card py-0">
                <CardHeader>
                    <CardTitle className="text-xl">Créons ensemble</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 pb-6 md:grid-cols-2">
                    <div className="space-y-3">
                        <p className="text-2xl leading-tight font-semibold">
                            Une idée en tête ? Construisons quelque chose d&apos;{' '}
                            <span className="text-gradient-cosmic">incroyable</span>.
                        </p>
                        <p className="text-muted-foreground text-sm">Toujours partant pour discuter de projets passionnants et de nouvelles opportunités.</p>
                        <Button variant="cosmic" asChild>
                            <Link href="/#contact">Discutons</Link>
                        </Button>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="rounded-lg border p-3">
                            <p className="text-muted-foreground text-[10px] tracking-[0.2em]">EMAIL</p>
                            <p className="font-medium">hello@votre-nom.dev</p>
                        </div>
                        <div className="rounded-lg border p-3">
                            <p className="text-muted-foreground text-[10px] tracking-[0.2em]">LOCALISATION</p>
                            <p className="font-medium">Partout où il y a du WiFi</p>
                        </div>
                        <div className="rounded-lg border p-3">
                            <p className="text-muted-foreground text-[10px] tracking-[0.2em]">DISPONIBILITÉ</p>
                            <p className="font-medium">Immédiate</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
