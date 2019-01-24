<template>
  <div class="quote">
    <p>{{quote.quote}}</p>
    <span>{{quote.author}}</span>
    <button @click="change(quote.author)" v-bind:class="{'red':isLiked}" class="quote-like">Like</button>
  </div>
</template>

<script>
export default {
  name: "Quote",
  props: ["quote"],
  data() {
    return {
      isLiked: false
    };
  },
  methods: {
    change(author) {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        this.$emit("add-author", author);
      } else this.$emit("del-author", author);
    }
  }
};
</script>

<style scoped>
.red {
  background: #f08080;
}
</style>
