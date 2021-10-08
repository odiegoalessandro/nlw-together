import { Flex, Heading, Button, Text, Image, Box } from "@chakra-ui/react"

export default function RoomCode({ code }){
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)
  }
  
  return(
    <Button 
      onClick={copyRoomCodeToClipboard}
      h="40px"
      maxW="300px"
      borderRadius="8px"
      p="0"
      overflow="hidden"
      background="#fff"
      border="1px solid #853afd"
      justifyContent="space-between"
    >
      <Flex 
        backgroundColor="#853afc"
        h="full"
        p="0 12px"
        justifyContent="center"
        alignItems="center"
      >
        <Image src="/copy.svg" alt="copiar" />
      </Flex>
      <Text p="0 6px">Sala #{code}</Text>
    </Button>
  )
}