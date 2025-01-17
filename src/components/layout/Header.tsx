import Link from 'next/link';
import { NavLink } from './NavLink';
import Image from 'next/image';

export const Header = () => {
    return (
        <header className="border-b border-accent lg:sticky lg:top-0 z-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <nav className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <Link href="/" className="text-3xl font-bold text-primary hover:text-accent transition-colors">
                        <Image src="/logo-black.jpg" alt="Logo" width={150} height={50} />
                    </Link>
                    <div className="flex flex-wrap justify-center gap-4">
                        <NavLink href="/news">All News</NavLink>
                        <NavLink href="/artists">Artists</NavLink>
                        <NavLink href="/charts">Charts</NavLink>
                        <NavLink href="/shorts">Shorts</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/team">Team</NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
};
