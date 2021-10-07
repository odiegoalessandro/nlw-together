import React from "react"
import { Flex, Image, Text, Heading, Input, FormControl, Link as ChakraLink } from "@chakra-ui/react"
import CustomButton from "../../components/Button"
import Link from "next/link"

export default function Room() {
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
        <Heading fontSize="36px">
          Crie uma nova sala
        </Heading>
        <FormControl 
          display="flex"
          flexDir="column"
          w="auto"
          marginTop="32px"
        >
          <Input 
            type="text"
            w="sm"
            placeholder="Nome da sala"
          />
          <CustomButton>
            Criar sala
          </CustomButton>
        </FormControl>
        <Text color="#737380" fontWeight="500">
          Quer entrar em uma sala já existente? {" "}
          <Link href="#">
            <ChakraLink textDecor="underline" color="#E559F9">
              Clique aqui
            </ChakraLink>
          </Link>
        </Text>
      </Flex>
    </Flex>    
  )
}
