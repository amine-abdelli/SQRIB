import React from 'react'
import Modal from '../../../../components/Modal/Modal.component'
import { Stats } from '../Stats/Stats.component'
import { EngineProps } from '../../Engine'

const TrainingModal = (props: EngineProps) => {
  const [shouldOpenModal, setShouldOpenModal] = React.useState(false)
  React.useEffect(() => {
    if(!props.isRunning && props.score?.wpm && props.isUserAllowToType) {
      setShouldOpenModal(true)
    }
  }, [props.isRunning, props.score?.wpm])

  return (
    <Modal isOpen={shouldOpenModal} setIsOpen={setShouldOpenModal} closeable={true} darkCross>
      <Modal.Body>
        <Stats {...props} />
      </Modal.Body>
    </Modal>
  )
}

export { TrainingModal }