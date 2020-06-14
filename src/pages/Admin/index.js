import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';


import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';
import SimpleDialog from '../../components/Dialog/Dialog'
import logoImg from '../../assets/logo.svg'

export default function Admin() {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState()
    const [link, setLink] = useState({})
    const history = useHistory();
    const userID = localStorage.getItem('userID');

    
    useEffect(
        () => {
            async function fetchData() {
                try{
                    const retornoApi = await api.get(`/userID/${userID}`, {
                        headers: {
                            auth: localStorage.userToken
                        }
                    })

                    setUser(retornoApi.data)

                    if(!retornoApi.data[0].admin)
                        return history.push('/');

                } catch (err) {
                    console.log(err)
                    alert('Erro na API')
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

    async function handleProduct(){
        setOpen(true)
        setLink({'Adicionar':'/produto/novo', 'Editar':'/produto/listar', 'Excluir':'/produto/deletar'})
    }

    async function handleMarket(){
        setOpen(true)
        setLink({'Adicionar':'/mercados/novo', 'Editar':'/mercados/listar', 'Excluir':'/mercados/deletar'})
    }

    async function handleRecycle(){
        setOpen(true)
        setLink({'Adicionar':'/reciclagem/novo', 'Editar':'/reciclagem/listar', 'Excluir':'/reciclagem/deletar'})
    }

    return(
        <div className="admin-content">
            
            <header>
                <img src={logoImg} alt="Seu Super" />
                <span>Bem vindo Admin!</span>

                <button className="logout" onClick={ handleLogout } type="button">
                <FiPower size={ 18 } color="#E02041"/>
                </button>
            </header>

            <div>
                <button className="button" onClick={handleProduct} >Produto</button>
                <button className="button" onClick={handleRecycle} >Reciclagem</button>
                <button className="button" onClick={handleMarket} >Mercado</button>
            </div>

            <SimpleDialog open={open} setOpen={setOpen} link={link}/>

        </div>
    )
}