import React, { ReactElement, useState } from 'react';

export interface ChildProps {
  input: string[],
  setInput: React.Dispatch<React.SetStateAction<string[]>>,
  wordChain: string[],
  setWordChain: React.Dispatch<React.SetStateAction<string[]>>,
  timer: number,
  setTimer: React.Dispatch<React.SetStateAction<number>>,
  typedWords: string[],
  setTypedWords: React.Dispatch<React.SetStateAction<string[]>>,
}

export interface EngineProps {
  children: ReactElement<ChildProps> | ReactElement<ChildProps>[];
}
const dictionary = [
  'à',
  'abeille',
  'aboyer',
  'abri',
  'accord',
  'accordéon',
  'accrocher',
  'acheter',
  'acrobate',
  'adresse',
  'affiche',
  'afrique',
  'agent',
  'agneau',
  'ah',
  'aide',
  'aider',
  'aile',
  'aime',
  'ainsi',
  'air',
  'ajouter',
  'alain',
  'allée',
  'aller',
  'allô',
  'allumette',
  'allure',
  'alors',
  'ambulance',
  'ami',
  'amusant',
  'amuser',
  'an',
  'ananas',
  'âne',
  'animal',
  'anneau',
  'année',
  'anniversaire',
  'apercevoir',
  'appareil',
  'appeler',
  'appétit',
  'applique',
  'apporter',
  'apprendre',
  'approcher',
  'après',
  'après-midi',
  'araignée',
  'arbre',
  'arête',
  'argent',
  'arlequin',
  'armoire',
  'arrêter',
  'arrière',
  'arrivée',
  'arriver',
  'as',
  'asseoir',
  'assez',
  'assiette',
  'assis',
  'attendre',
  'attention',
  'attrape',
  'attraper',
  'au',
  'au-dessus',
  "aujourd'hui",
  'aussi',
  'aussitôt',
  'auto',
  'autobus',
  'automne',
  'autour',
  'autre',
  'autrefois',
  'aux',
  'avaler',
  'avance',
  'avant',
  'avec',
  'avion',
  'avoir',
  'avril',
  'bague',
  'baignoire',
  'bain',
  'bal'];
function Engine({ children }: any) {
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [input, setInput] = React.useState<string[]>([]);
  const [wordChain, setWordChain] = React.useState<string[]>(dictionary);
  const [timer, setTimer] = React.useState(60);
  const props = {
    input, setInput, wordChain, setWordChain, timer, setTimer, typedWords, setTypedWords,
  };
  // The logic goes here
  return (
    <>
      {React.Children.map(children, (child) => React.cloneElement(child, props))}
    </>
  );
}

export { Engine };
