<template>
  <div class="authors-container">
    <h3>Favorite Authors</h3>
    <ul>
      <li v-bind:key="author" v-for="author in authors">{{author}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Fav",
  props: ["authors"]
};
</script>

<style>
</style>
