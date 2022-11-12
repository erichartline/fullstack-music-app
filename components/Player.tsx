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

type Props = {
  activeSong: {
    url: string
  }
  songs: []
}

const Player = ({ activeSong, songs }: Props) => {
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)

  const setPlayState = (value) => setPlaying(value)

  const handleShuffle = () => setShuffle((state) => !state)

  const handleRepeat = () => setRepeat((state) => !state)

  return (
    <Box>
      <ReactHowler playing={playing} src={activeSong?.url} />
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
            <Text fontSize="xs">1:21</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              /* eslint-disable-next-line jsx-a11y/aria-proptypes */
              aria-label={['min', 'max']}
              id="player-range"
              step={0.1}
              min={0}
              max={321}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">5:44</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
