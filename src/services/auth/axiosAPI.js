import axios from "axios";

import useAuthStore from '@/stores/authStore'
// Ajouter l'url de base par defaut a axios
const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

//Recuperer automatiquement le token apres authentification

http.interceptors.request.use(config => {
    //Recuperer le token depuis le store
    const { currentToken: token } = useAuthStore()
    
    //Ajouter le token a la requete
    config.headers = {
        'Authorization': token ? `Bearer ${token}` : '',
    }

    return config
})

export default http