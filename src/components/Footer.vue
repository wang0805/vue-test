<template>
  <div class="nav-button">
    <button
      @click="decrement(change)"
      v-bind:class="{'disabled':isDisabled}"
      v-bind:disabled="isDisabled"
    >&lt;- Prev</button>
    <span>{{page}}</span>
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
      page: 0,
      // this is for min pages
      isDisabled: true,
      // this is for max pages
      upDisabled: false
    };
  },
  methods: {
    increment(pages, change) {
      this.page++;
      this.isDisabled = false;
      if (this.page >= pages) {
        this.upDisabled = true;
      }
      this.$emit("change-page", { page: this.page, change: change });
    },
    decrement(change) {
      this.page--;
      this.upDisabled = false;
      if (this.page < 1) {
        this.isDisabled = true;
      }
      this.$emit("change-page", this.page, change);
    }
  }
};
</script>

<style>
</style>
