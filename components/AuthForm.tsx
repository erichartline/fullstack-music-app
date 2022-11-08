import { useState } from 'react'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'

type Props = {
  mode: string
}

const AuthForm = ({ mode }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex justify="center" align="center" height="100px">
        hello
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        form
      </Flex>
    </Box>
  )
}

export default AuthForm
