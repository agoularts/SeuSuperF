import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function DeleteProduct(props) {
    const [product, setProduct] = useState([]);
    const [nutrition, setNutrition] = useState([]);
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

    async function handleDeleteProduct(id) {
        try {
            await api.delete(`product/${id}`, {
                headers: {
                    auth: localStorage.userToken,
                }
            });

            setProduct(product.filter(prod => prod.id !== id));
        } catch (err) {
            console.log(id)
            alert('Erro ao deletar o caso, tente novamente')
        }
    }

    async function handleDeleteNutrition(product_id) {
        try {
            await api.delete(`nutrition/${product_id}`, {
                headers: {
                    auth: localStorage.userToken,
                }
            });

            setNutrition(nutrition.filter(nutri => nutri.product_id !== product_id));
        } catch (err) {
            console.log(product_id, err)
            alert('Erro ao deletar o caso, tente novamente')
        }
    }

    async function gotoAdmin() {
        history.push("/admin");
    }


    return (
        <div className="delete-prod-container">
            <header>
                <img src={logoImg} alt="Seu Super" onClick={() => gotoAdmin()} />
                <span>Bem vindo Admin!</span>
            </header>

            <h1>Produtos cadastrados</h1>
            <ul>
                {product.map(prod => (
                    <li key={prod.id}>
                        <p>{prod.name}</p>
                        <p>{prod.category}</p>
                        <p>{prod.brand}</p>

                        <button className="edit-button"
                            onClick={() => handleDeleteProduct(prod.id), 
                                    () => handleDeleteNutrition(prod.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}