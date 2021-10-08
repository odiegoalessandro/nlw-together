import { Flex, Text, Button, Image } from "@chakra-ui/react"
import React from "react"

export default function Comment({ author, content, children }){
  return(
    <Flex
      maxW="800px"
      h="152px"
      backgroundColor="#fefefe"
      flexDir="column"
      p="16px"
      w="full"
      marginBottom="16px"
      boxShadow="0 2px 12px rgba(0, 0, 0, 0.04)"
    >
      <Text color="#29292E" flex="1">
        {content.text}
      </Text>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Image 
            w="32px"
            h="32px"
            borderRadius="50%"
            src={author.avatar}
            alt="avatar"
          />
          <Text color="#737380" fontSize="14px" marginLeft="8px">
            {author.name}
          </Text>
        </Flex>
        <Flex align="center">
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}