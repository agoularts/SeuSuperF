import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';

import { validaToken } from '../../services/auth';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Favorite(props) {
    const [markets, setMarkets] = useState([]);
    
    const history = useHistory();
    
    const userId = localStorage.getItem('userId');

    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
                
                try {
                    const { cnpj } = props.match.params
                    const params = { cnpj }
                    const retornoApi = await api.get('market', { params })
                    setMarkets(retornoApi.data)
                    console.log(retornoApi.data)
                
                } catch(err) {
                    alert('Deu ruim')
                }
            }
            fetch()
        },
        []
    )
    
    async function handleDeleteFavorites(cnpj) {
        try {
            await api.delete(`mercados/${ cnpj }`, {
                headers: {
                    Authorization: userId, 
                }
            }); 

            setMarkets(markets.filter(market => market.cnpj !== cnpj));
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="fav-container">
            <header>
                <img src={ logoImg } alt="Seu Super"/>
                <span>Seus Favoritos</span>

                {/* Botão de logout */}
                <button className="logout" onClick={ handleLogout } type="button">
                <FiPower size={ 18 } color="#E02041"/>
                </button>
            </header>

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
                        <button onClick={ () => handleDeleteFavorites(market.cnpj) } type="button">
                        <AiFillHeart size={ 20 } color="#a8a8b3"/>
                        </button>

                    </li>
                ))}
            </ul>

            <div>
                <Link className="back-link" to="/menu">
                    { <FiArrowLeft size={ 25 } color="#E02041" /> }
                        Voltar
                </Link>
            </div>

        </div>
    )
}
