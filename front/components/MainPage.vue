<template>
  <div class="container my-12 mx-auto px-4 md:px-12">
    <router-link to="/ajouter_article" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
      ajouter un article
    </router-link>
    <div class="text-center">
      <h1 class="text-3xl font-serif font-bold mb-4">Welcome to my test</h1>
    </div>
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
        <div v-for="post in filteredPosts" :key="post.id">
          <a href="#">
            <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">
          </a>
          <div class="text-1xl font-serif font-bold my-4">{{ post.title.rendered }}</div>
          <div class="font-serif" v-html="post.excerpt.rendered.replace(/^<p>/, '').replace(/<\/p>$/, '')"></div>
          <div class="my-4 font-serif">{{ new Date(post.date_gmt).toLocaleString('en-GB') }}</div>
        </div>
      </div>
    </div>
    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" @click="fetchPostsByDate('2022-05-04')">
      Articles selon date
    </button>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',

  data() {
    return {
      posts: [],
      date: null
    }
  },

  async created() {
    await this.fetchPosts()
  },

  computed: {
    filteredPosts() {
      if (!this.date) {
        return this.posts;
      }
      const filtered = this.posts.filter(post => {
        const postDate = new Date(post.date_gmt);
        const date = new Date(this.date);
        return postDate >= date && postDate < date.setDate(date.getDate() + 1);
      });
      return filtered;
    }
  },

  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('http://localhost:10010/wp-json/wp/v2/posts')
        const data = await response.json()
        this.posts = data
        console.log(this.posts)
      } catch (error) {
        console.error(error, 'test')
      }
    },

    async fetchPostsByDate(date) {
      try {
        const response = await fetch(`http://localhost:10010/wp-json/wp/v2/posts?after=${date}T00:00:00`)
        const data = await response.json()
        this.date = date;
        this.posts = data
      } catch (error) {
        console.error(error, 'test')
      }
    }
  }
}
</script>