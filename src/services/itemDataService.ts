import axios from 'redaxios'
import http from './http-common'

const API_URL = import.meta.env.VITE_url_item
const BASE_URL = import.meta.env.VITE_base_api
const CATEG_API_URL = import.meta.env.VITE_url_category

class ItemDataService {
  getAll() {
    return http.get(`${API_URL}`)
  }

  create(data: any) {
    const storedUser = localStorage.getItem('user')
    const user = JSON.parse(storedUser || '')
    return axios.post(`${BASE_URL}/${API_URL}?token=${user.accessToken}`, data)
  }

  get(id: any) {
    return http.get(`${API_URL}${id}`)
  }

  createCategory(data: any) {
    return http.post(`${CATEG_API_URL}`, data)
  }

  getAllCategories() {
    return http.get(`${CATEG_API_URL}`)
  }
}
export default new ItemDataService()
