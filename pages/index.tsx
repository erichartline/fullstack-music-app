import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/GradientLayout'
import prisma from '../lib/prisma'

type Props = {
  artists: Array<{
    id: string
    name: string
  }>
}

const Home = ({ artists }: Props) => {
  return (
    <GradientLayout
      color="purple"
      subtitle="profile"
      title="Art Vandelay"
      description="15 public playlists"
      image="https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="lg">{artist.name}</Text>
                  <Text fontSize="xs">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: {
      artists,
    },
  }
}

export default Home
