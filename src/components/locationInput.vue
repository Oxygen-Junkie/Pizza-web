<script setup lang="ts">
const flags = useFlagStore()

const city = ref('')
const district = ref('')
const street = ref('')
const building = ref('')
const flat = ref('')

function returnValue() {
  flags.setLocation(`город ${city.value}, район ${district.value}, улица ${street.value}, дом ${building.value}, квартира ${flat.value}`)
}
</script>

<template>
  <div>
    <input
      id="city"
      v-model="city"
      type="text"
      name="city"
      placeholder="Город"
    >
    <input
      v-show="city"
      id="district"
      v-model="district"
      type="text"
      name="district"
      placeholder="Район"
    >
    <input
      v-show="district"
      id="street"
      v-model="street"
      type="text"
      name="street"
      placeholder="Улица"
    >
    <input
      v-show="street"
      id="building"
      v-model="building"
      type="text"
      name="building"
      placeholder="Дом"
      @click="returnValue"
      @input="returnValue"
    >
    <input
      v-show="building"
      id="flat"
      v-model="flat"
      type="text"
      placeholder="Квартира (если есть в адресе)"
      @input="returnValue"
      @click="returnValue"
    >
  </div>
</template>

<style scoped>
input {
    width: 15rem;
}
</style>
