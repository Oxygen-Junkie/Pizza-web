<script setup lang="ts">
import { prettifyNumber } from '~/middleware/utilities'

const flags = useFlagStore()
</script>

<template>
  <div class="wrp">
    <div class="card">
      <div class="bg-yellow">
        <div class="text-right">
          <button type="button" class="btn-close" @click.prevent="flags.closePopUps" />
        </div>
      </div>
      <div class="card-container text-center">
        <strong class="text-yellow">{{ `Заказ отправлен, ожидайте звонка на номер ${prettifyNumber(flags.number).value} в течении получаса` }}</strong>
      </div>

      <br>
      <div>
        <button class="badge bg-yellow d-inline-flex" @click="flags.closePopUps">
          <p i-carbon-checkmark />&nbsp;
          Принято
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  max-width: 350px !important;
  padding: 20px 25px 30px;
}
.card {
  background-color: whitesmoke;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  overflow: auto;
  font-size: 15px;
  position:fixed; z-index: 3;
  top: 50%;
  left: 50%;
  margin-left:-100px;
  margin-top:-280px;
}

.badge {
  font-size: medium;
  margin-top: 20px;
}
</style>
