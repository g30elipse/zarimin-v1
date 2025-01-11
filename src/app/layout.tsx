import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Header } from '@/components/layout/Header';

import { Playfair_Display, Source_Sans_3, Unica_One, Crimson_Text } from 'next/font/google';

// Initialize Unica One font
const unicaOne = Unica_One({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-unica-one',
    weight: '400',
});

// Initialize Crimson Text font
const crimsonText = Crimson_Text({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-crimson-text',
    weight: ['400', '600'],
});

// Initialize Playfair Display font
const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
});

// Initialize Source Sans Pro font
const sourceSans = Source_Sans_3({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-source-sans',
});

export const metadata: Metadata = {
    title: 'Zarimin',
    description: 'A music platform for the Bodo community',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${playfair.variable} ${crimsonText.variable} font-sans`}>
                <Header />
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
