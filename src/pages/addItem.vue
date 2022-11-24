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
const message: Ref<string | undefined> = ref()

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
  if (item.value.categoryId) {
    const formData = new FormData()
    formData.append('file', image.value.files[0])
    Object.entries(item.value).forEach(([key, value]) => {
      if (value === undefined) {
        message.value = `Не указано значение для ${key}`
        return 0
      }
      else {
        formData.append(key, value)
      }
    })
    ItemDataService.create(formData)
      .then((response) => {
        item.value.id = response.data.id
        submitted.value = true
      })
      .catch((e) => {
        message.value = e.data.message
      })
  }
  else {
    message.value = 'Не указана категория'
  }
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
      message.value = e.data.message
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
          maxlength="30"
          placeholder="Укажите название"
        >
      </div>

      <div class="form-group">
        <label for="description">Описание</label>
        <textarea
          id="description"
          v-model.trim="item.description"
          class="form-control"
          required
          name="description"
          maxlength="500"
          placeholder="Введите описание"
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
          placeholder="Укажите цену"
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
        Добавить товар
      </button>
    </div>
    <div v-else>
      <h4>Товар успешно добавлен</h4>
      <button class="btn bg-yellow" @click="newItem">
        Добавить ещё один товар
      </button>
    </div>
    <br>
    <div v-if="!submittedCat">
      <div class="form-group">
        <label for="name">Наименование новой категории</label>
        <input
          id="name"
          v-model.trim="category.name"
          type="text"
          class="form-control"
          required
          name="title"
          maxlength="15"
          placeholder="Введите название категории"
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
    <div v-if="message" class="alert alert-error">
      {{ message }}
    </div>
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
