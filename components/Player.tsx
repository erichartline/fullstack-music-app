import { useEffect, useRef, useState } from 'react'
import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import {
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
  MdSkipNext,
  MdSkipPrevious,
  MdShuffle,
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { formatTime } from '../lib/formatters'

type Song = {
  id: string
  url: string
}

type Props = {
  activeSong: Song
  songs: Song[]
}

const Player = ({ activeSong, songs }: Props) => {
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(
    songs.findIndex((song) => song.id === activeSong.id)
  )
  const [seek, setSeek] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef(null)
  const repeatRef = useRef(repeat)
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

  useEffect(() => {
    let timerId

    if (playing && !isSeeking) {
      const callback = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(callback)
      }
      timerId = requestAnimationFrame(callback)
      return () => cancelAnimationFrame(timerId)
    }

    cancelAnimationFrame(timerId)
  }, [playing, isSeeking])

  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  const setPlayState = (value) => setPlaying(value)

  const handleShuffle = () => setShuffle((state) => !state)

  const handleRepeat = () => setRepeat((state) => !state)

  const prevSong = () =>
    setIndex((state) => (state ? state - 1 : songs.length - 1))

  const nextSong = () =>
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length)
        if (next === state) {
          return nextSong()
        }
        return next
      }
      return state === songs.length - 1 ? 0 : state + 1
    })

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }

  const onSeek = (event) => {
    setSeek(parseFloat(event[0]))
    soundRef.current.seek(event[0])
  }

  return (
    <Box>
      <ReactHowler
        playing={playing}
        src={activeSong?.url}
        ref={soundRef}
        onLoad={onLoad}
        onEnd={onEnd}
      />
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            aria-label="shuffle"
            color={shuffle ? 'white' : 'gray.600'}
            fontSize="24px"
            icon={<MdShuffle />}
            onClick={handleShuffle}
            outline="none"
            variant="link"
          />
          <IconButton
            aria-label="skip previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
            outline="none"
            variant="link"
          />
          {playing ? (
            <IconButton
              aria-label="pause"
              color="white"
              fontSize="40px"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
              outline="none"
              variant="link"
            />
          ) : (
            <IconButton
              aria-label="play"
              color="white"
              fontSize="40px"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
              outline="none"
              variant="link"
            />
          )}
          <IconButton
            aria-label="skip next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
            outline="none"
            variant="link"
          />
          <IconButton
            aria-label="repeat"
            color={repeat ? 'white' : 'gray.600'}
            fontSize="24px"
            icon={<MdOutlineRepeat />}
            onClick={handleRepeat}
            outline="none"
            variant="link"
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              /* eslint-disable-next-line jsx-a11y/aria-proptypes */
              aria-label={['min', 'max']}
              id="player-range"
              onChange={onSeek}
              onChangeEnd={() => setIsSeeking(false)}
              onChangeStart={() => setIsSeeking(true)}
              step={0.1}
              min={0}
              // @ts-ignore
              max={duration ? duration.toFixed(2) : 0}
              value={[seek]}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
