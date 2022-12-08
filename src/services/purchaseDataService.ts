import http from './http-common'
import type ItemOrder from '~/types/ItemOrder'
import { getDigits } from '~/middleware/utilities'

const BUY_API_URL = import.meta.env.VITE_url_buy

class PurchaseDataService {
  buy(orders: ItemOrder) {
    orders.phone = getDigits(orders.phone)
    return http.post(`${BUY_API_URL}?token=0`, orders)
  }

  displayOrders() {
    return http.get(`${BUY_API_URL}`)
  }

  updateOrder(id: any, order: ItemOrder) {
    return http.put(`${BUY_API_URL}${id}`, order)
  }
}

export default new PurchaseDataService()
