<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
  <p>新年龄：{{ store.getAddAge(1100) }}</p>
  <p>调用其它getter：{{ store.getNameAndAge }}</p>
  <button @click="changeName">更改姓名</button>
  <button @click="reset">重置store</button>
  <button @click="patchStore">批量修改数据</button>
  <button @click="saveName">调用aciton</button>


  <!-- 子组件 -->
  <child></child>
</template>
<script setup lang="ts">
import child from "./child.vue";
import { useUsersStore } from "@/store/user.ts";
import { storeToRefs } from "pinia";
const store = useUsersStore();
const { name, age, sex } = storeToRefs(store);
const changeName = () => {
  store.name = "张三";
  console.log(store);
};
// 重置store
const reset = () => {
  store.$reset();
};
// 批量修改数据
const patchStore = () => {
  store.$patch({
    name: "张三",
    age: 100,
    sex: "女",
  });
};
// 调用actions方法
const saveName = () => {
  store.saveName("我是小猪");
};
</script>