<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import type Category from '~/types/Category'
import { useFlagStore } from '~/store/flags.module'
const emit = defineEmits<{
  (event: 'found', cid: number): void
}>()
const flags = useFlagStore()
const categories: Ref<Category[]> = ref([])
const currentIndex = ref(-1)

function retrieveCategories() {
  ItemDataService.getAllCategories()
    .then((response) => {
      categories.value = response.data
      // console.log(items.value)
    })
    .catch((e) => {
      // console.log(e)
    })
}

function setActiveCategory(category: Category, index: number) {
  currentIndex.value = index
  emit('found', currentIndex.value)
}

retrieveCategories()
</script>

<template>
  <div>
    <div class="filler bg-yellow" />
    <div class="list bg-yellow">
      <p>Категории</p>
      <ul class="list-group">
        <li
          v-for="(category, index) in categories"
          :key="index"
          class="list-group-item bg-lavender"
          :class="{ active: index === currentIndex }"
          :disabled="flags.shade"
          @click="setActiveCategory(category, index)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .list-group-item {
    padding: 2px;
    cursor: pointer;
  }
  .list-group-item:hover {
    background: linear-gradient(45deg, yellow, lightblue);
  }
  .list {
    height: 100%;
    width: 130px;
  }

  .filler {
    position: fixed;
    height: 100%;
    width: 130px;
    top:0;
  }
</style>

