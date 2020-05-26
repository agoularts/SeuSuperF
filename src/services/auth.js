import api from '../services/api';

export const autenticado = () => {

    let token = localStorage.userToken

    if(token){
        return true
    } else {
        return false   
    }
}

export const validaToken = async () => {
    try {
        let token = localStorage.userToken
        if(!token) {
            return false
        }

        const result = await api.get('/config/validaToken', { headers: { auth: localStorage.userToken } });
        
        if(!result.data.success) {
            localStorage.removeItem('userToken')
            localStorage.removeItem('userName')
            localStorage.removeItem('userEmail')  
        }

        return true

    } catch (error) {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userName')
        localStorage.removeItem('userEmail')
    }
}

export const logout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
}