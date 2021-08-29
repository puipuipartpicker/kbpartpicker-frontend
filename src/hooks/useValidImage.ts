import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'

const useValidImage = (imgUrl:string, replaceRegex?:RegExp, replaceTo?:string) => {
  const [validImage, setValidImage] = useState(false)
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    setNewUrl('')
    if (replaceRegex?.test(imgUrl) && replaceTo) {
      // sees if the image src can be augmented to return a different resolution image
      axios.get(imgUrl.replace(replaceRegex, replaceTo))
        .then(resp => {
          if (resp) {
            setNewUrl(prevUrl => imgUrl.replace(replaceRegex, replaceTo))
            setValidImage(true)
          } else {
            setValidImage(false)
          }
      }).catch(resp => {
        setValidImage(false)
        axios.get(imgUrl)
        .then(resp => setValidImage(true))
        .catch(resp => setValidImage(false))
      })
    } else {
      axios.get(imgUrl)
      .then(resp => setValidImage(true))
      .catch(resp => setValidImage(false))
    }
  }, [imgUrl])

  const returnUrl = newUrl ? newUrl : imgUrl
  
  return { validImage, returnUrl }
}

export default useValidImage