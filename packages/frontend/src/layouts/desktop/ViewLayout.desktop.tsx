import React from 'react'
import '../../_layout.scss';

interface ViewLayoutProps {
  className?: string
}

const ViewLayout = ({ className }: ViewLayoutProps) => {
  return (
    <div className={`layout--main ${className}`}>ViewLayout</div>
  )
}

export { ViewLayout }