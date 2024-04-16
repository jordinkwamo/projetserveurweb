// Importer notre copie d'axios

import http from "./axiosAPI";

const useAuth = () => {
    const login = async (infoLogin) => {
        const user = await http.post(`/login`,infoLogin)
        console.log("log user" ,user);
        return user.data
    }

    return {login}
}

export default useAuth