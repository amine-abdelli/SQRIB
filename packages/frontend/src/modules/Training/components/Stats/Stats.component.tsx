import React from 'react';
import './Stats.style.scss';
import { COLORS } from '../../../../theme/colors';
import { Logo, Spacer, SpacerSize } from '../../../../components';
import { countCorrectlyTypedWords, countLetters } from '../../../../utils';
import { Text } from '../../../../components/Text/Text.component';
import { Button } from '../../../../components/Button/Button.component';
import { TipGenerator } from '../../../../components/TipGenerator/TipGenerator.component';
import { FocusArea } from '../FocusArea/FocusArea.component';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { Tooltip } from '../../../../components/ToolTip/ToolTip.component';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { StatsProps } from '../ScoreBoardModal/ScoreBoardModal.component';
import { useSaveTrainingScore } from '../../../../api/queries';
import { TrainingMode } from '../../../../components/Options/Options.props';
import { alertService } from '../../../Alert/Alert.service';
import { SessionType } from '@sqrib/shared';

function Stats(props: StatsProps) {
  const { score, nextStep, wordChain, typedWords, misspellings, hasScoreBeenSaved, setHasScoreBeenSaved } = props;
  const { isAuthenticated } = useAuthContext();

  const totalTypedWords = typedWords.length;
  const wpm = score.wpm || 0;
  const accuracy = score.accuracy || 0;
  const points = score.points || 0;
  const correctlyTypedWords = countCorrectlyTypedWords(wordChain, typedWords);
  const incorrectlyTypedWords = typedWords.length - countCorrectlyTypedWords(wordChain, typedWords);
  const { correctLetters, totalLetters } = countLetters(wordChain, typedWords);
  const wrongLetters = misspellings.length;

  const { mutateAsync: saveScore } = useSaveTrainingScore({ onSuccess: () => { 
    alertService.success('Score saved successfully !', {});
    setHasScoreBeenSaved(true)
  } });
  async function saveTrainingScore() {
    if (isAuthenticated && !hasScoreBeenSaved) {
      await saveScore({
        score: {
          accuracy: score.accuracy,
          points: score.points,
          wpm: score.wpm,
          end_time: score.endTime,
          start_time: score.startTime,
          typed_words: typedWords.length,
        },
        session: {
          language: props.language,
          mode: props.mode,
          word_count: props.mode === TrainingMode.SPEED_CHALLENGE ? props.wordCount : undefined,
          count_down: props.mode === TrainingMode.TIME_TRIAL ? props.countDown : undefined,
          type: SessionType.TRAINING as unknown as string,
          zen_mode: props.isZenModeOn,
        }
      })
    }
  }
  // TODO Display Compare current score with your best score of the day, your previous score, the best score every of SQRIB and best score of the world
  return (
    <div className='stats--wrapper'>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Logo label='SCOREBOARD' />
        <Text fira size={24} centered>Summary</Text>
        <Spacer y size={SpacerSize.MEDIUM} />
      </div>
      <div className='stats--content'>
        <div className='score-card--wrapper'>
          <Text fira centered>wpm
            <Tooltip size={30} content="WPM is often the primary metric people look at. It represents the number of words you can type in one minute. This metric gauges your typing speed. A word is considered as 5 characters, including spaces and punctuation. Both novice and seasoned typists use WPM as a benchmark to measure progress.">
              <IoInformationCircleOutline size={16} color='grey' />
            </Tooltip>
          </Text>
          <Text fira bold>{wpm}</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text fira centered>Accuracy
            <Tooltip size={30} content="Accuracy represents the percentage of letters you typed correctly against the total letters from the reference text. A higher accuracy often indicates better focus and fewer typos. It's essential to balance speed (WPM) with accuracy for effective typing.">
              <IoInformationCircleOutline size={16} color='grey' />
            </Tooltip>
          </Text>
          <Text fira bold>{accuracy}%</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text fira centered>Points
            <Tooltip size={30} content="Points are a cumulative score calculated based on your WPM, accuracy, and the number of correct letters. It's a comprehensive metric giving an overall sense of your performance in the session.">
              <IoInformationCircleOutline size={16} color='grey' />
            </Tooltip>
          </Text>
          <Text fira bold>{points}</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text fira centered>Incorrect words
            <Tooltip size={30} content="These are the words you typed that didn't match the reference text. Reflect on these to understand common mistakes or areas of improvement.">
              <IoInformationCircleOutline size={16} color='grey' />
            </Tooltip>
          </Text>
          <Text fira bold>{incorrectlyTypedWords}</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text fira centered>Correct words
            <Tooltip size={30} content="Words that you've typed perfectly, matching the reference text. These show your successes in the typing session. Well done!">
              <IoInformationCircleOutline size={16} color='grey' />
            </Tooltip>
          </Text>
          <Text fira bold>{correctlyTypedWords}</Text>
        </div>
        <div className='score-card--wrapper'>
          <Text fira centered>Keystrokes
            <Tooltip size={30} content="Keystrokes represent every key press you made. This metric breaks down into three parts: the total expected keystrokes (from the reference), the number you got right, and any extra or incorrect keypresses (typos). Remember, even if you corrected a typo before moving on, it still counts here.">
              <IoInformationCircleOutline size={16} color='grey' />
            </Tooltip>
          </Text>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text fira bold>{totalLetters}</Text>
            <Spacer x size={SpacerSize.SMALL} />
            <Text fira thin size={14} color={COLORS.SUCCESS}>{correctLetters}</Text>
            <Text fira thin color={COLORS.GREY}>|</Text>
            <Text fira thin size={14} color={COLORS.ERROR}>{wrongLetters}</Text>
          </div>
        </div>
        <div className='score-card--wrapper'>
          <Text fira centered>Typed words
            <Tooltip size={30} content="This reflects the total number of words you've typed during the session. It provides insight into your engagement and stamina during the typing exercise.">
              <IoInformationCircleOutline size={16} color='grey' />
            </Tooltip>
          </Text>
          <Text fira bold>{totalTypedWords}</Text>
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
        <Spacer y size={SpacerSize.SMALL} />
        <Button
          color={COLORS.WHITE}
          onClick={async () => {
            await saveTrainingScore()
            nextStep()
          }}
          label={!isAuthenticated || hasScoreBeenSaved ? 'CONTINUE' : 'SAVE'}
        />
        <Spacer y size={SpacerSize.SMALL} />
        {isAuthenticated && !hasScoreBeenSaved && (
          <Button
            onClick={() => nextStep()}
            link
            label='Continue without saving' />
        )}
        <Spacer y size={SpacerSize.SMALL} />
        {isAuthenticated ? '' : <Text thin size={13} color={COLORS.GREY}>Next time log in or sign up to keep track of your journey. 🚀</Text>}
      </div>
    </div>
  );
}

export { Stats };
