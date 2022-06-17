<template>
  <div class="empty-layout">
    <main class="h-full">
        <router-view/>
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>

<style>
.empty-layout {
    height: 100%;
}
</style>