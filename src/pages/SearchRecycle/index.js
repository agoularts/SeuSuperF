import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function ListRecycle(props) {
    const [ recycle, setRecycle ] = useState([]);
    const history = useHistory();

    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
                
                try {
                    const retornoApi = await api.get('listRecycle')
                    setRecycle(retornoApi.data)
                    console.log(retornoApi.data)
                    
                } catch(err) {
                    alert('Deu ruim')
                }
            }
            fetch()
        },
        []
    )

    return (
        <div className="listRec-container">
            <header> 
                <img src={ logoImg } alt="Seu Super"/>
            </header>

            <div>
                <Link className="back-link" to="/menu">
                    { <FiArrowLeft size={ 25 } color="#E02041" /> }
                        Voltar
                </Link>
            </div>
            
            { recycle.map(recy => (
                <div key={ recy.id }>
                    
                    <Link className="button" to={`/reciclagem/${recy.id}`}>
                        { recy.name }
                        </ Link>
                       
                </div>
            ))}

        </div>
    )
}