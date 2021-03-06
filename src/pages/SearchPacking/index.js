import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function SearchPacking(props) {
    const [ packing, setPacking ] = useState([]);
    const [ search, setSearch ] = useState('');
    const history = useHistory();

    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
            } 
            fetch()
        }, 
        [] 
    )
    
    let time = null
    const handleDigitado = e => {
        let texto = e.target.value
        clearTimeout(time)
        time = setTimeout(() => {
            setSearch(texto)
        }, 1000)
    }

    useEffect(() => {
        async function fetch() {
            try {
                const params = {};
                    params.name = search;

                const retornoApi = await api.get('searchPacking', { headers: { auth: localStorage.userToken }, params})
                    setPacking(retornoApi.data)
                    console.log(retornoApi.data)
                } catch(err) {
                    alert('Deu ruim')
                }
            } 
            fetch()
        },[search] 
    )

    async function gotoMenu() {
        history.push("/menu");
    }
    
    return (
        <div className="listPack-container">
            <header> 
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoMenu()} />
            </header>

            <input type="search" 
                className="search-input" 
                placeholder="Buscar..."
                onChange={(e) => handleDigitado(e)}
            />

            <div>
                <Link className="back-link" to="/menu">
                    { <FiArrowLeft size={ 25 } color="#E02041" /> }
                        Voltar
                </Link>
            </div>
            
            { packing.map(pack => (
                <div key={ pack.id }>
                        
                    <Link className="button" to={`/packing/${pack.id}`}>
                        { pack.name }
                    </ Link>
                        
                </div>
            ))}

        </div>
    )
}