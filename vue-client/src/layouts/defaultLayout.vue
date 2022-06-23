<template>
  <div class="default-layout w-full h-full">
    <the-header/>
    <main class="h-full flex mx-auto mt-4 px-2">
        <router-view/>
    </main>
    <footer>Footer</footer>
  </div>
</template>

<script lang="ts">
import TheHeader from '@/components/Header.vue'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
    name: 'default-layout',
    components: {
        TheHeader
    }
})
</script>

<style>

</style>