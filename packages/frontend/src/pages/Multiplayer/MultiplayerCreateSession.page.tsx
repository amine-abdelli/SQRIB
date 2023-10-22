import React, { useEffect } from 'react'

import { Card } from '../../components/Card/Card.component'
import { Text } from '../../components/Text/Text.component'
import { generatePath, useNavigate } from 'react-router-dom'
import { useSocket } from '../../contexts/SocketContext'
import { Languages, PlayerSubscribe, SessionMode, SessionOptions, SocketPreGameEventsEnum, TLanguages } from '@sqrib/shared'
import { usePlayer } from '../../contexts/PlayerContext'
import { Button } from '../../components/Button/Button.component'
import { Input } from '../../modules/Auth/components'
import { COLORS } from '../../theme/colors'
import { Spacer, SpacerSize } from '../../components'
import Select from '../../components/Select/Select.component'
import Notification from '../../components/Notification/Notification.component'
import { MAIN_ROUTES } from '../../routes/paths'

const wordCountOptions = [{ value: 25, label: 25 }, { value: 50, label: 50 }, { value: 75, label: 75 }, { value: 100, label: 100 }, { value: 125, label: 125 }, { value: 150, label: 150 }];
const durationOptions = [{ value: 15, label: 15 }, { value: 30, label: 30 }, { value: 60, label: 60 }, { value: 75, label: 75 }, { value: 90, label: 90 }, { value: 120, label: 120 }];
const modeOptions = [{ value: SessionMode.TIME_TRIAL, label: 'Time Trial', subLabel: 'Race against the clock and type as many words as possible in your chosen timeframe.' }, { value: SessionMode.SPEED_CHALLENGE, label: 'Speed Challenge', subLabel: 'Choose a word count and type it out as quickly as you can.' }];
const languageOptions = [{ value: Languages.FR, label: Languages.FRENCH }, { value: Languages.EN, label: Languages.ENGLISH }, { value: Languages.ES, label: Languages.SPANISH }, { value: Languages.DE, label: Languages.GERMAN }];

const MultiplayerCreateSession = () => {
  const [language, setLanguage] = React.useState<TLanguages>(Languages.FR)
  const [mode, setMode] = React.useState<SessionMode>(SessionMode.TIME_TRIAL)
  const [countDown, setCountDown] = React.useState(60)
  const [wordCount, setWordCount] = React.useState(75)
  const [name, setName] = React.useState(``)
  const [isValid, setIsValid] = React.useState(true)

  const { emit, listen } = useSocket()
  const { username, color, avatar, isAuthenticated } = usePlayer()
  const navigate = useNavigate()


  listen(SocketPreGameEventsEnum.CREATE_SESSION, ({ roomId }) => {
    navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_STAGING, { roomId }))
  })

  useEffect(() => {
    setName(`[${mode}] ${language} ${mode === SessionMode.TIME_TRIAL ? countDown : wordCount}`)
  }, [])

  function createSession() {
    if (name) {
      setIsValid(true)
      const subscriptionData: PlayerSubscribe = { username, color, avatar, isAuthenticated }
      const sessionOptions: SessionOptions = {
        language,
        mode,
        name,
        time: countDown,
        wordCount,
      }
      emit(SocketPreGameEventsEnum.CREATE_SESSION, subscriptionData, sessionOptions)
    } else {
      setIsValid(false)
    }
  }
  return (
    <section className='layout--main layout--section'>
      <Card style={{ padding: '2rem', width: '26rem' }}>
        <Text h2 bold fira>Session Settings</Text>
        <Spacer y size={SpacerSize.SMALL} />
        <Text p thin fira>Enter a name for your session and choose your options.</Text>
        {!isValid && <Notification type='error' message='All fields are mandatory' />}
        <Spacer y size={SpacerSize.SMALL} />
        <Input
          type="text"
          name="name"
          label='Session name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Text p size={12} fira>Options</Text>
        <Spacer y size={SpacerSize.SMALL} />
        <div className="button-group" style={{ background: 'lightgrey', height: '100%', padding: '0.1rem', borderRadius: '5px', display: 'flex', justifyContent: 'center' }}>
          {modeOptions.map(({ label, value }, i) => (
            <Button
              className='button-group--select-button'
              style={{ background: mode === value ? COLORS.WHITE : '', border: mode === value ? '1px solid black' : '', padding: '0.8rem', borderRadius: '5px', width: '11rem' }}
              color={mode === value ? COLORS.GOLD : ''}
              onClick={() => setMode(value)}
              light
              label={label}
              key={i}
            />
          ))}
        </div>
        <Spacer y size={SpacerSize.SMALL} />
        {/* You have 15, 30, 45, 60, 75 or 90seconds to type as many words as possible  */}
        {mode === SessionMode.SPEED_CHALLENGE &&
          <>
            <Text size={12} thin fira>Number of words you want to type</Text>
            <Spacer y size={SpacerSize.SMALL} />
            <div style={{ background: 'lightgrey', height: '100%', padding: '0.1rem', borderRadius: '5px', display: 'flex', justifyContent: 'center' }}>
              {wordCountOptions.map(({ label, value }, i) => (
                <Button
                  className='button-group--select-button'
                  style={{ background: wordCount === value ? COLORS.WHITE : '', border: wordCount === value ? '1px solid black' : '', padding: '0.8rem', borderRadius: '5px', width: '3.5rem' }}
                  color={wordCount === value ? COLORS.GOLD : ''}
                  onClick={() => setWordCount(value)}
                  light
                  label={label}
                  key={i}
                />
              ))}
            </div>
          </>
        }
        {/* You have 25, 50, 75, 100, 125 or 150 words to type as fast as possible  */}
        {mode === SessionMode.TIME_TRIAL &&
          <>
            <Text size={12} thin fira>Duration of the session in seconds</Text>
            <Spacer y size={SpacerSize.SMALL} />
            <div className="button-group" style={{ background: 'lightgrey', height: '100%', padding: '0.1rem', borderRadius: '5px', display: 'flex', justifyContent: 'center' }}>
              {durationOptions.map(({ label, value }, i) => (
                <Button
                  className='button-group--select-button'
                  style={{ background: countDown === value ? COLORS.WHITE : '', border: countDown === value ? '1px solid black' : '', padding: '0.8rem', borderRadius: '5px', width: '3.5rem' }}
                  color={countDown === value ? COLORS.GOLD : ''}
                  onClick={() => setCountDown(value)}
                  light
                  label={label}
                  key={i}
                />
              ))}
            </div>
          </>
        }
        <Spacer y size={SpacerSize.SMALL} />
        <Text size={12} thin fira>Language</Text>
        <Spacer y size={SpacerSize.SMALL} />
        <Select data={languageOptions} onChange={setLanguage} value={language} />
        <Spacer y size={SpacerSize.SMALL} />
        <Button onClick={createSession}>Create session</Button>
        <Spacer y size={SpacerSize.SMALL} />
        <Button secondary onClick={() => navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)}>Leave</Button>
      </Card>
    </section>
  )
}

export default MultiplayerCreateSession