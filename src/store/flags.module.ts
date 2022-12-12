import { acceptHMRUpdate, defineStore } from 'pinia'
import type Item from '~/types/Item'

export const useFlagStore = defineStore('flag', () => {
  const popUpItem = ref(false)
  const popUpPurchase = ref(false)
  const popUpSignIn = ref(false)
  const popUpSignUp = ref(false)
  const popUpSuccess = ref(false)
  const number = ref('')
  const shade = ref(false)
  const location = ref('')
  const render = ref(-1)
  let item: Item
  let amount = 1

  function closePopUps() {
    popUpItem.value = false
    popUpSignIn.value = false
    popUpSignUp.value = false
    popUpPurchase.value = false
    popUpSuccess.value = false
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

  function changePopUpSuccess(numberz: string) {
    number.value = numberz
    popUpSuccess.value = true
    popUpPurchase.value = false
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
    changePopUpSuccess,
    rerender,
    setLocation,
    popUpPurchase,
    changePopUpPurchase,
    shade,
    render,
    popUpItem,
    popUpSignIn,
    popUpSignUp,
    popUpSuccess,
    location,
    amount,
    number,
    getItem,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFlagStore, import.meta.hot))
