<template>
  <div class="nav-button">
    <button
      @click="decrement(change)"
      v-bind:class="{'disabled':this.$store.state.isDisabled}"
      v-bind:disabled="this.$store.state.isDisabled"
    >&lt;- Prev</button>
    <span>{{this.$store.state.page}}</span>
    <button
      v-bind:class="{'disabled':this.$store.state.upDisabled}"
      @click="increment(pages, change)"
      v-bind:disabled="this.$store.state.upDisabled"
    >Next -&gt;</button>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["pages", "change"],
  data() {
    return {
      // moved to vuex instead to fix disabled style sticking bug
      //   // this is for min pages
      //   isDisabled: true,
      //   // this is for max pages
      //   upDisabled: false
    };
  },
  methods: {
    increment(pages, change) {
      this.$store.commit("increment");
      this.$store.commit("setIsDisabled", false);
      if (this.$store.state.page >= pages) {
        this.$store.commit("setUpDisabled", true);
      }
      this.$emit("change-page", change);
    },
    decrement(change) {
      this.$store.commit("decrement");
      this.$store.commit("setUpDisabled", false);
      if (this.$store.state.page < 1) {
        this.$store.commit("setIsDisabled", true);
      }
      this.$emit("change-page", change);
    }
  }
};
</script>

<style>
</style>
