import { GetStaticPaths, GetStaticProps } from "next"
import { Box, Flex, Heading, Image, Text, Button } from "@chakra-ui/react"
import RoomCode from "../../../components/RoomCode"
import React from "react"
import { database } from "../../../services/firebase"
import Comment from "../../../components/Comment"
import { useRoom } from "../../../hooks/useRoom"
import { useRouter } from "next/router"

export default function Id({ id }){
  const { title, questions } = useRoom(id)
  const router = useRouter()

  async function handleDeleteQuestion(questionId: string) {
    if(confirm("tem certeza que deseja apagar esta pergunta?")){
      await database.ref(`rooms/${id}/questions/${questionId}`).remove()
    }
  }

  async function handleDeleteRoom(roomId: string){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })
    router.push('/')
  }

  return(
    <Box backgroundColor="#F8F8F8" minH="100vh">
      <Flex
        borderBottom="1px solid #e2e2e2"
        justifyContent="space-around"
        p="24px"
        w="full"
        m="0 auto"
        alignItems="center"
        as="header"
      >
        <Image maxH="40px" src="/logo.svg" />
        <Box>
          <RoomCode code={id} />
          <Button 
            marginLeft="16px"
            borderColor="#835AFD"
            color="#835AFD"
            variant="outline"
            onClick={() => handleDeleteRoom(id)}
          >
            Encerrar a sala
          </Button>
        </Box>
      </Flex>
      <Flex
        w="100vw"
        as="main"
        maxW="800px"
        m="0 auto"
        flexDir="column"
      >
        <Box
          m="32px 0 24px"
          display="flex"
          alignItems="center"
        >
          <Flex>
            <Heading 
              fontSize="24px"
              color="#29292e"
              marginRight="8px"
            >
              Sala {title}
            </Heading>
            {
              questions.length > 0 && (
                <Text
                  as="span"
                  backgroundColor="#E559F9"
                  color="#fff"
                  borderRadius="16px"
                  p="4px 8px"
                  fontWeight="500"
                >
                  {questions.length} perguntas
                </Text>
              )
            }
          </Flex>
        </Box>
      </Flex>
      <Flex
        marginTop="32px"
        as="footer"
        justifyContent="center"
        flexDir="column"
        align="center"
      >
        {
          questions.length > 0 ? (
            questions.map((question, index) => {
              const content = {
                text: question?.content,
                id: question?.id,
                isHighlighted: question?.isHighlighted,
                isAnswered: question?.isAnswered, 
              } 

              return (
                <Comment
                  content={content}
                  author={question.author}
                  key={index} 
                >
                  <Button
                    background="transparent"
                    _hover={{}}
                  >
                    <Image src="/check.svg" alt="respondida" />
                  </Button>
                  <Button
                    background="transparent"
                    _hover={{}}
                  >
                    <Image src="/answer.svg" alt="" />
                  </Button>
                  <Button
                    background="transparent"
                    _hover={{}}
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <Image src="/delete.svg" alt="deletar" />
                  </Button>
                </Comment>
              )
            })
          ) : (
            <>
              <Image src="/empty-questions.svg" />
              <Heading 
                fontSize="xl"
                marginTop="16px"  
              >
                Nenhuma pergunta por aqui...
              </Heading>
              <Text 
                w="284px"
                textAlign="center"
                fontSize="14px"
                color="#737380"
              >
                Envie o codigo desta sala para seus amigos e começe a responder perguntas
              </Text>
            </>
          )
        }
      </Flex>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = (context) => {

  return{
    props: {
      ...context.params
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return{
    fallback: "blocking",
    paths: []
  }
}