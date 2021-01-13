// TODO: function to replace CSS variables with the theme corresponding to the category
import { ThemeVariableValues } from './types/types'

const variableValues:ThemeVariableValues = {
  theme1: {
    primaryColor: "#f44c7f",
    highlightColor: "#fa8cad"
  },
  theme2: {
    primaryColor: "red",
    highlightColor: "red"
  },
  theme3: {
    primaryColor: "green",
    highlightColor: "#91ff91"
  },
  theme4: {
    primaryColor: "pink",
    highlightColor: "pink"
  },
  theme5: {
    primaryColor: "blue",
    highlightColor: "#779aff"
  },
  theme6: {
    primaryColor: "orange",
    highlightColor: "#fae98c"
  }
}

const updateThemeVariables = (theme: keyof ThemeVariableValues): void => {
  console.log('ran set theme')
  document.documentElement.style.setProperty('--primary-color', variableValues[theme].primaryColor)
  if (typeof variableValues[theme].highlightColor === 'string') {
    document.documentElement.style.setProperty('--highlight-color', variableValues[theme].highlightColor)
  }
  //TODO: add the rest of the variables that need to changes
}

export default updateThemeVariables