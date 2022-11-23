<script setup lang="ts">
import { useAuthStore } from '~/store/auth.module'
import { useFlagStore } from '~/store/flags.module'

const manager = import.meta.env.VITE_manager
const admin = import.meta.env.VITE_administrator

const auth = useAuthStore()
const flags = useFlagStore()
const router = useRouter()
const showHeadbar = ref(true)
const lastScrollPosition = ref(0)

const currentUser = $ref(auth.getUser())

const showManagerBoard = () => {
  if (currentUser && currentUser.roles)
    return currentUser.roles.includes(manager)

  return false
}

const showAdminBoard = () => {
  if (currentUser && currentUser.roles)
    return currentUser.roles.includes(admin)

  return false
}

function logOut() {
  auth.signOut()
  flags.rerender()
  router.push('/')
}

const handleScroll = () => {
  const OFFSET = 60
  const currentScrollPostion = window.scrollY || document.documentElement.scrollTop
  if (currentScrollPostion < 0)

    return

  if (Math.abs(currentScrollPostion - lastScrollPosition.value) > OFFSET)

    return
  showHeadbar.value = currentScrollPostion < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPostion
}

window.addEventListener('scroll', handleScroll)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class=" navbar navbar-expand navbar-blue bg-yellow" :class="{ 'h--hidden': !showHeadbar }">
    <a href="/" class="navbar-brand">Пиццерия</a>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link v-if="showManagerBoard()" v-show="!flags.shade" to="/addItem" class="nav-link">
          <p i-carbon-wheat /> Добавить предмет
        </router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="showManagerBoard()" v-show="!flags.shade" to="/orders" class="nav-link">
          <p i-carbon-currency-ruble /> Заказы
        </router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="showAdminBoard()" v-show="!flags.shade" to="/adminTab" class="nav-link">
          <p i-carbon-stamp /> Администрирование
        </router-link>
      </li>
    </div>
    
    <div v-if="!currentUser" class="navbar-nav mb-3">
      <li class="nav-item">
        <button class="nav-link" :disabled="flags.shade" @click.prevent="flags.changePopUpSignUp">
          <p i-carbon-user-follow /> Зарегистрироваться
        </button>
      </li>
    </div>
   
    <div v-if="!currentUser" class="navbar-nav mb-3">
      <li class="nav-item">
        <button class="nav-link" :disabled="flags.shade" @click.prevent="flags.changePopUpSignIn">
          <p i-carbon-user /> Войти
        </button>
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link v-if="!flags.shade" to="/profile" class="nav-link">
          <p i-carbon-user-profile-alt /> Профиль
          {{ `${currentUser.phone.substring(0, 5)}....` }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" style="cursor: pointer" @click.prevent="logOut">
          <p i-carbon-logout /> Выйти
        </a>
      </li>
    </div>
  </nav>
</template>

<style scoped>
  .navbar {
    position: sticky;z-index: 3;
    top:0;
  }

  .h--hidden{
  box-shadow: none;
  transform: translate3d(0,-115px,0);
}
</style>
