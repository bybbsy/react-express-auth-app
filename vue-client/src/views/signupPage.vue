<template>
  <div class="w-full h-full flex flex-col">
    <h1 class="main-logo flex my-16 mx-auto">JWT-Auth sign up</h1>
    <div class="w-full flex">
      <form class="w-full flex flex-col max-w-sm mx-auto my-auto">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="
                block
                text-gray-500
                font-bold
                md:text-right
                mb-1
                md:mb-0
                pr-4
              "
              for="Email"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="
                bg-gray-200
                appearance-none
                border-2 border-gray-200
                rounded
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none focus:bg-white focus:border-purple-500
              "
              id="inline-full-name"
              type="text"
              v-model="email"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="
                block
                text-gray-500
                font-bold
                md:text-right
                mb-1
                md:mb-0
                pr-4
              "
              for="inline-password"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="
                bg-gray-200
                appearance-none
                border-2 border-gray-200
                rounded
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none focus:bg-white focus:border-purple-500
              "
              id="inline-password"
              type="password"
              placeholder="******************"
              v-model="password"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3"></div>
          <label class="md:w-2/3 block text-gray-500 font-bold">
            <input class="mr-2 leading-tight" type="checkbox" />
            <span class="text-sm"> Send me your newsletter! </span>
          </label>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button
              class="
                shadow
                bg-purple-500
                hover:bg-purple-400
                focus:shadow-outline focus:outline-none
                text-white
                font-bold
                py-2
                px-4
                rounded
              "
              type="button"
              @click="handleSingup"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/store/authStore'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const mainStore = useAuthStore()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const handleSingup = async () => {
      try {
        await mainStore.signup(email.value, password.value)
        router.push({name: 'home'})
      } catch(e) {
        console.log('Error on signing-up: ', e)
      }
    }
    
    return {
      email,
      password,
      handleSingup
    }
  },
})
</script>

<style>
</style>