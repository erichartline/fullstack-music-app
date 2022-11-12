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

const Player = () => {
  return (
    <Box>
      {/* <ReactHowler /> */}
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
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
          <IconButton
            aria-label="play"
            color="white"
            fontSize="40px"
            icon={<MdOutlinePlayCircleFilled />}
            outline="none"
            variant="link"
          />
          <IconButton
            aria-label="pause"
            fontSize="40px"
            icon={<MdOutlinePauseCircleFilled />}
            outline="none"
            variant="link"
          />
          <IconButton
            aria-label="skip next"
            fontSize="24px"
            icon={<MdSkipNext />}
            outline="none"
            variant="link"
          />
          <IconButton
            aria-label="repeat"
            fontSize="24px"
            icon={<MdOutlineRepeat />}
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
