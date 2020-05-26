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
import transgenico from '../../assets/recycle/transgenico.jpeg';
import vidro from '../../assets/recycle/vidro.jpeg';
import aluminio from '../../assets/recycle/aluminio.jpeg';
import pet from '../../assets/recycle/pet.jpeg';
import isopor from '../../assets/recycle/isopor.jpeg';
import hastesFlexiveis from '../../assets/recycle/hastesFlexiveis.jpeg';
import aparelhoBarbear from '../../assets/recycle/aparelhoBarbear.jpeg';
import cartelaRemedio from '../../assets/recycle/cartelaRemedio.jpeg';


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
                    const retornoApi = await api.get(`/recycle/${id}`)
                    setRecycle(retornoApi.data)  
                    
                } catch(err) {
                    alert('Deu ruim')
                }
            }
            fetchData()
        },
        []
    )

    return (
        <div className="recycle-container" >
            <header>
                <img src={ logoImg } alt="Seu Super" />
            </header>

            <div>
                { recycle.map(recy => (
                    <div key={ recy.id }>
                        <section className="title-container">
                            <Link className="back-link" to="/reciclagem/lista">
                                { <FiArrowLeft size={ 25 } color="#000" /> }</Link>

                            <Paper className="title-paper">
                                <h1>{ recy.name }</h1>
                            </Paper>
                        </section>

                        <section className="recycle-info">
                        <Paper className="recycle-img-paper">
                            <img src={  recy.image  } alt={ recy.name }/></Paper>
                            
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

                                <Paper className="curiosity">
                                    <p><strong>Curiosidades:</strong> <br />{ recy.curiosities }</p> </Paper>
                            </div>   
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}