<template>
  <div class="container my-12 mx-auto px-4 md:px-12">
    <div class="text-center">
      <h1 class="text-3xl font-serif font-bold mb-4">Ajouter un article</h1>
    </div>
    <form  @submit.prevent="createPost">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titre" required>
      </div>
    </div>
    <div class="mb-6">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large input</label>
      <input type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewPost',

  data() {
    return {
      title: '',
      content: ''
    }
  },

  methods: {
    async createPost() {
      const apiHost = 'http://localhost:10005/wp-json';
      const url = `${apiHost}/wp/v2/posts`;
      const username = 'xko';
      const password = 'LtAB 06Ms pdNt EFvL 7tyU QxjK';
      
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.title,
            content: this.content,
            status: 'publish'
          }),
          credentials: 'include',
          auth: `${username}:${password}`
        });

        const data = await response.json();
        console.log(data);
        this.$router.push('/');
      } catch (error) {
        console.error(error, 'test');
      }
    }
  }
}
</script>