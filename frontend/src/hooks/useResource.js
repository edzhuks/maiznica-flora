import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((res) => setResources(res.data))
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((res) => setResources(resources.concat(res.data)))
  }

  const service = {
    create,
  }

  return [resources, service]
}

export default useResource
