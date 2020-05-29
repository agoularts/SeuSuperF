import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function SearchProd(props) {
    const [ product, setProduct ] = useState([]);
    const [ search, setSearch ] = useState('');

    const history = useHistory();

    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }

                try {
                    const retornoApi = await api.get('listProduct', { headers: { auth: localStorage.userToken }})
                    setProduct(retornoApi.data)

                } catch(err) {
                    alert('Deu ruim')
                }
            }
            fetch()
        },
        []
    )

    useEffect(() => {
        async function fetch() {
            try {
                const params = {};
                if( search ){
                    params.name_like = search;
                }

                const retornoApi = await api.get('listProduct', { headers: { auth: localStorage.userToken }, params })
                    setProduct(retornoApi.data)
                    console.log(retornoApi);
                } catch(err) {
                    alert('Deu ruim')
                }
            }
            fetch()
        }, [search] 
    )


    async function handleOnClick(id) {
        history.push(`/produto/${ id }`);
    }

    async function gotoMenu() {
        history.push("/menu");
    } 

    return (
        <div className="search-container">
            <header>
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoMenu()} />
            </header>

            <input type="search" 
                className="search-input" 
                placeholder="Busque por produtos e mercados..."
                value={ search }
                onChange={(e) => setSearch(e.target.value)}
                />

            <div>
                <Link className="back-link" to="/menu">
                    { <FiArrowLeft size={ 25 } color="#E02041" /> }
                        Voltar
                </Link>
            </div>
            
            <div>
            {product.map(prod => (
                <div key={ prod.id }>
                
                    <button className="button" onClick={() => handleOnClick(prod.id) }>
                        { prod.name }
                        <p>{ prod.category }</p>
                    </button>
                </div>
            ))}
            </div>
        </div>
    ) 
}