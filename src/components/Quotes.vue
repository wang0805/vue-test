<template>
  <div class="quotes-container">
    <div v-bind:key="quote" v-for="quote in quotes">
      <Quote
        v-bind:quote="quote"
        v-on:add-author="$emit('add-author',quote.author)"
        v-on:del-author="$emit('del-author',quote.author)"
      />
    </div>
  </div>
</template>

<script>
import Quote from "./Quote";

export default {
  name: "Quotes",
  components: {
    Quote
  },
  props: ["quotes"]
};
</script>

<style>
</style>
