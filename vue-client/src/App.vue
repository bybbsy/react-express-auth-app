<template>
  <div class="wrapper">
    <component :is="layout">
        <router-view/>
    </component>
  </div>
</template>
<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import { useMainStore } from './store'

export default defineComponent({
  setup(props, ctx) {
    const route = useRoute();
    const mainStore = useMainStore();

    const layout = computed(() => {
      const name = (route.meta?.layout ?? 'default') + 'Layout'
      return defineAsyncComponent(() => import(`@/layouts/${name}.vue`));
    })

    if(localStorage.getItem('accessToken')) {
      mainStore.checkAuth();
    }

    return {
      layout
    }
  }
})
</script>

<style>
@tailwind base;
@tailwind component;
@tailwind utilities;

html, body, .wrapper {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
