import React from 'react'
import { LayoutProps } from './Layout.desktop';

import '../../theme/components/_layout.scss';

interface MultiplayerLayoutProps extends LayoutProps {
  column?: boolean;
}

const MultiplayerLayout = ({ children, column }: MultiplayerLayoutProps) => {
  return (
    <section className={`layout--multiplayer ${column ? 'column' : ''}`}>
      {children}
    </section>
  )
}

export { MultiplayerLayout }