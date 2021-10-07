import React from "react"
import { Flex, Image, Text, Heading, Button, Input, FormControl } from "@chakra-ui/react"
import CustomButton from '../components/Button'
import { useRouter } from "next/router"
import { useAuth } from "../hooks/useAuth"

export default function Home() {
  const router = useRouter()
  const { user, signInWithGoogle } = useAuth()
  
  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle()
    }

    router.push('rooms/new')
  }
  
  return (
    <Flex
      alignItems="stretch"
      h="100vh"
    >
      <Flex
        backgroundColor="#825AF5"
        flex="7"
        justifyContent="center"
        flexDir="column"
        p="120px 88px"
        color="white"
      >
        <Image src="/illustration.svg" alt="perguntas" alignSelf="flex-startf" />
        <Heading 
          as="h1"
          fontSize="36px"
          lineHeight="46px"
          marginTop="16px"
        >
          Toda pergunta tem uma respota
        </Heading>
        <Text 
          opacity=".7"
          fontSize="26px"
          lineHeight="32px"
          marginTop="16px"
          color="#f8f8f8"
        >
          Aprenda e compartilhe conhecimento com outras pessoas
        </Text>
      </Flex>
      <Flex
        flex="8"
        flexDir="column"
        p="0 32px"
        justify="center"
        align="center"
      >
        <Image src="/logo.svg" alt="letmeask" alignSelf="center" />
        <Button 
          colorScheme="red"
          color="white"
          marginTop="16px"
          w="sm"
          onClick={handleCreateRoom}
        >
          <Image src="/google-icon.svg" alt="logo da google" marginRight="10px" />
          Crie uma sala com o google
        </Button>
        <Text
          color="#a8a8b2"
        >
          Ou entre em uma sala
        </Text>
        <FormControl 
          display="flex"
          flexDir="column"
          w="auto"
        >
          <Input 
            type="text"
            w="sm"
            placeholder="Digite o codigo para entrar na sala"
          />
          <CustomButton>
            Entrar na sala
          </CustomButton>
        </FormControl>
      </Flex>
    </Flex>    
  )
}
