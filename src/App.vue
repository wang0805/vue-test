<template>
  <div id="app">
    <div class="container">
      <div class="title">
        <h1>Best quotes of the world</h1>
        <input type="text" v-model="search" placeholder="Author..." v-on:change="changeAuthor">
      </div>
      <Fav v-bind:authors="favAuthors"/>
      <Quotes v-bind:quotes="quotes" v-on:add-author="addAuthor" v-on:del-author="delAuthor"></Quotes>
    </div>
    <Footer
      v-bind:change="change"
      v-bind:pages="pages"
      v-bind:page="page"
      v-on:change-page="changePage"
    />
  </div>
</template>

<script>
import axios from "axios";
import Fav from "./components/Fav";
import Quotes from "./components/Quotes";
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    Fav,
    Quotes,
    Footer
  },
  data() {
    return {
      //quotes is everchanging according to page numnber and search
      quotes: [],
      favAuthors: [],
      search: "",
      //result is to keep a record of the original array
      result: [],
      //change is created for monitoring search bar
      change: [],
      pages: 0,
      //props for footer
      page: 0
    };
  },
  methods: {
    addAuthor(author) {
      this.favAuthors.push(author);
    },
    delAuthor(author) {
      const index = this.favAuthors.indexOf(author);
      this.favAuthors.splice(index, 1);
    },
    changeAuthor() {
      //uses watch instead for autocomplete
    },
    changePage(change) {
      // console.log(page, change, "checking object emitted");
      this.quotes = [];
      if (this.$store.state.page <= this.pages) {
        for (let i = 0; i < 6; i++) {
          this.quotes = [
            ...this.quotes,
            change[this.$store.state.page * 6 + i]
          ];
        }
      }
    }
  },
  watch: {
    search(newSearch, oldSearch) {
      //reset when theres a search
      this.$store.commit("setZero", 0);
      this.$store.commit("setIsDisabled", true);
      this.$store.commit("setUpDisabled", false);

      this.change = [...this.result];
      this.change = this.change.filter(c => c.author.includes(this.search));
      if (this.change.length % 6 !== 0) {
        this.pages = parseInt(this.change.length / 6);
      } else {
        this.pages = parseInt(this.change.length / 6 - 1);
      }
      this.quotes = [];
      for (let i = 0; i < 6; i++) {
        this.quotes = [...this.quotes, this.change[i]];
      }
    }
  },
  created() {
    axios.get("http://localhost:3001/").then(res => {
      this.result = res.data;
      this.change = res.data;
      if (this.result.length % 6 !== 0) {
        this.pages = parseInt(this.result.length / 6);
      } else {
        this.pages = parseInt(this.result.length / 6 - 1);
      }
      //page 0 be first 6 items
      for (let i = 0; i < 6; i++) {
        this.quotes = [...this.quotes, this.result[i]];
      }
    });
  }
};
</script>

<style>
.title {
  display: flex;
  align-items: center;
}

input {
  height: 20px;
  width: 150px;
  margin-left: auto;
}

.title h1 {
  margin-left: auto;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.quotes-container {
  margin-top: 30px;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-gap: 5px;
  margin-bottom: 50px;
  min-height: 400px;
}

@media screen and (max-width: 550px) {
  .quotes-container {
    display: block;
  }
}

.authors-container {
  text-align: left;
}

/* This is for the Navbar */
.nav-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}

button {
  background-color: gray;
  color: #fff;
  padding: 20px;
  font-size: 15px;
  border-radius: 0;
}

.disabled {
  background: lightgray;
}

/* This is for quotes */
.quote {
  border: 1px solid #333;
  padding: 10px;
  min-height: 200px;
}

.quote-like {
  margin-left: 20px;
  padding: 10px;
  border: 1px block grey;
  background: none;
  color: black;
  font-size: 12px;
}

.quote-like.active {
  background-color: #fab1a0;
}

/* This is for App.vue */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

body {
  padding: 20px;
}
</style>
