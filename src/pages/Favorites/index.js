import React, { useState, useEffect } from 'react';
import {  useHistory } from 'react-router-dom';

import { validaToken } from '../../services/auth';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Favorite(props) {
    const [favorites, setFavorites] = useState([]);
    const history = useHistory();

    const userId = localStorage.getItem('userID');
    
    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
                
                try {
                    const retornoApi = await api.get('/favorite', {headers: { auth: localStorage.userToken }} )
                    setFavorites(retornoApi.data)                
                } catch(err) {
                    alert('Deu ruim')
                }
            }
            fetch()
        },
        [props.match.params]
    )
    
    async function gotoProduct(id) {
        history.push(`/produto/${ id }`);
    }

    async function gotoMenu() {
        history.push("/menu");
    } 
    
    return (
        <div className="fav-container">
            <header>
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoMenu()}/>
                <span>Seus Favoritos</span> 
            </header>

            <div>
            {favorites.map(fav => (
                <div key={ fav.user_id }>
                
                    <button className="button" onClick={() => gotoProduct(fav.product_id) }>
                        { fav.id } { fav.name }
                    </button>
                </div>
            ))}
            </div>

        </div>
    )
}
