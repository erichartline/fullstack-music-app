import { ReactNode } from 'react'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  color: string
  description: string
  image: string
  roundImage: boolean
  subtitle: string
  title: string
}

const GradientLayout = ({
  children,
  color,
  description,
  image,
  roundImage,
  subtitle,
  title,
}: Props) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="xs" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="xs">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
