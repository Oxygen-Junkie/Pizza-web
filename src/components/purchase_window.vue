<script setup lang="ts">
import type { Ref } from 'vue'
import type Item from '~/types/Item'
import type MapPoints from '~/types/MapPoints'
import purchaseDataService from '~/services/purchaseDataService'
import ItemOrder from '~/types/ItemOrder'

const flags = useFlagStore()
const currentUser = useAuthStore()

const item: Ref<{ item: Item; amount: number }> = ref({ item: flags.getItem(), amount: flags.amount })
const imageURL = ref('')
const price: Ref<number> = ref(item.value.item.price * item.value.amount)
const text = ref('')
const phone = ref('')
let point: MapPoints

function retrieveItem() {
  imageURL.value = `${import.meta.env.VITE_base_api.toString()}/${import.meta.env.VITE_url_images.toString()}${item.value.item.fileName}`
}

function confirm() {
  if (currentUser)
    purchaseDataService.buy(new ItemOrder(item.value.amount, item.value.item.id, point.coordinates, `${currentUser.phone}, в помещении${text.value}`))
  else 
  purchaseDataService.buy(new ItemOrder(item.value.amount, item.value.item.id, point.coordinates, `${phone.value}, в помещении${text.value}`))
  flags.closePopUps()
}

function getPoint(coordinate: MapPoints) {
  point = coordinate
}

retrieveItem()
</script>

<template>
  <div class="card">
    <div class="bg-yellow">
      <div class="text-right">
        <button type="button" class="btn-close" @click.prevent="" />
      </div>
    </div>
    <div class="card-container text-center">
      <img
        :src="imageURL"
        class="rounded mx-auto product-img"
      >
      <p><strong class="text-warning">ЗАКАЗ НА {{ price }}рублей</strong></p><br>
      <label for="phone">Укажите номер телефона, <strong> если он различаятся с указанным в профиле</strong></label>
      <input
        v-model="phone"
        name="phone"
        type="tel"
        pattern=""
        placeholder="+79....."
      ><p><small class="text-primary">Неверный формат телефона</small></p><br>
      <label for="">Укажите место доставки (дважды дотроньтесь до экрана на желаемом месте)</label>
      <MarkMap @marked="getPoint" />
      <div>Координаты метки: 69,540 по горизонтали; 83,978 по вертикали </div>
      <input
        v-model="text"
        name="office"
        type="text"
        placeholder="Введите квартиру/офис/помещение"
        style="width: 400px;"
      >
      <button class="badge bg-yellow d-inline-flex" @click="confirm">
        <p i-carbon-delivery />
        <div>&nbsp; Доставить</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  max-width: 350px !important;
  padding: 20px 25px 30px;
}
.card {
  background-color: whitesmoke;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  position:fixed;  z-index: 3;
  top: 30%;
  left: 50%;
  margin-left:-100px;
  margin-top:-130px;
}
.badge {
  font-size: medium;
  margin-top: 20px;
}
</style>
