import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Paper, ExpansionPanel, ExpansionPanelSummary, 
    ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { validaToken } from '../../services/auth';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Symbol(props) {
    const [ symbol, setSymbol ] = useState([]);
    const history = useHistory();

    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }

                try {
                    const { id } = props.match.params
                    const retornoApi = await api.get(`/symbol/${id}`, 
                    {
                        headers: { 
                            auth: localStorage.userToken 
                        }})
                    setSymbol(retornoApi.data)  
                    
                } catch(err) {
                    alert('Deu ruim')
                }
            }
            fetchData()
        },
        []
    )

    async function gotoMenu() {
        history.push("/menu");
    }

    return (
        <div className="symbol-container" >
            <header>
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoMenu()} />
                
                <Link className="back-link" to="/menu">
                    {<FiArrowLeft size={25} color="#E02041" />}
                    Voltar
                </Link>
            </header>

            <div>
                { symbol.map(symbol => (
                    <div key={ symbol.id }>
                        <section className="title-container">
                            <Link className="back-link" to="/reciclagem">
                                { <FiArrowLeft size={ 25 } color="#000" /> }</Link>

                            <Paper className="title-paper">
                                <h1>{ symbol.name }</h1>
                            </Paper>
                        </section>

                        <section className="symbol-info">
                        <Paper className="symbol-img-paper">
                            <img src={ `/assets/recycle/${symbol.image}.png` } alt={ symbol.name }/></Paper>
                            
                            <Paper className="symbol-info-paper">
                                <p> { symbol.description } </p>
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
                                    <Typography className="heading">VANTAGENS</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <Typography className="panel-content">{ symbol.advantage }</Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                    >
                                    <Typography className="heading">DESVANTAGENS</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <Typography className="panel-content">{ symbol.disadvantage }</Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>   

                            <div className="curiosity">
                                <Paper className="curiosity-paper">
                                    <p><strong>Curiosidades:</strong> <br />{ symbol.curiosities }</p> </Paper>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
