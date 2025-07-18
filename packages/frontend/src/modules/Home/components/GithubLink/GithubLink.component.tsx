import React from 'react'
import { BsGithub } from 'react-icons/bs'

import { Button } from '../../../../components/Button/Button.component'

import './GithubLink.style.scss'

const GithubLink = () => {
  return (
    <Button light stretch onClick={() => window.location.href = 'https://github.com/amine-abdelli'} className='github-link'>
      <BsGithub size={22} />
    </Button>
  )
}

export { GithubLink }