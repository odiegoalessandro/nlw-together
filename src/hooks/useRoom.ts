import { useState, useEffect } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likes: Record<string, {
    authorId: string
  }>
}>

type Question = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

export function useRoom(id: string){
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`)

    roomRef.on("value", snapshot => {
      const room = snapshot.val()
      const firebaseQuestions: FirebaseQuestions = room.questions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.entries(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })

      setTitle(room.title)
      setQuestions(parsedQuestions)
    })

    return () => roomRef.off("value")

  }, [id, user?.id])

  return {questions, title}
}