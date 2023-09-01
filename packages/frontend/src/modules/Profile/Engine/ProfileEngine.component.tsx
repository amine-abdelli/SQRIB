import React from 'react'
import { ProfileEngineChildren } from './ProfileEngine.props';

const ProfileEngine = ({ children }: ProfileEngineChildren) => {
  return (
    <>
      {React.Children.map(children, (child) => React.cloneElement(child, {
        userDetail: 'userDetail'
      })
      )}
    </>
  )
}

export { ProfileEngine };