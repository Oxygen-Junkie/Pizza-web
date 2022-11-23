<script setup lang="ts">
</script>

<template>
  <div class="c">
    <div class="form-group">
      <label for="description">Номер телефона пользователя</label>
      <input
        id="title"
        type="text"
        class="form-control"
        placeholder="Укажите номер телефона РФ формата"
        required
        name="title"
      >
    </div>

    <div class="form-group">
      <label for="description">Установите роль</label>
      <selected
        id="description"
        class="form-control"
        name="description"
      >
        <option selected>
          Менеджер
        </option>
      </selected>
    </div>

    <div class="form-group">
      <button class="btn bg-yellow">
        Добавить товар
      </button>
      <button class="btn bg-red">
        Заблокировать номер
      </button>
    </div>
  </div>
</template>

<style scoped>
.c {
  position:fixed;
  top: 30%;
  left: 50%;
  margin-left:-100px;
  margin-top:-130px;
}
.btn {
    margin-right: 10px;
    margin-left: 10px;
}

.form-group {
    margin-top: 20px;
}
</style>
