<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'

const items: Ref<Item[]> = ref([])
let temp: Item[]
const loading = ref(true)

function retrieveItems() {
  ItemDataService.getAll()
    .then((response) => {
      items.value = response.data
      temp = response.data
      loading.value = false
      // console.log(items.value)
    })
    .catch((e) => {
      // console.log(e)
    })
}

function filterCat(cid: number) {
  items.value = temp
  items.value = items.value.filter(value => cid + 1 === value.categoryId)
}

retrieveItems()
</script>

<template>
  <div
    style="display:flex;"
  >
    <div
      style="flex: 1;"
    >
      <categories @found="filterCat" />
    </div>
    <div
      style="flex: 5;"
    >
      <div v-if="loading" class="text-center">
        <span
          v-show="loading"
          class="spinner-grow text-warning m-30"
          style="width: 9rem; height: 9rem; "
        />
      </div>
      <div v-else class="photos">
        <item_palette
          v-for="item in items"
          :key="item.id"
          :item="item"
          :mode="1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .photos {
    column-count: auto;
    column-width: 18rem;
  }
</style>

