import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPower } from 'react-icons/fi';

import { validaToken } from '../../services/auth';
import './styles.css';

export default function Maps() {
    const history = useHistory();
    
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
            }
            fetchData()

        },
        []
    )

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    async function gotoMenu() {
        history.push("/menu");
    } 


    return (
        <div className="maps-container">
        <h1>Mapa</h1>

            <Link className="back-link" to="/menu">
                <FiArrowLeft size={16} color="#E02041" onClick={() => gotoMenu()} />
                        Voltar ao Menu
            </Link>

            <button className="logout" onClick={ handleLogout } type="button">
                <FiPower size={ 18 } color="#E02041"/>
            </button>

        </div>
    )
}

