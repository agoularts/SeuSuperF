import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Market(props) {
    const [markets, setMarkets] = useState([]);
    const history = useHistory();
    const userName = localStorage.getItem('userName');

    // usuario permitido para alteração de mercado
    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
                
                try {
                    const retornoApi = await api.get('market', { headers: { auth: localStorage.userToken } } )
                    setMarkets(retornoApi.data)
                    
                } catch(err) {
                    alert('Ocorreu algum erro tente novamente mais tarde!')
                }
            }            
            fetch()
        },
        []
    )
 
    async function gotoMenu() {
        history.push("/menu");
    } 

    
    return (
        <div className="market-container">
            <header>
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoMenu()} />
                <span>Bem vindo { userName }!</span>

                <Link className="back-link" to="/menu">
                { <FiArrowLeft size={ 25 } color="#E02041" /> }
                    Voltar
                </Link>
            </header>

            <h1>Mercados cadastrados</h1>
            <ul>
                { markets.map(market => (
                    <li key={ market.cnpj }>
                        <strong>MERCADO:</strong>
                        <p>{ market.name }</p>

                        <strong>ENDEREÇO:</strong>
                        <p>{ market.address }</p>
                        <p>{ market.city }</p>
                        <p>{ market.uf }</p>

                        <strong>TELEFONE:</strong>
                        <p>{ market.phone }</p>

                        <strong>SERVIÇOS DISPONÍVEIS:</strong>
                        <p>{ market.services }</p>                     
                    </li>
                ))}
            </ul>

        </div>
    )
}