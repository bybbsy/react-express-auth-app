# vue-client

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
​

## Vue-client
### Authentication and authorization
I used Bearer Authentication method with access and refresh tokens. Acess token stored in local storage, refresh token stored as cookie.

When access token is expired axios interceptor sends request '/api/refresh' to update all tokens. If refresh token is not expired then it receives a new pair of tokens, otherwise it recieves an error and user need to sign-in again.

User receives both tokens on sign-in and sign-up actions.

### Summary:
- I used [Axios](https://axios-http.com/) to make requests to the server (See [AxiosClient](https://github.com/bybbsy/vue-express-auth-app/blob/master/vue-client/src/services/index.ts))
- I used services:
    - [authService](https://github.com/bybbsy/vue-express-auth-app/blob/master/vue-client/src/services/cardService.ts) - for handling authorization and authentication operations
    - [cardService](https://github.com/bybbsy/vue-express-auth-app/blob/master/vue-client/src/services/cardService.ts) - for receiving cards (Available only for logged-in users)
- I Used [Pinia](https://pinia.vuejs.org/)🍍 for implementing stores ([authStore](https://github.com/bybbsy/vue-express-auth-app/blob/master/vue-client/src/store/authStore.ts), [cardStore](https://github.com/bybbsy/vue-express-auth-app/blob/master/vue-client/src/store/cardStore.ts), [errorStore](https://github.com/bybbsy/vue-express-auth-app/blob/master/vue-client/src/store/errorStore.ts))
- I used [TailwindUI](https://tailwindui.com/) for stylings