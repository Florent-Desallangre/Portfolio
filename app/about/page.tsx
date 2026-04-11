import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="flex min-h-svh flex-col gap-4 p-6">
            <h1 className="font-medium">À propos</h1>
            <p className="text-sm text-muted-foreground">Exemple de seconde route : /about</p>
            <Link href="/" className="text-sm underline underline-offset-4">
                Retour à l&apos;accueil
            </Link>
        </div>
    );
}
