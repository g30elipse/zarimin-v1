'use client';

import { FC, PropsWithChildren, useRef } from 'react';

export interface HoverCardProps {}

/**
 *  This card is elevated when hovered
 *  and transforms the card based on mouse position
 *  to give a 3D effect
 *  pseudo code
 * function rotateToMouse(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2
  }
  const distance = Math.sqrt(center.x**2 + center.y**2);
  
  $card.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance)* 2}deg
    )
  `;
 */
const HoverCard: FC<PropsWithChildren<HoverCardProps>> = (props) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (ref.current) {
            const { left, top, width, height } = ref.current.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - left;
            const topY = mouseY - top;
            const center = {
                x: leftX - width / 2,
                y: topY - height / 2,
            };
            const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

            ref.current.style.transform = `
                scale3d(1.07, 1.07, 1.07)
                rotate3d(
                    ${center.y / 100},
                    ${-center.x / 100},
                    0,
                    ${Math.log(distance) * 2}deg
                )
            `;
        }
    };

    const handleMouseLeave = () => {
        if (ref.current) {
            ref.current.style.transform = 'rotate3d(0, 1, 0, 0deg)';
        }
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hover:shadow-lg transition-transform"
        >
            {props.children}
        </div>
    );
};

export default HoverCard;
