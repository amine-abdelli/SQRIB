import React from 'react'
import Modal from '../../../../components/Modal/Modal.component'
import { Stats } from '../Stats/Stats.component'
import { EngineProps } from '../../Engine'

const TrainingModal = (props: EngineProps) => {

  return (
    <Modal isOpen={props.shouldOpenVictoryModal} setIsOpen={props.setShouldOpenVictoryModal} closeable={true} darkCross>
      <Modal.Body>
        <Stats {...props} />
      </Modal.Body>
    </Modal>
  )
}

export { TrainingModal }