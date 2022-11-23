<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth.module'
import 'yup-phone'
import { useFlagStore } from '~/store/flags.module'

const auth = useAuthStore()
const flags = useFlagStore()
const router = useRouter()

const loading = ref(false)
const successful = ref(false)
const message = ref('')

const schema = yup.object().shape({
  phone: yup.string().required('Требуется номер телефона!').phone('RU', true, 'Номер телефона указан неверно'),
  password: yup.string().required('Требуется пароль!'),
})
const isLoggedIn = $ref(auth.isLoggedIn())

onMounted(() => {
  if (isLoggedIn) {
    router.push('/profile')
    flags.closePopUps()
  }
})

function handleRegister(user: any) {
  loading.value = true
  message.value = ''

  const phone = user.phone
  const password = user.password

  if (phone && password) {
    auth.register({ phone, password }).then(
      () => {
        message.value = 'Регистрация прошла успешно'
        loading.value = false
        successful.value = true
      },
      (error: { response: { data: { message: any } }; message: any; toString: () => any }) => {
        loading.value = false
        message.value
                = (error.response
                  && error.response.data
                  && error.response.data.message)
                || error.message || error.toString()
        successful.value = false
      },
    )
  }
  else if (location === '') {
    message.value = 'Укажите адрес'
    loading.value = false
    successful.value = false
  }
}
</script>

<template>
  <div class="card">
    <div class="bg-yellow">
      <div class="text-right">
        <button type="button" class="btn-close" @click.prevent="flags.closePopUps" />
      </div>
    </div>
    <div class="card-container">
      <p
        id="profile-img"
        i-carbon-user-avatar
        class="profile-img-card"
      />
      <Form :validation-schema="schema" @submit="handleRegister">
        <div class="form-group">
          <label for="phone">Номер телефона</label>
          <Field
            name="phone"
            type="tel"
            pattern=""
            class="form-control"
            placeholder="+79....."
            required
          />
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <Field
            name="password"
            type="password"
            class="form-control"
            required
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group text-center">
          <button class="btn btn-primary btn-block bg-yellow" style="width: 13rem" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            />
            <span>Зарегистрироваться</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message && !successful" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>

        <div class="form-group">
          <div v-if="message && successful" class="alert alert-success" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

    <style scoped>
    label {
      display: block;
      margin-top: 10px;
    }

    .card-container {
      max-width: 350px !important;
      padding: 20px 25px 30px;
    }

    .card {
      background-color: #f7f7f7;
      -moz-border-radius: 2px;
      -webkit-border-radius: 2px;
      border-radius: 2px;
      -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      position:fixed; z-index: 3;
      top: 50%;
      left: 50%;
      margin-left:-150px;
      margin-top:-200px;
    }

    .profile-img-card {
      width: 96px;
      height: 96px;
      margin: 0 auto 10px;
      display: block;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
    }

    .btn {
      margin: 5px;
    }
    </style>
