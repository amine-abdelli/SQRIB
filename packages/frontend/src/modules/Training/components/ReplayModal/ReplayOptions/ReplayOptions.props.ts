export interface ReplayOptionsProps {
  closeModal: () => void;
  resetTraining: () => void;
  resetTrainingAndRefetch: () => void; 
  setShouldDisplayOption: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserAllowToType: React.Dispatch<React.SetStateAction<boolean>>;
}