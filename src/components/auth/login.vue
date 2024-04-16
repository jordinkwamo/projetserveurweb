<template>
  <main>
      <form @submit.prevent="connecter">
          <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="loginInfo.email">
          </div>
          <div class="mb-3">
              <label for="mpd" class="form-label">Mot de passe</label>
              <input type="password" class="form-control" id="mdp" v-model="loginInfo.mot_de_passe">
          </div>
          <button type="submit" class="btn btn-primary">Se connecter</button>
      </form>
  </main>

</template>

<script setup>
import { ref } from "vue";

import useAuth from '@/services/auth/serviceAuth'
import { useRouter } from "vue-router";
import useAuthStore from '@/stores/authStore'
const { login } = useAuth()

const { setUser, setToken } = useAuthStore()

// const user = ref({})
const loginInfo = ref({
  email: null,
  mot_de_passe: null
})
const router = useRouter()
const connecter = () => {
  login(loginInfo.value).then(res => {
      // user.value = res.data
      setToken(res.token)
      setUser(res.data)
      router.push('/')
  }).catch(err => {
      router.push('/login')
      console.log('Erreur connexion', err)
  })
}
</script>