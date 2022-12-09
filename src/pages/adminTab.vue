<script setup lang="ts">
import type { Ref } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '~/services/authService'
import { checkPhone, getDigits } from '~/middleware/utilities'

const auth = useAuthStore()
const router = useRouter()
const phoneRules = ref(yup.string().required('Требуется номер телефона!').phone('RU', true, 'Номер телефона указан неверно'))

const currentUser = $ref(auth.getUser())

const phone = ref('')
const phones = ref([''])

const successful = ref(false)
const message: Ref<string | undefined> = ref()
const admin = import.meta.env.VITE_administrator

const showAdminBoard = () => {
  if (currentUser && currentUser.roles)
    return currentUser.roles.includes(admin)

  return false
}

const roles = ref([{
  id: 2,
  name: 'Менеджер',
},
{
  id: 3,
  name: 'Администратор',
}])

const rolez: Ref<{
  id: number
  name: string
}> = ref({
  id: 2,
  name: 'Менеджер',
})

function getPhones() {
  if (showAdminBoard()) {
    AuthService.getPhones()
      .then((response) => {
        phones.value = response.data
        successful.value = true
      },
      (error) => {
        successful.value = false
        message.value = error.data.message
      })
  }

  else {
    alert('5 баллов, умник')
    const mp3_url = 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3';

    (new Audio(mp3_url)).play()
    router.push('/')
  }
}

function setRole() {
  if (phones.value.includes(phone.value)) {
    AuthService.setRoles(phone.value, rolez.value.id)
      .then(() => {
        message.value = 'Роль добавлена'
        successful.value = true
      },
      (error) => {
        successful.value = false
        message.value = error.data.message
      })
  }
  else {
    successful.value = false
    message.value = 'Телефон не зарегистрирован в системе'
  }
}

function ban() {
  if (checkPhone(phone.value)) {
    AuthService.ban(getDigits(phone.value)).then(() => {
      message.value = 'Пользователь заблокирован'
      successful.value = true
    },
    (error) => {
      successful.value = false
      message.value = error.data.message
    })
  }
  else {
    successful.value = false
    message.value = 'Телефон не может быть указан'
  }
}

getPhones()
</script>

<template>
  <Form>
    <label for="phone">Введите телефон</label> <p />
    <Field
      v-model.trim="phone"
      name="phone"
      type="tel"
      pattern=""
      placeholder="+79....."
      :rules="phoneRules"
      style="width: 500px"
    />
    <ErrorMessage name="phone" class="text-red error-feedback" />
  </Form>
  <label>Укажите роль</label>
  <select v-model="rolez" class="form-select">
    <option default disabled>
      Менеджер
    </option>
    <option v-for="role in roles" :key="role.id" :value="role">
      {{ role.name }}
    </option>
  </select><p />
  <div class="d-inline">
    <button class="btn bg-green" @click.prevent="setRole">
      Назначить роль
    </button>
    <button class="btn bg-red" @click.prevent="ban">
      Запретить совершить покупки
    </button>
  </div>
  <div
    v-if="message"
    class="alert"
    :class="successful ? 'alert-success' : 'alert-danger'"
  >
    {{ message }}
  </div>
</template>

  <style scoped>
  .form-select {
    width: 500px;
  }
  button {
    margin: 5px;
  }
</style>

