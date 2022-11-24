export default class Item {
  id!: number
  fileName!: string | undefined
  title: string | undefined
  description: string | undefined
  price: number | undefined
  categoryId: number | undefined

  constructor() {
    this.fileName = undefined
    this.title = undefined
    this.description = undefined
    this.price = undefined
    this.categoryId = undefined
  }
}
