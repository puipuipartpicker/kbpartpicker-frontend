import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'

const useValidImage = (imgUrl:string) => {
  const [response, setResponse] = useState(false)
  useEffect(() => {
    axios.get(imgUrl)
      .then(resp => setResponse(true))
      .catch(resp => setResponse(false))
  }, [imgUrl])

  return { response }
}

export default useValidImage