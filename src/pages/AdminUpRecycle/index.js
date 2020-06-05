import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import { validaToken } from '../../services/auth';
import logoImg from '../../assets/logo.svg';

export default function UpdateRecycle(props) {
    const [markets, setMarkets] = useState([]);
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
                if (!token) {
                    return history.push('/');
                }

                try {
                    const { cnpj } = props.match.params
                    const retornoApi = await api.get(`/searchMarket/${ cnpj }`,
                        {
                            headers: {
                                auth: localStorage.userToken
                            }
                        })
                        setName(retornoApi.data[0].name)
                        setCnpj(retornoApi.data[0].cnpj)
                        setAddress(retornoApi.data[0].address)
                        setCity(retornoApi.data[0].city)
                        setUf(retornoApi.data[0].uf)
                        setPhone(retornoApi.data[0].phone)
                        setServices(retornoApi.data[0].services)

                } catch (err) {
                    console.log(err)
                    alert('Erro no useEffect searchMarket')
                }
            }
            fetchData()
        },
        [props.match.params]
    )

    async function handleUpdateMarket(cnpj) {
        const data = {
            cnpj, name, address, city, uf, phone, services,
        };

        try {
            cnpj = data.cnpj
            console.log('hello crl')
            const response = await api.put(`/updateMarket/${cnpj}`, data);
            
            setCnpj(response.data.cnpj)
            setName(response.data.name)
            setAddress(response.data.address)
            setCity(response.data.city)
            setUf(response.data.uf)
            setPhone(response.data.phone)
            setServices(response.data.services)
            console.log(response.data)

            alert(`${response.data.name} alterado com sucesso!`);
        } catch (err) {
            console.log(markets)
            alert('Erro na alteração do cadastro, tente novamente.');
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
                    <img src={logoImg} alt="Seu Super" onClick={() => gotoMenu()} />
                    <h1>Alterar cadastro de reciclagem</h1>

                    {/* Voltar */}
                    <Link className="back-link" to="/mercados">
                        <FiArrowLeft size={16} color="#E02041" />
                            Voltar
                    </Link>
                </section>

                <div>{/* inputs */}

                    <form onSubmit={ () => handleUpdateMarket(cnpj)}>
                        <input
                            placeholder={ name }
                            value={ name }
                            onChange={ e => setName(e.target.value) }
                        />

                        <input
                            value={ cnpj }
                            onChange={e => setCnpj(e.target.value)}
                        />

                        <input
                            value={ address }
                            onChange={e => setAddress(e.target.value)}
                        />

                        <input
                            value={ city }
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            value={ uf }
                            onChange={e => setUf(e.target.value)}
                        />

                        <input
                            value={ phone }
                            onChange={e => setPhone(e.target.value)}
                        />

                        <input
                            value={ services }
                            onChange={e => setServices(e.target.value)}
                        />

                        <button className="button" type="submit">Salvar alterações</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )

}