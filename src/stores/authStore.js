//Creation du store
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const token = ref(null)
    const router = useRouter()

    // Mettre a jour les variables (setters)
    const setUser = newUser => user.value = newUser
    const setToken = newToken => token.value = newToken

    //Se deconnecter
    const logout = () => {
        setUser(null)
        setToken(null)
        router.push('/login')
    }

    //Recuperer les valeurs (getters)
    const currentToken = computed(() => token.value)
    const currentUser = computed(() => user.value)

    return { setToken, setUser,user,token, currentToken, currentUser, logout }
},
    {
        persist: true
    })

export default useAuthStore