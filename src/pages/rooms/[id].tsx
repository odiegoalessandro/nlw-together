import { GetStaticPaths, GetStaticProps } from "next"
import { Box, Flex, Heading, Image, Text, Textarea, FormControl, Button } from "@chakra-ui/react"
import RoomCode from "../../components/RoomCode"
import React, { FormEvent, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import CustomButton from "../../components/Button"
import { database } from "../../services/firebase"
import Comment from "../../components/Comment"
import { useRoom } from "../../hooks/useRoom"


export default function Id({ id }){
  const { user } = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const { title, questions } = useRoom(id)
  console.log(title)

  async function handleSendNewQuestion(event: FormEvent){

    event.preventDefault()

    if(newQuestion.trim() === ""){
      return 
    }

    if(!user){
      return
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${id}/questions`).push(question)
    setNewQuestion('')
  }

  async function handleLike(questionId: string, likeId: undefined | string){
    if(likeId){
      await database.ref(`rooms/${id}/questions/${questionId}/likes/${likeId}`).remove()
    } else{
      await database.ref(`rooms/${id}/questions/${questionId}/likes`).push({
        authorId: user?.id
      })
    }
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
        <RoomCode code={id} />
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
        <FormControl onSubmit={handleSendNewQuestion}>
          <Textarea 
            placeholder="O que você quer perguntar?"
            backgroundColor="#fefefe"
            color="#737380"
            minH="130px"
            border="0"
            resize="vertical"
            boxShadow="0 2px 12px rgba(0, 0, 0, 0.04)"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />
          <Box 
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="16px"
          >
            {
              user ? (
                <Flex
                  alignItems="center"
                >
                  <Image 
                    src={user.avatar}
                    w="32px"
                    h="32px"
                    borderRadius="50%"
                  />
                  <Text
                    marginLeft="8px"
                    color="#29292e"
                    fontWeight="500"
                    fontSize="14px"
                  >
                    {user.name}
                  </Text>
                </Flex>
              ) : (
                <Text
                  fontSize="14px"
                  color="#737380"
                  fontWeight="500"
                >
                  Para enviar uma pergunta, {" "}
                  <Button 
                    fontSize="14px"
                    backgroundColor="transparent"
                    color="#835AFD"
                    textDecor="underline"
                    p="0"
                    _hover={{}}
                  >
                    faça seu login
                  </Button>
                </Text>
              )
            }
            <CustomButton 
              onClick={handleSendNewQuestion}
              type="submit"
              disabled={!user}
            >
              Enviar pergunta
            </CustomButton>
          </Box>
        </FormControl>
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

              console.log(content)
              return(
                <Comment content={content} author={question.author} key={index}>
                    <Button
                      _hover={{}}
                      backgroundColor="transparent"
                      color="#737380"
                      fontWeight="400"
                      fontFamily="Poppins, sans-serif"
                      onClick={() => handleLike(question.id, question.likeId)}
                      type="button"
                    >
                      <Image src="/like.svg" alt="like" />
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