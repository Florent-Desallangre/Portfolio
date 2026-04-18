import type { Metadata } from 'next';
import { Geist_Mono, Raleway } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const raleway = Raleway({
    subsets: ['latin'],
    variable: '--font-sans',
});

const fontMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
});

export const metadata: Metadata = {
    title: 'Portfolio Florent D. | Développeur Full Stack',
    description:
        'Portfolio de Florent D. : projets, compétences et process de développement web full stack.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning className={cn('antialiased', fontMono.variable, 'font-sans', raleway.variable)}>
            <body className="min-h-lvh bg-background text-foreground" suppressHydrationWarning>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
