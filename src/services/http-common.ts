import axios from 'redaxios'

const apiHandler = axios.create({
  baseURL: import.meta.env.VITE_base_api,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiHandler
