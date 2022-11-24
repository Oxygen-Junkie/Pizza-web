<script setup lang="ts">
import type { Ref } from 'vue'
import AuthService from '~/services/authService'

const auth = useAuthStore()
const router = useRouter()

const currentUser = $ref(auth.getUser())

const phone = ref('')
const phones = ref([''])

const message: Ref<string | undefined> = ref()

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
  if (currentUser.roles.includes('ADMIN')) {
    AuthService.getPhones().then((response) => {
      phones.value = response.data
    })
  }

  else { router.push('/') }
}

function setRole() {
  AuthService.setRoles(phone.value, rolez.value.id)
    .then(() => {
      message.value = 'Роль добавлена'
    })
    .catch((e) => {
      message.value = e.data.message
    })
}

function ban() {
  AuthService.ban(phone.value).then(() => {
    message.value = 'Пользователь заблокирован'
  })
    .catch((e) => {
      message.value = e.data.message
    })
}

getPhones()
</script>

<template>
  <label>Введите телефон</label>
  <v-select v-model="phone" class="form-select form-select-sm" style="width: 500px" :options="phones" /><p />
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
  <div v-if="message" class="alert">
    {{ message }}
    <div />
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

