import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import { validaToken } from '../../services/auth';
import logoImg from '../../assets/logo.svg';

export default function NewRecycle() {
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [curiosities, setCuriosities] = useState('');
    const [advantages, setAdvantages] = useState('');
    const [disavantages, setDisadvantages] = useState('');
    
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

    async function handleNewProduct(e) {
        e.preventDefault();

        const data = {
            name,
            img,
            description,
            category,
            curiosities,
            advantages,
            disavantages
        };
        
        if(name === '' || img === '' || description === '' || category === '' || 
            curiosities === '' || advantages === '' || disavantages === '' ) {
            
            alert('Preencha os campos com valores válidos.');
        }  
        else{    
            try {
                const response = await api.post('recycle', data);
                history.push('/admin');

                alert(`${ response.data.name } cadastrado com sucesso!`);
                
            } catch (err) {
                alert('Erro no cadastro, tente novamente.');
            }
        }
    }

    async function gotoMenu() {
        history.push("/menu");
    } 

    return (
        <div className="newProduct-container">
                {/* Logo e texto */}
                <section className="logo">
                    <img src={ logoImg } alt="Seu Super" /> {/*onClick={() => gotoMenu()} */}
                    <h1>Cadastrar novo item em Reciclagem</h1>

                {/* Voltar */} 
                    <Link className="back-link" to="/admin">
                        <FiArrowLeft size={ 16 } color="#E02041" />
                            Voltar
                    </Link>
                </section>

                {/* inputs */}
                    <form onSubmit={ handleNewProduct }>
                        
                        <input 
                            placeholder="Nome"
                            value={ name }
                            onChange={ e=> setName(e.target.value) }
                        />
                       
                        <input 
                            placeholder="Imagem"
                            value={ img }
                            onChange={ e=> setImg(e.target.value) }
                        /> 
                        
                        <input className="text"
                            placeholder="Categoria"
                            value={ category }
                            onChange={ e=> setCategory(e.target.value) }
                        />   
                    
                       
                        <textarea className="text"
                            placeholder="Descrição"
                            value={ description }
                            onChange={e => setDescription(e.target.value)}
                        /> 

                        <textarea className="text"
                            placeholder="Vantagens"
                            value={ advantages }
                            onChange={ e=> setAdvantages(e.target.value) }
                        />

                        <textarea className="text"
                            placeholder="Desvantagens"
                            value={ disavantages }
                            onChange={ e=> setDisadvantages(e.target.value) }
                        />

                        <textarea className="text"
                            placeholder="Curiosidades"
                            value={ curiosities }
                            onChange={ e=> setCuriosities(e.target.value) }
                        /> 

                      <button className="button" type="submit">Confirmar</button>
                    </form>
                    
            </div>
        )
}

