
import { FC } from 'react';

export interface HeaderProps {

}

const Header: FC<HeaderProps> = (props) => {


  return (
    <>
      <nav
        className="fixed inset-0 w-full flex justify-end p-10 uppercase text-[11px] tracking-widest font-bold z-50 pointer-events-none"
      >
        <div className="flex gap-6 pointer-events-auto">
          <a href="/" className="hover:line-through">Home</a>
          <a href="/history" className="hover:line-through">History</a>
          <a href="/artists" className="hover:line-through">Artists</a>
        </div>
      </nav>


    </>
  )
}


export default Header;