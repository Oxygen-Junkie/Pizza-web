import authHeader from './auth-header'
import http from './http-common'
import type ItemOrder from '~/types/ItemOrder'

const BUY_API_URL = import.meta.env.VITE_url_buy

class PurchaseDataService {
  buy(orders: ItemOrder) {
    return http.post(`${BUY_API_URL}`, orders)
  }

  displayOrders(id: any) {
    return http.get(`${BUY_API_URL}${id}`, { headers: authHeader() })
  }

  updateOrder(id: any, order: ItemOrder) {
    return http.put(`${BUY_API_URL}${id}`, order, { headers: authHeader() })
  }
}

export default new PurchaseDataService()
