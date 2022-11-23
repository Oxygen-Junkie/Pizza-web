<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import Category from '~/types/Category'
import Item from '~/types/Item'

const submitted = ref(false)
const item: Ref<Item> = ref(new Item())
const image = ref()
const categories: Ref<any> = ref([])
const category: Ref<Category> = ref(new Category())
const submittedCat = ref(false)

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

function saveItem() {
  const formData = new FormData()
  formData.append('f ile', image.value.files[0])
  Object.entries(item.value).forEach(([key, value]) => {
    formData.append(key, value)
  })
  ItemDataService.create(formData)
    .then((response) => {
      item.value.id = response.data.id
      // console.log(response.data)
      submitted.value = true
    })
    .catch((e) => {
      // console.log(e)
    })
}

function newItem() {
  submitted.value = false
  item.value = new Item()
}

function saveCategory() {
  ItemDataService.createCategory(category.value)
    .then((response) => {
      category.value.id = response.data.id
      // console.log(response.data)
      submittedCat.value = true
    })
    .catch((e) => {
      // console.log(e)
    })
}

function newCategory() {
  submittedCat.value = false
  category.value = ref().value
}

retrieveCategories()
</script>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="image">Изображение</label>
        <input
          :ref="(e) => { image = e }"
          type="file"
          class="form-control"
          accept="image/*"
          required
          name="image"
        >
      </div>
      <div class="form-group">
        <label for="title">Наименование</label>
        <input
          id="title"
          v-model.trim="item.title"
          type="text"
          class="form-control"
          required
          name="title"
        >
      </div>

      <div class="form-group">
        <label for="description">Описание</label>
        <textarea
          id="description"
          v-model="item.description"
          class="form-control"
          required
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="description">Цена</label>
        <input
          id="price"
          v-model.trim="item.price"
          type="number"
          class="form-control"
          min="200"
          max="5000"
          required
          name="price"
        >
      </div>
      <div class="form-group">
        <label for="description">Категория</label>
        <select v-model="item.categoryId" class="form-select">
          <option v-for="categoryz in categories" :key="categoryz.id" :value="categoryz.id">
            {{ categoryz.name }}
          </option>
        </select>
      </div>

      <button class="btn bg-yellow" @click="saveItem">
        Добавить предмет
      </button>
    </div>
    <div v-else>
      <h4>Предмет успешно добавлен</h4>
      <button class="btn bg-yellow" @click="newItem">
        Добавить ещё один предмет
      </button>
    </div>
  </div>
  <br>
  <div v-if="!submittedCat">
    <div class="form-group">
      <label for="name">Наименование новой категории</label>
      <input
        id="name"
        v-model="category.name"
        type="text"
        class="form-control"
        required
        name="title"
      >
    </div>
    <button class="btn bg-yellow" @click="saveCategory">
      Добавить категорию
    </button>
  </div>

  <div v-else>
    <h4>Категория успешно создана</h4>
    <button class="btn bg-yellow" @click="newCategory">
      Добавить ещё одну категорию
    </button>
  </div>
</template>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.btn {
      margin-top: 10px;
      margin-bottom: 30px;
    }
</style>
