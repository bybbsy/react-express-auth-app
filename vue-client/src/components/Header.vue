<template>
  <header class="header">
    <div class="flex py-4 sm:px-5 w-md mx-auto items-center justify-between flex-col sm:flex-row">
      <div class="logo">
        <h1 class="main-logo">JWT-Auth</h1>
      </div>
      <ul class="flex items-center">
        <div class="flex">
          <li>
            <router-link
              class="sm:mx-1 mx-1 md:mx-2 text-lg font-semibold md:tracking-wide"
              :to="{ name: 'home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              class="sm:mx-1 mx-1 md:mx-2 text-lg font-semibold md:tracking-wide"
              :to="{ name: 'about' }"
              >About</router-link
            >
          </li>
          <li v-if="!userIsAuth">
            <router-link
              class=" 
                mx-2
                rounded
                px-1
                sm:px-2
                md:px-4
                
                py-1
                sm:py-2
                md:py-4

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

          <li v-if="!userIsAuth">
            <router-link
              class="
                mx-2
                rounded
                px-1
                sm:px-2
                md:px-4
                
                py-1
                sm:py-2
                md:py-4
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
import { clearCookieAndLS } from "@/helpers/auth";
import { useAuthStore } from "@/store/authStore";
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "the-header",
  setup() {
    const mainStore = useAuthStore();
    const router = useRouter()

    const userIsAuth = computed(() => mainStore.isAuth);

    const handleUserSignout = () => {
      mainStore.logout()
      clearCookieAndLS()
      router.go(0)
    };

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
  /* height: 65px; */
}

.header-container {
  margin: 0 auto;
  width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-logo {
  font-family: 'Luckiest Guy', cursive;
  font-weight: 400;
  font-size: 2em;
}
</style>