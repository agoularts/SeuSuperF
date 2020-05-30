import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import { validaToken } from '../../services/auth';
import logoImg from '../../assets/logo.svg';

export default function NewMarket() {
    const [cnpj, setCnpj] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [phone, setPhone] = useState('');
    const [services, setServices] = useState('');

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

    async function handleNewMarket(e) {
        e.preventDefault();

        const data = {
            cnpj,
            name,
            address,
            city,
            uf,
            phone,
            services,
        };

        try {
            const response = await api.post('market', data);
            history.push('/mercados');
            alert(`Bem-vindo, ${ response.data.name }!`);
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    async function gotoMenu() {
        history.push("/menu");
    } 

    return (
        <div className="newMarket-container">
            <div className="content">

                {/* Logo e texto */}
                <section className="logo">
                    <img src={ logoImg } alt="Seu Super" onClick={() => gotoMenu()} />
                    <h1>Cadastrar novo mercado</h1>
                    <p>Faça seu cadastro, entre na plataforma.</p>

                {/* Voltar */} 
                    <Link className="back-link" to="/mercados">
                        <FiArrowLeft size={ 16 } color="#E02041" />
                            Voltar
                    </Link>
                </section>

                {/* inputs */}
                    <form onSubmit={ handleNewMarket }>
                        <input 
                            placeholder="Nome Fantasia"
                            value={ name }
                            onChange={ e=> setName(e.target.value) }
                        />

                        <input type="text" pattern="[0-9]*"
                            placeholder="CNPJ"
                            value={ cnpj }
                            onChange={ e=> setCnpj(e.target.value) }
                        />

                        <input 
                            placeholder="Endereço"
                            value={ address }
                            onChange={ e=> setAddress(e.target.value) }
                        />   

                        <input 
                            placeholder="Cidade"
                            value={ city }
                            onChange={ e=> setCity(e.target.value) }
                        /> 

                        <input 
                            placeholder="Estado"
                            value={ uf }
                            onChange={ e=> setUf(e.target.value) }
                        /> 

                        <input type="text" pattern="[0-9]*"
                            placeholder="Telefone"
                            value={ phone }
                            onChange={ e=> setPhone(e.target.value) }
                        />

                        <input 
                            placeholder="Serviços oferecidos"
                            value={ services }
                            onChange={ e=> setServices(e.target.value) }
                        /> 

                        <button className="button" type="submit">Cadastrar</button>
                    </form>
            </div>
        </div>
    )
}

