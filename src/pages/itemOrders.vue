<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import PurchaseDataService from '~/services/purchaseDataService'
import type Item from '~/types/Item'
import ItemOrder from '~/types/ItemOrder'
import MapPoints from '~/types/MapPoints'
import { prettifyNumber } from '~/middleware/utilities'

const auth = useAuthStore()
const router = useRouter()
const manager = import.meta.env.VITE_manager

const currentUser = $ref(auth.getUser())
const mode: Ref<number> = ref(4)
const rerender = ref(true)

const orders: Ref<{ order: ItemOrder; color: string }[]> = ref([{ order: new ItemOrder(1, 1, [1, 1], '', ''), color: '' }])
const items: Ref<Item[]> = ref([])
const points: Ref<MapPoints[]> = ref([])

const showManagerBoard = () => {
  if (currentUser && currentUser.roles)
    return currentUser.roles.includes(manager)

  return false
}

function initiate() {
  if (showManagerBoard()) {
    PurchaseDataService.displayOrders()
      .then((response) => {
        const temp: ItemOrder[] = response.data
        temp.forEach((value, index) => {
          if (value.inbound) {
            const color = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
            orders.value?.push({ order: value, color })
            const temb = new MapPoints(value.location)
            temb.text = value.text
            temb.color = color
            points.value?.push(temb)
          }
        })
      })

    ItemDataService.getAll()
      .then((response) => {
        items.value = response.data
      })
  }
  else {
    alert('5 баллов, умник')
    const mp3_url = 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3';

    (new Audio(mp3_url)).play()
    router.push('/')
  }
}

function stopTracking(order: ItemOrder) {
  order.inbound = false

  PurchaseDataService.updateOrder(order.itemId, order)
  points.value = []
  initiate()
  rerender.value = false
  rerender.value = true
}

function called(order: ItemOrder) {
  order.called = true

  PurchaseDataService.updateOrder(order.itemId, order)
  points.value = []
  initiate()
  rerender.value = false
  rerender.value = true
}

function findItem(value: ItemOrder) {
  const q = items.value.find(item => item.id === value.fk_product)
  if (q) {
    const q: any = items.value.find(item => item.id === value.fk_product)
    q.amount = value.amount
    return q
  }
  else {
    return q
  }
}

initiate()
</script>

<template>
  <MapContainer v-if="(points[0] || rerender)" :coordinates="points" />
  <div v-if="orders">
    <div v-for="order in orders" :key="order?.order.id" :style="{ backgroundColor: order?.color }">
      <div v-if="order && order.order.inbound">
        <item_palette
          v-if="order.order.inbound"
          :item="findItem(order.order)"
          :mode="mode"
          class="plate"
        />
        <div v-else style="backgroundColor: white">
          Предмет был удален
        </div>
        <span class="bg-white">{{ ` Стоимостью: ${order.order.amount * findItem(order.order).price} ` }}</span><p />
        <span class="bg-white">{{ ` Номер телефона заказчика: ${prettifyNumber(order.order.phone)} ` }}</span><p />
        <div v-if="order.order.called">
          <strong>Подтверждено звонком!</strong>
        </div>
        <div>
          <button class="badge bg-red d-inline-flex" @click="called(order.order)">
            <p i-carbon-phone />
            <div>&nbsp; Подтвердить звонок</div>
          </button>
        </div>
        <button class="btn btn-primary btn-block bg-blue" @click="stopTracking(order.order)">
          Считать этот товар доставленным
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .plate {
    height: 200px;
    width: 200px;
  }
</style>
