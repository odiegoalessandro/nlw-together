import { createContext, ReactNode, useState, useEffect } from 'react'
import { auth, firebase } from "../services/firebase"

interface User {
  id: string
  name: string
  avatar: string
}

interface AuthContextType {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<User>()
  
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }

    })
    return () => {
      unsubscribed()
    }
  }, [])

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)
  
    if(result.user){
      const { uid, displayName, photoURL } = result.user

      if(!displayName || !photoURL){
        throw new Error("Missing information from google account")
      }

      setUser({
        id: uid,
        avatar: photoURL,
        name: displayName
      })
    }
  }

  return (
    <AuthContext.Provider value={{signInWithGoogle, user}}>
      {props.children}
    </AuthContext.Provider>
  )
}