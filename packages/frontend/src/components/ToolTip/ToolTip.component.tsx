import React, { FC, useState, useRef, useEffect } from 'react';
import { TooltipProps } from './ToolTip.props';
import './ToolTip.style.scss';

const Tooltip: FC<TooltipProps> = ({ children, content, direction = 'top', enable = true, size}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Function to handle mouse over and mouse out events
  const showTooltip = () => setActive(true);
  const hideTooltip = () => setActive(false);

  useEffect(() => {
    const trigger = childRef.current;
    if (trigger) {
      trigger.addEventListener('mouseover', showTooltip);
      trigger.addEventListener('mouseout', hideTooltip);

      // Clean up the tooltip when the component is unmounted or if the children change
      return () => {
        trigger.removeEventListener('mouseover', showTooltip);
        trigger.removeEventListener('mouseout', hideTooltip);
      };
    }
  }, [childRef]); // Dependency array

  return (
    <div className="tooltip-container" ref={childRef}>
      {children}
      {active && enable && (
        <div className={`tooltip-box tooltip-${direction}`} style={{ width: size ? `${size}rem` : ''}}>
          {content}
        </div>
      )}
    </div>
  );
};

export { Tooltip };
