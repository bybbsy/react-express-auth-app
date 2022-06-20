<template>
  <div class="default-layout w-full h-full">
    <the-header/>
    <main class="h-full">
        <router-view/>
    </main>
    <footer>Footer</footer>
  </div>
</template>

<script>
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