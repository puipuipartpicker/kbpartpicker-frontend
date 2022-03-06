import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

// export const getProductByID = (id:string) => {
//   axios.get(`${process.env.REACT_APP_API_URL || "https://kbpartpicker-api-prd.herokuapp.com"}/products/${id}`)
// }

export function useUpdateUrlParameter(paramToSet:string, newParamValue: string):void {
  const history = useHistory()
  const currentUrlParameters = history.location.search
  if (currentUrlParameters) {
    if (new RegExp(`${paramToSet}=`).test(currentUrlParameters)) {
      const appendedParameters = currentUrlParameters.replace(new RegExp(`${paramToSet}=[^&]*`), `sel=${newParamValue}`)
      history.push(appendedParameters)
    } else {
      const appendedParameters = currentUrlParameters.replace(/$/, `&sel=${newParamValue}`)
      history.push(appendedParameters)          
    }
  } else {
    const appendedParameters = currentUrlParameters.replace(/$/, `?sel=${newParamValue}`)
    history.push(appendedParameters)
  }
}

export function handleParameterUpdate(currentUrlParameters:string, paramToSet:string, newParamValue:string):string {
  if (currentUrlParameters) {
    if (new RegExp(`${paramToSet}=`).test(currentUrlParameters)) {
      return currentUrlParameters.replace(new RegExp(`${paramToSet}=[^&]*`), `${paramToSet}=${newParamValue}`)

    } else {
      return currentUrlParameters.replace(/$/, `&${paramToSet}=${newParamValue}`)   
    }
  } else {
    if (newParamValue) {
      return currentUrlParameters.replace(/$/, `?${paramToSet}=${newParamValue}`)
    } else {
      return currentUrlParameters
    }
  }
}