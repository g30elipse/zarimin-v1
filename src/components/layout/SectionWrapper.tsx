import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface SectionWrapperProps extends PropsWithChildren {
    className?: string;
}
function SectionWrapper(props: SectionWrapperProps) {
    return <section className={twMerge('max-w-7xl mx-auto px-4 py-6', props.className)}>{props.children}</section>;
}

export default SectionWrapper;
