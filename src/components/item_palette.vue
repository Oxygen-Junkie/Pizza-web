<script setup lang="ts">
import type { Ref } from 'vue'
import type Item from '~/types/Item'
import { useFlagStore } from '~/store/flags.module'
const props = defineProps<{ item: Item }>()
const flags = useFlagStore()
const currentItem: Ref<Item> = ref(props.item)

const imageURL = ref('')

function retrieveItems() {
  imageURL.value = `${import.meta.env.VITE_base_api.toString()}/${import.meta.env.VITE_url_images.toString()}${props.item.fileName}`
}

function setActiveItem() {
  flags.setItem(props.item)
  flags.changePopUpItem()
}

retrieveItems()
</script>

<template>
  <div class="item" :disabled="flags.shade" @click.prevent="setActiveItem">
    <p>
      <img class="rounded center" :src="imageURL" loading="lazy">
    </p>
    <div class="name">
      <strong class="text-warning">{{ currentItem.title }}</strong>
    </div>
    <div class="price">
      {{ ` ${currentItem.price}руб ` }}
    </div>
    <!-- <div class="price">
      <strong>{{ `ЗАКАЗ НА ${currentItem.price * 2}руб ` }}</strong>
    </div>
 -->
    <!-- <div class="removeFrom">
      {{ ' +79373291487 ' }}
    </div> -->
  </div>
</template>

<style scoped>
  .item {
    margin-bottom: 10px;
    border: solid;
    border-color: whitesmoke;
    border-right: 0;
    border-top: 0;
    position: relative;
    text-align: center;
    cursor:pointer;
  }
  .item:hover {
    background: linear-gradient(45deg, grey, white, grey);
  }
  .center {
    display:block;
    margin-left:auto;
    margin-right:auto;
    width:50%;
  }
  .name {
    position: absolute;
    top: 1px;
    left: 1px;
    background-color: whitesmoke;
  }
  .price {
    position: absolute;
    bottom: 1px;
    left: 1px;
    background-color: whitesmoke;
  }

  .removeFrom {
    position: absolute;
    top: 1px;
    right: 1px;
    background-color: whitesmoke;
  }
</style>
