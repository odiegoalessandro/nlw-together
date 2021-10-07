import { extendTheme, Theme, theme } from "@chakra-ui/react"

const customTheme: Theme = {
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Poppins, sans-serif",
    mono: "sans-serif"
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    bold: 700
  },
  ...theme
}

export default extendTheme(customTheme)