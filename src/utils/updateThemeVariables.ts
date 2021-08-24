import { ThemeVariableValues } from '@/types/types'
import themeCssVariableValues from "@/utils/themeCssVariableValues"

const updateThemeVariables = (theme: keyof ThemeVariableValues): void => {
  document.documentElement.style.setProperty('--darkest-color', themeCssVariableValues[theme].darkestColor)
  document.documentElement.style.setProperty('--lightestColor', themeCssVariableValues[theme].lightestColor)
  document.documentElement.style.setProperty('--bg-color', themeCssVariableValues[theme].bgColor)
  document.documentElement.style.setProperty('--primary-text-color', themeCssVariableValues[theme].primaryTextColor)
  document.documentElement.style.setProperty('--primary-color', themeCssVariableValues[theme].primaryColor)
  document.documentElement.style.setProperty('--secondary-color', themeCssVariableValues[theme].secondaryColor)
  document.documentElement.style.setProperty('--highlight-color', themeCssVariableValues[theme].highlightColor)
}
  // if (themeCssVariableValues[theme].highlightColor) {
  //   document.documentElement.style.setProperty('--highlight-color', themeCssVariableValues[theme].highlightColor!)
  // }
  // if (themeCssVariableValues[theme].secondaryColor) {
  //   document.documentElement.style.setProperty('--secondary-color', themeCssVariableValues[theme].secondaryColor)
  // }

export default updateThemeVariables