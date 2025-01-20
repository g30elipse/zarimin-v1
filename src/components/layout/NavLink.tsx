'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));

    return (
        <Link
            href={href}
            className={cn(
                'relative px-3 nav-link py-4 md:py-2 text-gray-600 transition-colors hover:text-primary visited:text-gray-600',
                isActive &&
                    'text-primary active font-medium after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-primary '
            )}
        >
            {children}
        </Link>
    );
};
