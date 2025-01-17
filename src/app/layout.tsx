import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Crimson_Text } from 'next/font/google';
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
            <body className={`${crimsonText.variable} font-sans`}>
                <Header />
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
