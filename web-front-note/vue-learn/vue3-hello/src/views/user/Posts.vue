<script lang="ts">
export default {
  methods: {
    gotoProfile() {
      console.log("gotoProfile");
      //使用绝对路径返回到
      this.$router.push("/user/2/profile");
    }
  }
}
</script>
<template>
  <div>user posts</div>
  <button @click="gotoProfile()">goto Profile</button>
</template>