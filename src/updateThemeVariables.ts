// TODO: function to replace CSS variables with the theme corresponding to the category
import { ThemeVariableValues } from './types/types'

// --darkest-color: #161a1f;
//   --lightest-color: white;
//   --bg-color: #333a45;
//   --primary-text-color: #939eae;
//   --primary-color: #f44c7f;
//   --secondary-color:#e11251;
//   --highlight-color: #fa8cad;

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
  theme3: {
    darkestColor: '#161a1f',
    lightestColor: 'white',
    bgColor: '#333a45',
    primaryTextColor: '#939eae',
    primaryColor: "#f44c7f",
    secondaryColor: "#e11251",
    highlightColor: "#fa8cad",
    secondHighlightColor: ''
  },
  theme4: {
    darkestColor: '#161a1f',
    lightestColor: 'white',
    bgColor: '#333a45',
    primaryTextColor: '#939eae',
    primaryColor: "#f44c7f",
    secondaryColor: "#e11251",
    highlightColor: "#fa8cad",
    secondHighlightColor: ''
  },
  theme5: {
    darkestColor: '#161a1f',
    lightestColor: 'white',
    bgColor: '#333a45',
    primaryTextColor: '#939eae',
    primaryColor: "#f44c7f",
    secondaryColor: "#e11251",
    highlightColor: "#fa8cad",
    secondHighlightColor: ''
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
  console.log('ran set theme')
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

  //TODO: add the rest of the variables that need to changes
}

export default updateThemeVariables