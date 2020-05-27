import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Profile(props) {        
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getIdem();
    const history = useHistory();
    
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
            }

            try {
                const { email } = props.match.params
                const retornoApi = await api.get(`/user`, {headers: { auth: localStorage.userToken }} )
                setUser(retornoApi.data)

            } catch (error) {
                alert('Erro ao consultar a API')                
            }

            fetchData()

        },
        []
    )
    
    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Seu Super"/>
                <span>Bem vindo, { userName }!</span>
            </header>
        </div>
    )
}
