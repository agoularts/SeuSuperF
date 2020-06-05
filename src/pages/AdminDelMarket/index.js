import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function DeleteMarket(props) {
    const [markets, setMarkets] = useState([]);

    const history = useHistory();
    const userName = localStorage.getItem('userName');

    // usuario permitido para alteração de mercado
    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/admin');
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

    async function handleDeleteMarket(cnpj) {
        try {
            await api.delete(`market/${cnpj}`, {
                headers: { 
                    auth: localStorage.userToken,
                 }
            }); 
                
                setMarkets(markets.filter(market => market.cnpj !== cnpj));
        } catch (err) {
            console.log(cnpj)
            alert('Erro ao deletar o caso, tente novamente')
        } 
    }
    
    async function gotoAdmin() {
        history.push("/admin");
    } 

    
    return (
        <div className="market-container">
            <header>
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoAdmin()} />
                <span>Bem vindo Admin!</span>
            </header>

            <h1>Deletar Mercados</h1>
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

                        <button className="edit-button"
                        onClick={ () => handleDeleteMarket(market.cnpj) } type="button">
                        <FiTrash2 size={ 20 } color="#a8a8b3"/>
                        </button>

                    </li>
                ))}
            </ul>



        </div>
    )
}