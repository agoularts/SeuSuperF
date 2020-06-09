import React, { useState, useEffect }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';

import api from '../../services/api';
import { logout } from '../../services/auth';
import './styles.css';

import logo from '../../assets/logo.svg';
import wp from '../../assets/wp.png';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    useEffect(() => logout(), [])

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { email, password });

            localStorage.setItem('userEmail', email);
            localStorage.setItem('userID', response.data.id);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userToken', response.data.token);

            
            if ('userAdmin')
                history.push('/admin');
            else
                history.push('/menu');
            
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={ logo } alt="Seu Super" />

                <form onSubmit={ handleLogin }>
                    <h1>Faça seu login</h1>

                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={ email }
                        onChange={ e => setEmail(e.target.value) }
                        />

                    <input type="password"
                        placeholder="Senha"
                        value={ password }
                        onChange={e => setPassword(e.target.value)}
                        />
                        
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/cadastro">
                        <FiUserPlus size={ 20 } color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={wp} alt="Shopper" />
        </div>
    )
}
