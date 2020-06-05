import React, { useState } from 'react'

import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import SimpleDialog from '../../components/Dialog/Dialog'

export default function Admin() {
    const [open, setOpen] = useState(false)
    const [link, setLink] = useState({})

    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
            }            
            fetch()
        },
        []
    )

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
                <img src={ logoImg } alt="Seu Super" />
                <span>Bem vindo Admin!</span>
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