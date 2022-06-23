<template>
  <div class="w-full h-full flex">
    <div class="w-full" v-if="isAuth">
      <div class="flex">
        <p>
          <span class="text-lg font-semibold">You: </span>
          <span class="italic">{{ user?.email }}</span>
        </p>
      </div>
      <div class="w-full">
        <div class="flex w-full">
          <button
            type="button"
            class="
              flex
              mx-auto
              bg-blue-500
              hover:bg-blue-400
              text-white
              font-bold
              py-2
              px-4
              border-b-4 border-blue-700
              hover:border-blue-500
              rounded
            "
            @click="handleReveiveCards"
          >
            Load data available only for logged in users
          </button>
        </div>
        <ul class="flex flex-col pt-2">
          <li class="max-w-sm rounded overflow-hidden shadow-lg" v-for="card in cards" :key="card._id">
            <img
              class="w-full"
              :src="card.imageUrl"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{{ card.title }}</div>
              <p class="text-gray-700 text-base">
                {{ card.description}}
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span v-for="(tag, i) in card.tags" :key="i"
                class="
                  inline-block
                  bg-gray-200
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-semibold
                  text-gray-700
                  mr-2
                  mb-2
                "
                >#{{ tag.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full flex" v-else>
      <p class="text-4xl font-bold mt-80 mx-auto">
        Please login or sign up to watch some content
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/store/authStore";
import { computed, defineComponent } from "@vue/runtime-core";
import { getCards } from "@/services/cardService";
import { useCardStore } from "@/store/cardStore";

export default defineComponent({
  setup() {
    const mainStore = useAuthStore()
    const cardStore = useCardStore()

    const user = computed(() => mainStore.user)
    const isAuth = computed(() => mainStore.isAuth)
     
    const handleReveiveCards = async () => {
      try {
        await cardStore.fetchCards()
      } catch( e) { 
        console.log(e)
      }
    }
    const cards = computed(() => cardStore.cards)

    return {
      user,
      isAuth,
      handleReveiveCards,
      cards
    };
  },
});
</script>
