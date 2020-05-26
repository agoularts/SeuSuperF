import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiArrowLeft } from 'react-icons/fi';

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
          
    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    async function handleDeleteMarket(cnpj) {
        try {
            await api.delete(`mercados/${ cnpj }`); 
            setMarkets(markets.filter(market => market.cnpj !== cnpj));

        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente')
        }
    }
 
    return (
        <div className="market-container">
            <header>
                <img src={ logoImg } alt="Seu Super"/>
                <span>Bem vindo { userName }!</span>

                {/* Botão de acesso a tela de cadastro de novo mercado */}
                <Link className="button" to="/mercados/novo">Cadastrar novo mercado</ Link>

                {/* Botão de logout */}
                <button className="logout" onClick={ handleLogout } type="button">
                <FiPower size={ 18 } color="#E02041"/>
                </button>
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
                        
                        {/* Coverte valores para real. NÃO EXCLUIR! Será usado posteriormente 
                        <p>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value) }</p> */}

                        {/* Botao para excluir mercados. Será removido posteriormente */}
                        <button onClick={ () => handleDeleteMarket(market.cnpj) } type="button">
                        <FiTrash2 size={ 20 } color="#a8a8b3"/>
                        </button>

                    </li>
                ))}
            </ul>

            <Link className="back-link" to="/menu">
                { <FiArrowLeft size={ 25 } color="#E02041" /> }
                    Voltar
            </Link>

        </div>
    )
}
