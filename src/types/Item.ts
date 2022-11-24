export default class Item {
  id!: number
  fileName: string
  title: string
  description: string
  price: number
  categoryId!: number

  constructor() {
    this.fileName = ''
    this.title = ''
    this.description = ''
    this.price = 1
  }
}
