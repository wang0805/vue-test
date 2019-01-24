<template>
  <div class="nav-button">
    <button
      @click="decrement(change)"
      v-bind:class="{'disabled':isDisabled}"
      v-bind:disabled="isDisabled"
    >&lt;- Prev</button>
    <span>{{this.$store.state.page}}</span>
    <button
      v-bind:class="{'disabled':upDisabled}"
      @click="increment(pages, change)"
      v-bind:disabled="upDisabled"
    >Next -&gt;</button>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["pages", "change"],
  data() {
    return {
      // this is for min pages
      isDisabled: true,
      // this is for max pages
      upDisabled: false
    };
  },
  methods: {
    increment(pages, change) {
      this.$store.commit("increment");
      this.isDisabled = false;
      if (this.$store.state.page >= pages) {
        this.upDisabled = true;
      }
      this.$emit("change-page", change);
    },
    decrement(change) {
      this.$store.commit("decrement");
      this.upDisabled = false;
      if (this.$store.state.page < 1) {
        this.isDisabled = true;
      }
      this.$emit("change-page", change);
    }
  }
};
</script>

<style>
</style>
