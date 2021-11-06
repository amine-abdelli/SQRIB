import React, { useEffect } from 'react'

const Multigaming = ({ router,  setNavigationState }: any) => {
  useEffect(() => {
    setNavigationState(router.asPath.split('/').at(-1).toLowerCase())
  }, []);
  return (
    <div>
        Multiplayer
    </div>
  )
}

export default Multigaming
