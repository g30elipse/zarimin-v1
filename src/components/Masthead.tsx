import { FC } from 'react';

export interface MastheadProps {
  text: string
}

const Masthead: FC<MastheadProps> = (props) => {
  return (
    <div className="fixed left-0 top-0 h-screen w-16 border-r border-black/10 z-50 hidden md:flex items-center justify-center">
      <span className="rotate-90 origin-center whitespace-nowrap uppercase tracking-[0.5em] text-[10px] font-bold">
        {props.text}
      </span>
    </div>
  )
}


export default Masthead;