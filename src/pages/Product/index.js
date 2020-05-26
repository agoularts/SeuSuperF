import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Button, Paper, ExpansionPanel, ExpansionPanelSummary, 
    ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import { Favorite , FavoriteBorder } from '@material-ui/icons';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import bananaTerra from '../../../public/assets/product/bananaTerra.png';
import alfaceCrespa from '../../../public/assets/product/alfaceCrespa.png';
import batataInglesa from '../../../public/assets/product/batataInglesa.png';
import lentilha from '../../../public/assets/product/lentilha.png';
import snowFlakesCereal from '../../../public/assets/product/snowFlakesCereal.png';
import cocaCola from '../../../public/assets/product/cocaCola.png';
import adesOriginal from '../../../public/assets/product/adesOriginal.png';
import milhoLata from '../../../public/assets/product/milhoLata.png';
import catchup from '../../../public/assets/product/catchup.png';
import chocoCaju from '../../../public/assets/product/chocoCaju.png';

export default function Product(props) {
    const [ product, setProduct ] = useState([]);

    const history = useHistory()


    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }

                try {
                    const { id } = props.match.params
                    const retornoApi = await api.get(`/product/${id}`, {headers: { auth: localStorage.userToken }} )
                    setProduct(retornoApi.data)

                } catch (error) {
                    alert('Erro ao consultar a API')                
                }
            }
            
            fetchData()

        },
        [props.match.params]
    )

    return (
        <div className="product-container" >

            <header> 
                <img src={ logoImg } alt="Seu Super" />
            </header>
            <div>
                { product.map(prod => (
                    <div key={ prod.id }>
                        <section className="title-container">
                            <Link className="back-link" to="/produto/lista">
                                { <FiArrowLeft size={ 25 } color="#000" /> }</Link>

                            <Paper className="title-paper">
                                <h1>
                                    { prod.name }
                                    <Checkbox icon={ <FavoriteBorder /> } checkedIcon={ < Favorite /> } color="primary" />
                                </h1>
                                <p>{ prod.category }</p>
                                <p>{ prod.brand }</p>
                                
                            </Paper>
                        </section>

                        <section className="product-info">
                            <img src={`/assets/product/${prod.img}.png`} alt={ prod.name } />
                            
                            <Paper className="product-info-paper">
                                <p> { prod.description } </p>
                                <br />
                                <p> { prod.specifications }</p>
                            </Paper>
                        </section>

                        <div className="side-by-side">
                            <div className="expansion-panel">
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography className="heading">COMO COMPRAR</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <Typography className="panel-content">{ prod.howToBuy}</Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                    >
                                    <Typography className="heading">COMO ARMAZENAR</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <Typography className="panel-content">{ prod.howToStore}</Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                               
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                        >
                                        <Typography className="heading">COMO PREPARAR</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                        <Typography className="panel-content">{ prod.howToPrepare}</Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4a-content"
                                        id="panel4a-header"
                                        >
                                        <Typography className="heading">COMO DESCARTAR</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                        <Typography className="panel-content">{ prod.howToDiscard}</Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>                 
                            </div>


                            <Paper className="info-nutri-paper">
                                <strong>Informações Nutricionais</strong>
                                    <p>Porção de { prod.portion }g</p><br />
                                    <p>Valor nutricional: { prod.calories } Kcal</p>
                                    <p>Carboídratos: { prod.carbohidrate }g</p>
                                    <p>Proteínas: { prod.protein }g</p>
                                    <p>Gorduras Totais: { prod.totalFat }g</p>
                                    <p>Gordura Saturada: { prod.saturatedFat }g</p>
                                    <p>Gordura Trans: { prod.transFat }g</p>
                                    <p>Colesterol: { prod.cholesterol }</p>
                                    <p>Fibra alimentar: { prod.dietaryFiber }g</p>
                                    <p>Sódio: { prod.sodium }</p>
                                    <p>Vitaminas: { prod.vitamins }</p>
                                    <p>Cálcio: { prod.calcium }</p>
                                    <p>Vitamina B1: { prod.vitB1 }</p>
                                    <p>Vitamina B2: { prod.vitB2 }</p>
                                    <p>Gordura Monoinsaturada: { prod.monoinsaturatedFat }</p>
                                    <p>Vitamina B6: { prod.vitB6 }</p>
                                    <p>Ferro: { prod.iron }</p>
                                    <p>Niacina: { prod.niacin }</p>
                                    <p>Ácido Pantotênico: { prod.pantothenicAcid }</p>                                    <p>Ácido Fólico: { prod.folicAcid }</p>
                                    <p>Açúcares: { prod.sugar }</p>
                            </Paper>
                        </div>

                        <Paper className="curiosity">
                            <p><strong>Curiosidades:</strong> <br />{ prod.curiosities }</p> </Paper>

                    </div>
                ))}

            </div>
        </div>
    )
}
