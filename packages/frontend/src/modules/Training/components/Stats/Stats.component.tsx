import React, { useEffect } from 'react';
import './Stats.style.scss';
import { COLORS } from '../../../../theme/colors';
import { Logo, Spacer, SpacerSize } from '../../../../components';
import { StatsProps } from '../TrainingModal/TrainingModal.component';
import { countCorrectlyTypedWords, countLetters, countOccurrences } from '../../../../utils';
import { Text } from '../../../../components/Text/Text.component';
import { Button } from '../../../../components/Button/Button.component';
import { TipGenerator } from '../../../../components/TipGenerator/TipGenerator.component';
import { FocusArea } from '../FocusArea/FocusArea.component';

function Stats(props: StatsProps) {
  const { score, nextStep, wordChain, typedWords, misspellings } = props;

  const totalTypedWords = typedWords.length;
  const wpm = score.wpm || 0;
  const accuracy = score.accuracy || 0;
  const points = score.points || 0;
  const correctlyTypedWords = countCorrectlyTypedWords(wordChain, typedWords);
  const incorrectlyTypedWords = typedWords.length - countCorrectlyTypedWords(wordChain, typedWords);
  const { correctLetters, totalLetters } = countLetters(wordChain, typedWords);
  const wrongLetters = misspellings.length;
  const isLoggedIn = false;



  return (
    <div className='stats--wrapper'>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Logo label='SCOREBOARD' />
        <Spacer y size={SpacerSize.MEDIUM} />
      </div>
      <div className='stats--content'>
        <div className='score-card--wrapper'>
          <Text h3 bold>wpm</Text>
          <Text h3 bold>{wpm}</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text>Typed words</Text>
          <Text bold>{totalTypedWords}</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text>Incorrect words</Text>
          <Text bold>{incorrectlyTypedWords}</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text>Correct words</Text>
          <Text bold>{correctlyTypedWords}</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text>Keystrokes</Text>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text bold>{totalLetters}</Text>
            <Spacer x size={SpacerSize.SMALL} />
            <Text thin size={14} color={COLORS.SUCCESS}>{correctLetters}</Text>
            <Text thin color={COLORS.GREY}>|</Text>
            {/* TODO add explanation on why correctLetters + wrongLetters can be greater than the total of letters (Add information bulb)*/}
            <Text thin size={14} color={COLORS.ERROR}>{wrongLetters}</Text>
          </div>
        </div>
        <div className='score-card--wrapper'>
          <Text>Accuracy</Text>
          <Text bold>{accuracy}%</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text>Points</Text>
          <Text bold>{points}</Text>
        </div>
        <TipGenerator />
        <div style={{ width: '100%', display: misspellings?.length ? '' : 'none' }}>
          <Text h3 bold>Focus area</Text>
          {/* <Text thin>The keys you see next are your frequent miss-hits from this session</Text> */}
          <Text thin size={14}>These are the keys that posed challenges for you this session :</Text>
          {/* "Below are the keys you often missed. Review and practice to enhance your typing accuracy. Remember, every key is a step towards mastery!" */}
          {/* "These are the keys that posed challenges for you this session." */}
          {/* "The following keys represent where you had the most errors." */}
          <Spacer y size={SpacerSize.SMALL} />
          <FocusArea misspellings={misspellings} />
        </div>
        <Spacer y size={SpacerSize.MEDIUM} />
        <Button
          color='white'
          onClick={() => {
            nextStep()
          }}
          label={isLoggedIn ? 'SAVE' : 'CONTINUE'}
        />
        {isLoggedIn && (
          <Button
            onClick={() => nextStep()}
            label='Continue without saving' />
        )}
        <Spacer y size={SpacerSize.SMALL} />
        {!isLoggedIn && (
          <Button
            onClick={() => null}
            light
            color="blue"
            label='Signup'
          />
        )}
      </div>
    </div>
  );
}

export { Stats };
