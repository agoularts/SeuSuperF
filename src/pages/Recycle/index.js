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


export default function Recycle(props) {
    const [ recycle, setRecycle ] = useState([]);
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
                    const retornoApi = await api.get(`/recycle/${id}`, {
                        headers: { 
                            auth: localStorage.userToken 
                        }})
                    setRecycle(retornoApi.data)  
                    
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
        <div className="recycle-container" >
            <header>
                <img src={ logoImg } alt="Seu Super" onClick={() => gotoMenu()} />
            </header>

            <div>
                { recycle.map(recy => (
                    <div key={ recy.id }>
                        <section className="title-container">
                            <Link className="back-link" to="/reciclagem">
                                { <FiArrowLeft size={ 25 } color="#000" /> }</Link>

                            <Paper className="title-paper">
                                <h1>{ recy.name }</h1>
                            </Paper>
                        </section>

                        <section className="recycle-info">
                        <Paper className="recycle-img-paper">
                            <img src={ `/assets/recycle/${recy.image}.png` } alt={ recy.name }/></Paper>
                            
                            <Paper className="recycle-info-paper">
                                <p> { recy.description } </p>
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
                                    <Typography className="panel-content">{ recy.advantage }</Typography>
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
                                    <Typography className="panel-content">{ recy.disadvantage }</Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>   

                                <div className="curiosity">
                                    <Paper className="curiosity-paper">
                                        <p><strong>Curiosidades:</strong> <br />{ recy.curiosities }</p> </Paper>
                                </div>
                        </div>   
                    </div>
                ))}
            </div>
        </div>
    )
}
