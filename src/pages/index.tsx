import { FormEvent, useState } from "react"
import { Flex, Image, Text, Heading, Button, Input, FormControl } from "@chakra-ui/react"
import CustomButton from '../components/Button'
import { useRouter } from "next/router"
import { useAuth } from "../hooks/useAuth"
import { database } from "../services/firebase"

export default function Home() {
  const [codeRoom, setCodeRoom] = useState('')
  const { user, signInWithGoogle } = useAuth()
  
  const router = useRouter()

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle()
    }

    router.push('rooms/new')
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault()

    if(codeRoom.trim() === ""){
      return 
    }

    const roomRef = database.ref(`rooms/${codeRoom}`).get()

    if(!(await roomRef).exists()){
      alert("Room does exists")
      return
    }

    if((await roomRef).val()){
      alert("Room already closed")
      return 
    }

    router.push(`/rooms/${codeRoom}`)
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
          onSubmit={handleJoinRoom}
        >
          <Input 
            type="text"
            w="sm"
            placeholder="Digite o codigo para entrar na sala"
            value={codeRoom}
            onChange={event => setCodeRoom(event.target.value)}
          />
          <CustomButton 
            type="submit"
            onClick={handleJoinRoom}
            style={{
              marginTop: "24px"
            }}
          >
            Entrar na sala
          </CustomButton>
        </FormControl>
      </Flex>
    </Flex>    
  )
}
