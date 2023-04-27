<!-- <template>
  <div>
    <h1>My Page</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title.rendered }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      posts: []
    }
  },

  async created() {
    await this.fetchPosts()
  },

  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('http://devtest1.infinityfreeapp.com/wp-json/wp/v2/posts')
        const data = await response.json()
        this.posts = data
        console.log(this.posts)
      } catch (error) {
        console.error(error, 'test')
      }
    }
  }
}
</script> -->

<template>
  <div>
    <h1>My Page</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title.rendered }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      posts: []
    }
  },

  async created() {
    await this.fetchPosts()
  },

  methods: {

    async fetchPosts() {
      try {
        const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const serverUrl = 'http://devtest1.infinityfreeapp.com/wp-json/wp/v2/posts'
        const response = await fetch(corsProxyUrl + serverUrl, {
          headers: {
            'Origin': 'https://noip.com' 
          }
        })
        // const data = await response.json()
        this.posts = response
        console.log(this.posts)
      } catch (error) {
        console.error(error, 'test')
      }
    }
  }
}
</script>


