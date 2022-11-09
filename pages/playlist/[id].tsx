import { Box } from '@chakra-ui/layout'
import GradientLayout from '../../components/GradientLayout'
import prisma from '../../lib/prisma'
import { validateToken } from '../../lib/auth'

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color="red"
      description=""
      image=""
      roundImage
      subtitle=""
      title=""
    >
      <Box>{playlist.name}</Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id, // playlist id
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: {
      playlist,
    },
  }
}

export default Playlist
