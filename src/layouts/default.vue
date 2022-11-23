<script setup lang="ts">
import { useFlagStore } from '~/store/flags.module'

const flags = useFlagStore()
</script>

<template>
  <main>
    <item_view v-if="flags.popUpItem" :item="flags.getItem()" />
    <purchase_window v-if="flags.popUpPurchase" />
    <signin v-if="flags.popUpSignIn" />
    <signup v-if="flags.popUpSignUp" />
    <div :class="{ 'b blur': flags.shade }">
      <navigation :key="flags.render" />
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
  .b.blur{
    filter:blur(5px);
  };
</style>
