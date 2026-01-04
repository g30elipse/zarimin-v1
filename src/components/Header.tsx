"use client";
import { FC, useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface HeaderProps {

}

const Header: FC<HeaderProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !backdropRef.current) return;

    if (isOpen) {
      // Open drawer
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.fromTo(drawerRef.current,
        { x: "100%" },
        {
          x: "0%",
          duration: 0.5,
          ease: "power3.out"
        }
      );
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      // Close drawer
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in"
      });
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    closeDrawer();
  };

  return (
    <>
      {/* Desktop Navigation - Fixed */}
      <nav
        className="hidden md:flex fixed inset-0 w-full justify-end p-xl uppercase text-base tracking-widest font-bold z-header pointer-events-none"
      >
        <div className="flex gap-lg pointer-events-auto">
          <a href="/" className="hover:line-through">Home</a>
          <a href="/history" className="hover:line-through">History</a>
          <a href="/artists" className="hover:line-through">Artists</a>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        ref={menuButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-md right-md z-drawer-button w-12 h-12 flex flex-col justify-center items-center gap-1.5 pointer-events-auto rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-black/10 hover:bg-white transition-colors duration-base"
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-[2px] bg-black transition-all duration-normal ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-5 h-[2px] bg-black transition-all duration-normal ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-[2px] bg-black transition-all duration-normal ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Drawer Backdrop */}
      <div
        ref={backdropRef}
        onClick={closeDrawer}
        className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-drawer-backdrop opacity-0 pointer-events-none"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-bg-alt z-drawer shadow-2xl"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full p-xl pt-20">
          <nav className="flex flex-col gap-xl uppercase text-lg tracking-widest font-bold text-text-primary">
            <a
              href="/"
              onClick={handleLinkClick}
              className="hover:line-through transition-all duration-normal py-2 border-b border-black/10"
            >
              Home
            </a>
            <a
              href="/history"
              onClick={handleLinkClick}
              className="hover:line-through transition-all duration-normal py-2 border-b border-black/10"
            >
              History
            </a>
            <a
              href="/artists"
              onClick={handleLinkClick}
              className="hover:line-through transition-all duration-normal py-2 border-b border-black/10"
            >
              Artists
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}


export default Header;