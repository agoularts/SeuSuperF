import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function ListMarket(props) {
    const [markets, setMarkets] = useState([]);

    const history = useHistory();

    // usuario permitido para alteração de mercado
    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/admin');
                }
                
                try {
                    const retornoApi = await api.get('market', { 
                        headers: { 
                            auth: localStorage.userToken 
                        } } )
                    setMarkets(retornoApi.data)
                } catch(err) {
                    alert('Ocorreu algum erro tente novamente mais tarde!')
                }
            }            
            fetch()
        },
        []
    )

    async function gotoEdit(cnpj) {
        history.push(`/mercados/editar/${cnpj}`)
    }
    
    async function gotoAdmin() {
        history.push("/admin");
    } 

    
    return (
        <div className="market-container">
            <header>
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoAdmin()} />
                <span>Bem vindo Admin!</span>
                                
                <Link className="back-link" to="/admin">
                    {<FiArrowLeft size={25} color="#E02041" />}
                    Voltar
                </Link>
            </header>

            <h1>Editar Mercados</h1>
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

                        <button onClick={() => gotoEdit(market.cnpj)} type="button">
                        <FiEdit size={ 20 } color="#a8a8b3"/>
                        </button>

                    </li>
                ))}
            </ul>

        </div>
    )
}