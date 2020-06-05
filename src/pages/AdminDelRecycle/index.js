import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function DeleteRecycle(props) {
    const [recycle, setRecycle] = useState([]);
    
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
                    const retornoApi = await api.get('recycle', { headers: { auth: localStorage.userToken } } )
                    setRecycle(retornoApi.data)
                } catch(err) {
                    alert('Ocorreu algum erro tente novamente mais tarde!')
                }
            }            
            fetch()
        },
        []
    )

    async function handleDeleteRecycle(id) {
        try {
            await api.delete(`recycle/${id}`, {
                headers: { 
                    auth: localStorage.userToken,
                 }
            }); 
                
                setRecycle(recycle.filter(recy => recy.id !== id));
        } catch (err) {
            console.log(id)
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

            <h1>Itens de reciclagem cadastrados</h1>
            <ul>
                { recycle.map(recy => (
                    <li key={ recy.id }>
                        <strong>{ recy.name }</strong>
                       {// <p>{ recy.categoria }</p>                      
                        }
                        <button className="delete-button"
                        onClick={ () => handleDeleteRecycle(recy.id) } type="button">
                        <FiTrash2 size={ 20 } color="#a8a8b3"/>
                        </button>

                    </li>
                ))}
            </ul>



        </div>
    )
}