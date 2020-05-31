import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();


    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            password,
        };

        if(name === '' || email === '' || password === ''){
            alert('Preencha os campos com valores válidos.');
        }  
        
        else{ 
            try {
                const response = await api.post('user', data);
                history.push('/');
                alert(`Olá, ${ response.data.name }!`);

            } catch (err) {
                alert('Erro no cadastro, tente novamente.');
            }
        }
    }

    
    return (
        <div className="register-container">
            <div className="content">

                <section>
                    <img src={ logoImg } alt="Seu Super" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e encontre os seus supermercados favoritos.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={ 16 } color="#E02041"/>
                        Voltar ao Login
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome"
                        value={ name }
                        onChange={ e=> setName(e.target.value) }
                    />

                    <input type="email"
                        placeholder="E-mail"
                        value={ email }
                        onChange={ e=> setEmail(e.target.value) }
                    />

                    <input type="password"
                        placeholder="Senha"
                        value={ password }
                        onChange={ e=> setPassword(e.target.value) }
                    />                   
                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}