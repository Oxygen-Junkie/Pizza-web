import { acceptHMRUpdate, defineStore } from 'pinia'
import Item from '~/types/Item'

export const useFlagStore = defineStore('flag', () => {
  const popUpItem = ref(false)
  const popUpPurchase = ref(true)
  const popUpSignIn = ref(false)
  const popUpSignUp = ref(false)
  const shade = ref(false)
  const location = ref('')
  const render = ref(-1)
  let item: Item = new Item()
  let amount = 1

  function closePopUps() {
    popUpItem.value = false
    popUpSignIn.value = false
    popUpSignUp.value = false
    popUpPurchase.value = false
    shade.value = false
  }

  function changePopUpItem(itemz: Item) {
    item = itemz
    popUpItem.value = true
    shade.value = true
  }

  function changePopUpSignIn() {
    popUpSignIn.value = true
    shade.value = true
  }

  function changePopUpPurchase(a: number) {
    popUpPurchase.value = true
    popUpItem.value = false
    shade.value = true
    amount = a
  }

  function changePopUpSignUp() {
    popUpSignUp.value = true
    shade.value = true
  }

  function setLocation(loc: string) {
    location.value = loc
  }

  function getItem() {
    return item
  }

  function rerender() {
    render.value += 1
  }

  return {
    closePopUps,
    changePopUpItem,
    changePopUpSignIn,
    changePopUpSignUp,
    rerender,
    setLocation,
    popUpPurchase,
    changePopUpPurchase,
    shade,
    render,
    popUpItem,
    popUpSignIn,
    popUpSignUp,
    location,
    amount,
    getItem,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFlagStore, import.meta.hot))
