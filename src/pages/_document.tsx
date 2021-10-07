import { ColorModeScript, extendTheme, ThemeConfig } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
}

const theme = extendTheme({ config })

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}