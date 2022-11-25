<script setup lang="ts">
import type { Ref } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import type MapPoints from '~/types/MapPoints'
import purchaseDataService from '~/services/purchaseDataService'
import ItemOrder from '~/types/ItemOrder'

const flags = useFlagStore()
const currentUser = useAuthStore()

const temp: any = flags.getItem()
temp.amount = flags.amount
const item = ref(temp)
const price: Ref<number> = ref(temp.price * temp.amount)
const text = ref('')
const phone = ref('')
let point: MapPoints | undefined
const successful = ref(false)
const message: Ref<string | undefined> = ref()

const phoneRules = ref(yup.string().required('Требуется номер телефона!').phone('RU', true, 'Номер телефона указан неверно'))

function confirm() {
  if (point) {
    text.value = text.value === '' ? 'не указано' : text.value
    if (phone.value) {
      purchaseDataService.buy(new ItemOrder(item.value.amount, item.value.id, point.coordinates, `${phone.value}, в помещении ${text.value}`, phone.value))
        .then(() => {
          flags.closePopUps()
        },
        (error) => {
          message.value = error.data.message
          successful.value = false
        })
    }
    else if (currentUser.isLoggedIn()) {
      purchaseDataService.buy(new ItemOrder(item.value.amount, item.value.id, point.coordinates, `${currentUser.getUser().phone}, в помещении ${text.value}`, currentUser.getUser().phone))
        .then(() => {
          flags.closePopUps()
        },
        (error) => {
          message.value = error.data.message
          successful.value = false
        })
    }
    else { message.value = 'Телефон не известен' }
  }
  else {
    message.value = 'Укажите место доставки'
  }
}

function getPoint(coordinate: MapPoints) {
  point = coordinate
}
</script>

<template>
  <div class="card">
    <div class="bg-yellow">
      <div class="text-right">
        <button type="button" class="btn-close" @click.prevent="flags.closePopUps" />
      </div>
    </div>
    <div class="card-container text-center">
      <item_palette
        :item="item"
        :mode="4"
      />
      <p><strong class="text-warning">ЗАКАЗ НА {{ price }}рублей</strong></p><br>
      <div class="form-group">
        <Form>
          <label for="phone">Укажите номер телефона, <strong v-if="currentUser.isLoggedIn()"> если он различается с указанным при регистрации</strong></label>
          <Field
            v-model="phone"
            name="phone"
            type="tel"
            pattern=""
            placeholder="+79....."
            :rules="phoneRules"
          />
          <ErrorMessage name="phone" class="text-red error-feedback" />
        </Form>
      </div>
      <br>
      <label style="width: 300px">Укажите место доставки</label>
      <MarkMap @marked="getPoint" />
      <input
        v-model="text"
        name="office"
        type="text"
        placeholder="Введите квартиру/офис/помещение"
        maxlength="4"
        style="width: 300px;
"
      >
      <button class="badge bg-yellow d-inline-flex" @click="confirm">
        <p i-carbon-delivery />
        <div>&nbsp; Доставить</div>
      </button>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
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
