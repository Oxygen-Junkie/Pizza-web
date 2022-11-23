<script setup lang="ts">
import type { Ref } from 'vue'
import type Item from '~/types/Item'
import { useFlagStore } from '~/store/flags.module'
const props = defineProps<{ item: any; mode: number }>()

const isPurchase = props.mode === 4 || props.mode === 5
const flags = useFlagStore()
const currentItem: Ref<Item> = ref(props.item as Item)
const amount: Ref<number> = isPurchase ? props.item.amount : ref(0)
const imageURL = ref('')

function retrieveItems() {
  imageURL.value = `${import.meta.env.VITE_base_api.toString()}/${import.meta.env.VITE_url_images.toString()}${props.item.fileName}`
}

function setActiveItem() {
  if (!(flags.shade || isPurchase))
    flags.changePopUpItem(props.item)
}

retrieveItems()
</script>

<template>
  <div class="item" @click.prevent="setActiveItem">
    <p>
      <img class="rounded center" :src="imageURL" loading="lazy">
    </p>
    <div class="name">
      <strong class="text-yellow">{{ props.item.title }}</strong>
    </div>
    <div class="price">
      {{ ` ${currentItem.price}руб ` }}
    </div>
    <div v-if="isPurchase" class="amount">
      {{ ` ${amount}шт ` }}
    </div>
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
    background-color: white;
  }
  .center {
    display:block;
    margin-left:auto;
    margin-right:auto;
    width:50%;
  }
  .cartRemove {
    position: absolute;
    top: 1px;
    right: 1px;
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

  .amount {
    position: absolute;
    bottom: 1px;
    right: 1px;
    background-color: whitesmoke;
  }
</style>
