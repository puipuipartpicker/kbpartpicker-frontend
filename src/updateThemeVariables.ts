import { ThemeVariableValues } from './types/types'

const variableValues:ThemeVariableValues = {
  "8008": {
    darkestColor: '#2a303a',
    lightestColor: 'white',
    bgColor: '#333a45',
    primaryTextColor: '#939eae',
    primaryColor: "#f44c7f",
    secondaryColor: "#e11251",
    highlightColor: "#fa8cad",
    secondHighlightColor: ''
  },
  mizu: {
    darkestColor: '#8eacc0',
    lightestColor: 'white',
    bgColor: '#afcbdd',
    primaryTextColor: '#1a2633',
    primaryColor: "#fcfbf6",
    secondaryColor: "#85a5bb",
    highlightColor: "#bf616a",
    secondHighlightColor: "#793e44"
  },
  modernDolch: {
    darkestColor: '#232425',
    lightestColor: 'white',
    bgColor: '#2d2e30',
    primaryTextColor: '#e3e6eb',
    primaryColor: "#7eddd3",
    secondaryColor: "#54585c",
    highlightColor: "#d36a7b",
    secondHighlightColor: '#994154'
  },
  superuser: {
    darkestColor: '#21242c',
    lightestColor: 'white',
    bgColor: '#262a33',
    primaryTextColor: '#939eae',
    primaryColor: "#43ffaf",
    secondaryColor: "#526777",
    highlightColor: "#ff5f5f",
    secondHighlightColor: '#ff5f5f'
  },
  taro: {
    darkestColor: '#9297c8',
    lightestColor: 'white',
    bgColor: '#b3baff',
    primaryTextColor: '#130f1a',
    primaryColor: "#130f1a",
    secondaryColor: "#00e9e5",
    highlightColor: "#ffe23e",
    secondHighlightColor: '#fff1c3'
  },
  retrocast: {
    darkestColor: '#135459',
    lightestColor: 'white',
    bgColor: '#07737a',
    primaryTextColor: '#ffffff',
    primaryColor: "#88dbdf",
    secondaryColor: "#f3e03b",
    highlightColor: "#ff585d",
    secondHighlightColor: ''
  }
}

const updateThemeVariables = (theme: keyof ThemeVariableValues): void => {
  document.documentElement.style.setProperty('--darkest-color', variableValues[theme].darkestColor)
  document.documentElement.style.setProperty('--lightestColor', variableValues[theme].lightestColor)
  document.documentElement.style.setProperty('--bg-color', variableValues[theme].bgColor)
  document.documentElement.style.setProperty('--primary-text-color', variableValues[theme].primaryTextColor)
  document.documentElement.style.setProperty('--primary-color', variableValues[theme].primaryColor)
  document.documentElement.style.setProperty('--secondary-color', variableValues[theme].secondaryColor)
  document.documentElement.style.setProperty('--highlight-color', variableValues[theme].highlightColor)
  // if (variableValues[theme].highlightColor) {
  //   document.documentElement.style.setProperty('--highlight-color', variableValues[theme].highlightColor!)
  // }
  // if (variableValues[theme].secondaryColor) {
  //   document.documentElement.style.setProperty('--secondary-color', variableValues[theme].secondaryColor)
  // }
}

export default updateThemeVariables