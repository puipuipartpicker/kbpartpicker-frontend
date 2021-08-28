import axios from "axios";

const checkIfImageLoads = async (imgUrl: string) => {
  const imgRequestResponse = await axios.get(imgUrl).then(resp => true).catch(resp => false)
  return imgRequestResponse
}

export default checkIfImageLoads