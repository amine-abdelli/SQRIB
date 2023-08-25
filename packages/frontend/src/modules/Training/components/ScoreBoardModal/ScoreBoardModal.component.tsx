import React, { useEffect } from 'react'
import Modal from '../../../../components/Modal/Modal.component'
import { Stats } from '../Stats/Stats.component'
import { ReplayModalProps } from '../ReplayModal/ReplayModal.component'
import { ReplayOptions } from '../ReplayModal/ReplayOptions/ReplayOptions.component'
import { ArrowLeft } from 'react-iconly'
import { Button } from '../../../../components/Button/Button.component'
import { useConfetti } from '../../../../contexts/ConfettiContext'

export interface StatsProps extends ReplayModalProps {
  nextStep: () => void;
  hasScoreBeenSaved: boolean, 
  setHasScoreBeenSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScoreBoardModal = (props: ReplayModalProps) => {
  const { shouldOpenVictoryModal, setShouldOpenVictoryModal, resetTraining, resetTrainingAndRefetch, setShouldDisplayOption, setIsUserAllowToType,  } = props;
  const [hasScoreBeenSaved, setHasScoreBeenSaved] = React.useState(false);
  const [step, setStep] = React.useState<0 | 1>(0);
  const [shouldTriggerConfetti, setShouldTriggerConfetti] = React.useState(false);
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    if(shouldOpenVictoryModal && shouldTriggerConfetti === false) {
      triggerConfetti()
      setShouldTriggerConfetti(true)
    }
  }, [shouldOpenVictoryModal])

  function nextStep() {
    setStep(1)
  }
  const statsProps: StatsProps = { ...props, nextStep, hasScoreBeenSaved, setHasScoreBeenSaved }

  function closeModal() {
    setShouldOpenVictoryModal(false)
    setShouldTriggerConfetti(false)
    setStep(0)
    setHasScoreBeenSaved(false)
  }
  const ReplayOptionsProps = { resetTraining, resetTrainingAndRefetch, setShouldDisplayOption, setIsUserAllowToType, closeModal }
  return (
    <Modal isOpen={shouldOpenVictoryModal} setIsOpen={setShouldOpenVictoryModal}>
      <Modal.Header>
        {step === 1 ? <Button stretch light label={<ArrowLeft size={24} />} onClick={() => setStep(0)} style={{ padding: 0}}/> : null}
      </Modal.Header>
      <Modal.Body>
        {step === 0 ? <Stats {...statsProps} />: null}
        {step === 1 ? (
          <ReplayOptions {...ReplayOptionsProps} />
        ): null}
      </Modal.Body>
    </Modal>
  )
}

export { ScoreBoardModal }