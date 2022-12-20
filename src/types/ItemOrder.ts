export default class ItemOrder {
  id!: number
  amount: number
  fk_product?: number
  itemId: number
  inbound: boolean
  called?: boolean
  location!: [number, number]
  phone: string
  text!: string

  constructor(amount: number, itemId: number, location: [number, number], text: string, phone: string) {
    this.amount = amount
    this.itemId = itemId
    this.fk_product = itemId
    this.inbound = true
    this.location = location
    this.text = text
    this.phone = phone
  }
}

