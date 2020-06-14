import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import { validaToken } from '../../services/auth';
import logoImg from '../../assets/logo.svg';

export default function UpdateRecycle(props) {
    const [recycle, setRecycle] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [curiosities, setCuriosities] = useState('');
    const [advantages, setAdvantages] = useState('');
    const [disadvantages, setDisadvantages] = useState('');

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
                        setId(retornoApi.data[0].id)
                        setImg(retornoApi.data[0].img)
                        setDescription(retornoApi.data[0].description)
                        setCategory(retornoApi.data[0].category)
                        setCuriosities(retornoApi.data[0].curiosities)
                        setAdvantages(retornoApi.data[0].advantages)
                        setDisadvantages(retornoApi.data[0].disadvantages)

                } catch (err) {
                    console.log(err)
                    alert('Erro no useEffect searchMarket')
                }
            }
            fetchData()
        },
        [props.match.params]
    )

    async function handleUpdateRecycle(id) {
        const data = {
            name, img, description, category, curiosities, advantages, disadvantages
        };

        try {
            id = data.id
            const response = await api.put(`/updateRecycle/${id}`, data);
            
            setName(response.data[0].name)
            setId(response.data[0].id)
            setImg(response.data[0].img)
            setDescription(response.data[0].description)
            setCategory(response.data[0].category)
            setCuriosities(response.data[0].curiosities)
            setAdvantages(response.data[0].advantages)
            setDisadvantages(response.data[0].disadvantages)

            alert(`${response.data.name} alterado com sucesso!`);
        } catch (err) {
            alert('Erro na alteração do cadastro, tente novamente.');
        }
    }

    async function gotoAdmin() {
        history.push("/admin");
    }

    return (
        <div className="newMarket-container">
            <div className="content">

                {/* Logo e texto */}
                <section className="logo">
                    <img src={logoImg} alt="Seu Super" onClick={() => gotoAdmin()} />
                    <h1>Alterar cadastro de reciclagem</h1>

                    {/* Voltar */}
                    <Link className="back-link" to="/admin">
                        <FiArrowLeft size={16} color="#E02041" />
                            Voltar
                    </Link>
                </section>

                <div>{/* inputs */}

                    <form onSubmit={ () => handleUpdateRecycle(id)}>
                    <input 
                            placeholder={ name }
                            value={ name }
                            onChange={ e=> setName(e.target.value) }
                        />
                       
                        <input 
                            placeholder={ img }
                            value={ img }
                            onChange={ e=> setImg(e.target.value) }
                        /> 
                        
                        <input className="text"
                            placeholder={ category }
                            value={ category }
                            onChange={ e=> setCategory(e.target.value) }
                        />   
                       
                        <textarea className="text"
                            placeholder={ description }
                            value={ description }
                            onChange={e => setDescription(e.target.value)}
                        /> 

                        <textarea className="text"
                            placeholder={ advantages }
                            value={ advantages }
                            onChange={ e=> setAdvantages(e.target.value) }
                        />

                        <textarea className="text"
                            placeholder={ disadvantages }
                            value={ disadvantages }
                            onChange={ e=> setDisadvantages(e.target.value) }
                        />

                        <textarea className="text"
                            placeholder={ curiosities }
                            value={ curiosities }
                            onChange={ e=> setCuriosities(e.target.value) }
                        /> 

                        <button className="button" type="submit">Salvar alterações</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )

}