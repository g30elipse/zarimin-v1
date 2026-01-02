import type { Metadata } from 'next';
import { Crimson_Text, Dancing_Script, Italianno } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

// Initialize Crimson Text font
const crimsonText = Crimson_Text({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-crimson-text',
    weight: ['400', '600'],
});

const dancingScript = Italianno({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-dancing-script',
    weight: ['400'],
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
            <body className={`${crimsonText.variable} ${dancingScript.variable} font-sans pb-32 md:pb-0`}>
                {children}
                <CustomCursor />
            </body>
        </html>
    );
}
