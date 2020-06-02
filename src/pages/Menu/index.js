import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdShoppingCart, MdLocationOn, MdSettings, MdPerson, MdExitToApp } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';
import { FaRecycle, FaShoppingBag } from 'react-icons/fa';
import { Button } from '@material-ui/core';

import { validaToken } from '../../services/auth';
import './styles.css';
import logo from '../../assets/logo.svg'

export default function Menu() {
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

    return (
        <div className="menu-container">

            <section> 
                <img src={ logo } alt="Seu Super" />

            {/*instancia os botoes do Menu*/}
                    <Link className="button" to="/mercados">
                        { < MdShoppingCart size={ 30 } color="#fff" /> }
                    <br /> Mercado
                    </ Link>

                <Link className="button" to="/produto">
                    { < FaShoppingBag size={ 30 } color="#fff" /> }
                    <br />Produtos
                </ Link>
            
                <Link className="button" to="/favoritos">
                    { < AiFillHeart size={ 30 } color="#fff" /> }
                    <br />Favoritos
                </ Link>
          
                <Link className="button" to="/reciclagem">
                    { < FaRecycle size={ 30 } color="#fff" /> }
                    <br />Reciclagem
                </ Link>
            </section>

            <div className="content">

                <Link className="button" to="/">
                    { < MdPerson size={ 32 } color="#fff" /> }
                    &nbsp; Conta
                </ Link>

                <Link className="button" to="/">
                    { < MdSettings size={ 32 } color="#fff" /> }
                    &nbsp; Opções
                </ Link>

                <Link className="back-link" to="/">
                    { <MdExitToApp size={ 25 } color="#E02041" /> }
                        Sair
                </Link>

            </div>
        </div >
    )
}