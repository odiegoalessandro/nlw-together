import { Flex, Text, Image } from "@chakra-ui/react"
import React from "react"

export default function Comment({ author, content, children }){
  let bgColor = ""
  if(content.isHighlighted && !content.isAnswered){
    bgColor="#f4f8ff"
  }
  else if(content.isAnswered){
    bgColor="#dcddcc"
  }
  else{
    bgColor="#fefefe"
  }

  return(
    <Flex
      maxW="800px"
      minH="140px"
      maxH="auto"
      backgroundColor={bgColor}
      border={content.isHighlighted && !content.isAnswered ? "1px solid #835afd" : "none"}
      flexDir="column"
      borderRadius="8px"
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