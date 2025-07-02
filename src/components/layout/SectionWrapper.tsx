import React, { PropsWithChildren } from 'react';

interface SectionWrapperProps extends PropsWithChildren {
}
function SectionWrapper(props: SectionWrapperProps) {
    return <section className="max-w-7xl mx-auto px-4 py-6">{props.children}</section>;
}

export default SectionWrapper;
