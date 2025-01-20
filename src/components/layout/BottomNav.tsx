import Link from 'next/link';
import { NavLink } from './NavLink';
import Image from 'next/image';
import { BookImage, Home, Newspaper, TrendingUp, Users } from 'lucide-react';

export const BottomNav = () => {
    return (
        <header
            className="border-b fixed bottom-0 left-0 right-0 p-4 md:hidden border-accent 
            lg:sticky lg:top-0 z-10 bg-slate-100 shadow-[0px 0px 10px rgba(0,0,0,0.1)]
        "
        >
            <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto py-2">
                <NavLink href="/">
                    <Home />
                </NavLink>
                <NavLink href="/news">
                    <Newspaper />
                </NavLink>
                <NavLink href="/shorts">
                    <BookImage />
                </NavLink>
                <NavLink href="/artists">
                    <Users />
                </NavLink>
                <NavLink href="/charts">
                    <TrendingUp />
                </NavLink>
                {/* <NavLink href="/about">About</NavLink>
                <NavLink href="/team">Team</NavLink> */}
            </div>
        </header>
    );
};
