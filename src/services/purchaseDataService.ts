import authHeader from './auth-header'
import http from './http-common'
import type ItemOrder from '~/types/ItemOrder'
import axios from "redaxios";

const BUY_API_URL = import.meta.env.VITE_url_buy

class PurchaseDataService {
  buy(orders: ItemOrder) {
    const storedUser = localStorage.getItem('user')
    const user = JSON.parse(storedUser || '')
    return http.post(`${BUY_API_URL}?token=${user.accessToken}`, orders)
  }

  displayOrders(id: any) {
    return http.get(`${BUY_API_URL}${id}` )
  }

  updateOrder(id: any, order: ItemOrder) {
    return http.put(`${BUY_API_URL}${id}`, order)
  }
}

export default new PurchaseDataService()
