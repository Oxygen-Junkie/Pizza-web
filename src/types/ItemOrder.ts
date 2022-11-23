export default class ItemOrder {
  id!: number
  amount: number
  itemId: number
  inbound: boolean
  location!: [number, number]
  phone: string
  text!: string

  constructor(amount: number, itemId: number, location: [number, number], text: string, phone: string) {
    this.amount = amount
    this.itemId = itemId
    this.inbound = true
    this.location = location
    this.text = text
this.phone = phone
  }
}

