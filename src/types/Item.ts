export default class Item {
  id!: number
  fileName!: string
  title: string | undefined
  description: string | undefined
  price: number | undefined
  categoryId: number | undefined

  constructor() {
    this.title = undefined
    this.description = undefined
    this.price = undefined
    this.categoryId = undefined
  }
}
