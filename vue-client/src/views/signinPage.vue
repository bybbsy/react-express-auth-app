<template>
  <div class="w-full h-full flex flex-col">
    <h1 class="main-logo flex my-16 mx-auto">JWT-Auth sign in</h1>
    <div class="w-full flex flex-col">
      <form
        class="
          bg-white
          flex flex-col
          shadow-lg
          rounded
          px-8
          pt-6
          pb-8
          mx-auto
          my-auto
        "
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            E-mail
          </label>
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="email"
            type="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              mb-3
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="password"
            type="password"
            placeholder="******************"
            v-model="password"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded
              transition-all
              focus:outline-none focus:shadow-outline
              disabled:bg-gray-200 disabled:text-gray-400
            "
            type="button"
            @click="handleUserSignin"
            :disabled="!emailAndPasswordAreValid"
          >
            Sign In
          </button>
          <router-link
            class="
              inline-block
              align-baseline
              font-bold
              text-sm text-blue-500
              hover:text-blue-800
            "
            :to="{ name: 'sign-up' }"
          >
            Create account
          </router-link>
        </div>
        <transition-group name="error-list" tag="ul">
          <li class="text-red-600" v-for="e in errors" :key="e.id">
            {{ e.status }} {{ e.message }}
          </li>
        </transition-group>
      </form>
      <p class="my-4 main-logo">Or</p>
      <form
        class="bg-white flex flex-col shadow-lg rounded px-8 py-2 w-72 mx-auto"
      >
        <div class="mb-4">
          <p class="text-lg">Sign in with</p>
          <ul class="my-2">
            <li>
              <a
                :href="githubLink"
                class="
                  flex
                  items-center
                  justify-center
                  w-full
                  border
                  py-0.5
                  rounded
                  hover:border-blue-400
                  transition-all
                "
              >
                <div class="text-xl">
                  <font-awesome-icon icon="fa-brands fa-github" />
                </div>
                <div class="ml-1">
                  <p class="font-bold">GitHub</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useErrorStore } from "@/store/errorStore";
import { useAuthStore } from "@/store/authStore";
import { defineComponent, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { checkValidEmail, checkValidPassword } from "@/helpers/auth";
import { login } from '@/services/OAuth2Service'

export default defineComponent({
  setup() {
    const mainStore = useAuthStore();
    const errorStore = useErrorStore();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const errors = computed(() => errorStore.errors);

    const debounce = (func: any, delay = 500) => {
      let timer: number;

      return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    watch(
      email,
      debounce(() => {
        if (!checkValidEmail(email.value)) {
          if (!errorStore.messageInArray("Invalid e-mail"))
            errorStore.addError({ id: new Date(), message: "Invalid e-mail" });
        } else {
          errorStore.deleteMessage("Invalid e-mail");
        }
      })
    );

    watch(
      password,
      debounce(() => {
        if (!checkValidPassword(password.value)) {
          if (!errorStore.messageInArray("Invalid password"))
            errorStore.addError({
              id: new Date(),
              message: "Invalid password",
            });
        } else {
          errorStore.deleteMessage("Invalid password");
        }
      })
    );

    const emailAndPasswordAreValid = computed(
      () => checkValidEmail(email.value) && checkValidPassword(password.value)
    );

    const handleUserSignin = async () => {
      try {
        await mainStore.login(email.value, password.value);
        router.push({ name: "home" });
      } catch (e: any) {
        errorStore.clearErrors();
        errorStore.addError({
          id: new Date(),
          status: 401,
          message: e.response.data.msg,
        });
      }
    };
    
    const githubLink = ref('')

    const handleGithubSignIn = async () => {
      const res = await login()
      return res.auth.url
    }
    
    handleGithubSignIn()
      .then(data => githubLink.value = data)
    return {
      handleUserSignin,
      email,
      password,
      errors,
      emailAndPasswordAreValid,
      handleGithubSignIn,
      githubLink
    };
  },
});
</script>

<style>
.error-list-enter-active,
.error-list-leave-active {
  transition: all 0.5s ease;
}

.error-list-enter-from,
.error-list-leave-to {
  opacity: 0;
  /* transform: translateX(30px); */
}
</style>