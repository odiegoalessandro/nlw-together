import { ChakraProvider } from "@chakra-ui/react"
import GlobalStyles from "../style/GlobalStyles"
import theme from '../themes/chakra-theme'
import { AuthContextProvider } from "../contexts/AuthContext"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Component {...pageProps} />
        <GlobalStyles />
      </AuthContextProvider>
    </ChakraProvider>
    )
}

export default MyApp
