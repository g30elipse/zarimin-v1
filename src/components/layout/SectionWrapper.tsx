import React, { PropsWithChildren } from 'react';

function SectionWrapper(props: PropsWithChildren) {
    return <section className="max-w-7xl mx-auto px-4 py-6">{props.children}</section>;
}

export default SectionWrapper;
