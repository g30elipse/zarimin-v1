import Link from 'next/link';
import { NavLink } from './NavLink';

export const Header = () => {
    return (
        <header className="border-b-2 border-accent bg-secondary">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <nav className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <Link href="/" className="text-3xl font-bold text-primary hover:text-accent transition-colors">
                        ZARIMIN
                    </Link>
                    <div className="flex flex-wrap justify-center gap-4">
                        <NavLink href="/news">All News</NavLink>
                        <NavLink href="/charts">Charts</NavLink>
                        <NavLink href="/artists">Artists</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/team">Team</NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
};
