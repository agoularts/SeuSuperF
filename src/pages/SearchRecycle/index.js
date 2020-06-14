import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function SearchRecycle(props) {
    const [recycle, setRecycle] = useState([]);
    const [search, setSearch] = useState('');
    const history = useHistory();

    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if (!token) {
                    return history.push('/');
                }
            }
            fetch()
        },
        []
    )

    async function gotoMenu() {
        history.push("/menu");
    }

    return (
        <div className="listRec-container">
            <header>
                <img src={logoImg} alt="Seu Super" onClick={() => gotoMenu()} />

                <Link className="back-link" to="/menu">
                    {<FiArrowLeft size={25} color="#E02041" />}
                        Voltar
                </Link>
            </header>


            <Link className="button" to={'/reciclagem/embalagens'}>
                Embalagens
                    </ Link>

            <Link className="button" to={'/reciclagem/simbolos'}>
                Símbolos
                    </ Link>

        </div>
    )
}