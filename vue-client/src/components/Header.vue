<template>
  <header class="header">
    <div class="flex w-md mx-auto items-center justify-between">
      <div class="logo">
        <h1>Vue-auth</h1>
      </div>
      <ul class="flex">
        <div class="flex" v-if="!userIsAuth">
          <li>
            <router-link
              class="mx-2 text-lg font-semibold tracking-wide"
              :to="{ name: 'home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              class="mx-2 text-lg font-semibold tracking-wide"
              :to="{ name: 'about' }"
              >About</router-link
            >
          </li>
          <li>
            <router-link
              class="
                mx-2
                rounded
                px-4
                py-2
                text-lg
                font-semibold
                tracking-wide
                bg-blue-600
                text-white
                hover:bg-blue-700
                transition
                ease-in-out
              "
              :to="{ name: 'sign-in' }"
              >Sign-in</router-link
            >
          </li>

          <li>
            <router-link
              class="
                mx-2
                rounded
                px-4
                py-2
                text-lg
                font-semibold
                tracking-wide
                bg-green-600
                text-white
                hover:bg-green-700
                transition
                ease-in-out
              "
              :to="{ name: 'sign-up' }"
              >Sign-up</router-link
            >
          </li>
        </div>

        <div v-if="userIsAuth">
          <li>
            <button
              class="
                mx-2
                rounded
                px-4
                py-2
                text-lg
                font-semibold
                tracking-wide
                bg-red-600
                text-white
                hover:bg-red-700
                transition
                ease-in-out
              "
              @click="handleUserSignout"
            >
              Sign-out
            </button>
          </li>
        </div>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { useMainStore } from "@/store";
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";

export default defineComponent({
  name: "the-header",
  setup() {
    const mainStore = useMainStore();

    const userIsAuth = computed(() => {
      console.log("e");
      return mainStore.isAuth;
    });
    const handleUserSignout = () => mainStore.logout();

    return {
      handleUserSignout,
      userIsAuth,
    };
  },
});
</script>

<style>
.header {
  display: flex;
  box-shadow: 0px 0px 5px 1px rgba(17, 17, 17, 0.205);
  height: 65px;
}

.header-container {
  margin: 0 auto;
  width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>