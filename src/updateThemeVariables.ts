// TODO: function to replace CSS variables with the theme corresponding to the category
import { ThemeVariableValues } from './types/types'

const variableValues:ThemeVariableValues = {
  theme1: {
    primaryColor: "gray"
  },
  theme2: {
    primaryColor: "red"
  },
  theme3: {
    primaryColor: "green"
  },
  theme4: {
    primaryColor: "pink"
  },
  theme5: {
    primaryColor: "blue"
  },
  theme6: {
    primaryColor: "orange"
  }
}

const updateThemeVariables = (theme: keyof ThemeVariableValues): void => {
  console.log('ran set theme')
  document.documentElement.style.setProperty('--primary-color', variableValues[theme].primaryColor)
  //TODO: add the rest of the variables that need to change
}

export default updateThemeVariables