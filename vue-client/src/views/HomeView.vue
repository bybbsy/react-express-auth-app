<template>
    <div class="w-full h-full flex">
      <div class="" v-if="isAuth">
         You: {{ user?.email}}
      </div>
      <div class="w-full flex" v-else>
        <p class="text-4xl font-bold mt-80 mx-auto">Please login or sign up to watch some content</p>
      </div>
    </div>
</template>

<script lang="ts">
import { useMainStore } from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const mainStore = useMainStore()
    const user = computed(() => mainStore.user)
    const isAuth = computed(() => mainStore.isAuth)
    return {
      user,
      isAuth
    }
  }
})
</script>
