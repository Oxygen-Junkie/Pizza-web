<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import PurchaseDataService from '~/services/purchaseDataService'
import Item from '~/types/Item'
import type ItemOrder from '~/types/ItemOrder'
import MapPoints from '~/types/MapPoints'

const auth = useAuthStore()
const router = useRouter()

const currentUser = $ref(auth.getUser())
const mode: Ref<number> = ref(4)

const orders: Ref<[{ order: ItemOrder; color: string }] | undefined> = ref()
const items: Ref<Item[]> = ref([])
const points: Ref<MapPoints[] | undefined> = ref()

function initiate() {
  if (currentUser.roles.includes('ROLE_MANAGER')) {
    PurchaseDataService.displayOrders(currentUser.id)
      .then((response) => {
        const temp: ItemOrder[] = response.data
        orders.value?.forEach((order, index) => {
          order.order = temp[index]
          order.color = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
          const temb = new MapPoints([1, 1])
          temb.setPoint(order.order.location, order.order.text)
          points.value?.push(temb)
        })
      })

    ItemDataService.getAll()
      .then((response) => {
        items.value = response.data
      })
  }
  else {
    router.push('/')
  }
}

function stopTracking(order: ItemOrder) {
  order.inbound = false
  PurchaseDataService.updateOrder(order.id, order)
}

function findItem(value: ItemOrder) {
  const q: any = items.value.find(item => item.id === value.itemId) || new Item()
  q.amount = value.amount
  return q
}

initiate()
</script>

<template>
  <div v-if="orders">
    <div v-for="order in orders" :key="order.order.id" :style="{ backgroundColor: order.color }">
      <item_palette
        v-if="order.order.inbound"
        :item="findItem(order.order)"
        :mode="mode"
        class="plate"
      />
      <span class="bg-white">{{ ` В количестве: ${order.order.amount} ` }}</span><p />
      <span class="bg-white">{{ ` Номер телефона заказчика: ${order.order.phone} ` }}</span><p />
      <button class="btn btn-primary btn-block bg-blue" @click="stopTracking(order.order)">
        Считать этот товар доставленным
      </button>
    </div>
  </div>
  <MapContainer v-if="points" :coordinates="points" />
</template>

<style scoped>
  .plate {
    height: 200px;
    width: 200px;
  }
</style>
