import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function ListProduct(props) {
    const [product, setProduct] = useState([]);

    const history = useHistory();

    // usuario permitido para alteração de mercado
    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/admin');
                }
                
                try {
                    const retornoApi = await api.get('productEdit', { // busca os itens em /productEdit
                        headers: {                                    //valida o token do usuário e autoriza acesso à API
                            auth: localStorage.userToken 
                        } } )
                    setProduct(retornoApi.data) // seta as infos encontradas em /productEdit em product
                } catch(err) {
                    alert('Ocorreu algum erro tente novamente mais tarde!')
                }
            }            
            fetch()
        },
        []
    )

    async function gotoEdit(cnpj) { // redireciona para o form de edição
        history.push(`/produto/editar/${cnpj}`)
    }
    
    async function gotoAdmin() { //redireciona para o menu do admin
        history.push("/admin");
    } 

    
    return (
        <div className="product-list-container">
            <header>
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoAdmin()} />
                <span>Bem vindo Admin!</span>
            </header>

            <h1>Editar Produtos</h1>
            <ul>
                { product.map(prod => (
                    <li key={ prod.id }>
                        <strong>{ prod.name }</strong>
                        <p>{ prod.category }</p>
                        <p>{ prod.brand }</p>
                       
                        <button onClick={() => gotoEdit(prod.id)} type="button" class>
                        <FiEdit size={ 20 } color="#a8a8b3"/>
                        </button>

                    </li>
                ))}
            </ul>



        </div>
    )
}