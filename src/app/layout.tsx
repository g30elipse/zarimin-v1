import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Crimson_Text } from 'next/font/google';
import { BottomNav } from '@/components/layout/BottomNav';
import './globals.css';

// Initialize Crimson Text font
const crimsonText = Crimson_Text({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-crimson-text',
    weight: ['400', '600'],
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
            <body className={`${crimsonText.variable} font-sans pb-32 md:pb-0`}>
                <ThemeProvider>
                    <Header />
                    {children}
                    <BottomNav />
                </ThemeProvider>
            </body>
        </html>
    );
}
