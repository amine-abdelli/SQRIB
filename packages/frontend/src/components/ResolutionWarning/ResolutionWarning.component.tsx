import React from 'react'
import { useWindowSize } from '../../hooks'
import Modal from '../Modal/Modal.component'
import { Text } from '../Text/Text.component'
import { COLORS } from '../../theme/colors'
import { Button } from '../Button/Button.component'

const ResolutionWarning = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const { isLargeScreen, width } = useWindowSize()

  React.useEffect(() => {
    setIsModalOpen(isLargeScreen)
  }, [width])

  return (
    <Modal isOpen={isModalOpen} style={{ background: COLORS.WARNING, maxWidth: '95%' }}>
      <Modal.Header>
        <Text h2 bold centered>
          Usage Note
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text p fira size={24} centered>
          This application is optimized for desktop usage. Please switch to a desktop for an enhanced experience.
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button secondary onClick={() => setIsModalOpen(false)}>Got it !</Button>
      </Modal.Footer>
    </Modal>
  )
}

export { ResolutionWarning }