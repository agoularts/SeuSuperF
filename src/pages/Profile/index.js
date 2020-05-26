import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Profile() {        
    const userName = localStorage.getItem('userName');
    const history = useHistory();
    
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
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
