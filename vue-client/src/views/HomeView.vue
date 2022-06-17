<template>
    <div class="home">
      <div class="">
        You: {{ user?.user?.email}}
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

    return {
      user
    }
  }
})
</script>
