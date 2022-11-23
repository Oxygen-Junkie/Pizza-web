import { acceptHMRUpdate, defineStore } from 'pinia'
import CartItem from '~/types/CartItem'
import type Item from '~/types/Item'
import cartService from '~/services/cartDataService'
const auth = useAuthStore()

const storedBin = localStorage.getItem('basket')
const currentUser = $ref(auth.getUser())

export const useBinStore = defineStore('bin', () => {
  let cartz: CartItem[] = storedBin ? JSON.parse(storedBin) : []
  if (currentUser) {
    cartService.getItems()
      .then((response) => {
        cartz = response.data
        // console.log(items.value)
      })
      // .catch((e) => {
    // console.log(e)
      // })
  }

  function addItemToBin(item: Item, amount: number): void {
    cartz.push(new CartItem(item.id, amount))
    if (currentUser)
      cartService.add(new CartItem(item.id, amount))
    localStorage.removeItem('basket')
    localStorage.setItem('basket', JSON.stringify(cartz))
  }

  function removeItemById(id: any): void {
    cartz.forEach((Item, index) => {
      if (Item.id === id)
        cartz.splice(index)
    })
    if (currentUser)
      cartService.remove(id)

    localStorage.removeItem('basket')
    localStorage.setItem('basket', JSON.stringify(cartz))
  }

  function findById(id: number) {
    return cartz.filter((value: CartItem) => value.itemId === id)
  }

  return {
    addItemToBin,
    cartz,
    removeItemById,
    findById,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBinStore, import.meta.hot))
