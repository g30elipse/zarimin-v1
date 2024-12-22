import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Header } from '@/components/layout/Header';

import { Playfair_Display, Source_Sans_3 } from 'next/font/google';

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

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
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
            <body className={`${playfair.variable} ${sourceSans.variable} font-sans`}>
                <Header />
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
