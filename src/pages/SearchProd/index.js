import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import api from '../../services/api';
import { validaToken } from '../../services/auth';
import './styles.css';
import logoImg from '../../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.primary.light, 0.25),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function SearchProd(props) {
    const [ product, setProduct ] = useState([]);
    const classes = useStyles();

    const history = useHistory();

    useEffect(
        () => {
            async function fetch() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }

                try {
                    const retornoApi = await api.get('listProduct', { headers: { auth: localStorage.userToken }})
                    setProduct(retornoApi.data)

                } catch(err) {
                    alert('Deu ruim')
                }
            }
            fetch()
        },
        []
    )

    async function handleOnClick(id) {
        history.push(`/produto/${ id }`);
    }

    return (
        <div className="search-container">
            <header>
                <img src={ logoImg } alt="Seu Super"/>
            </header>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon /> 
                </div>
                
            <InputBase
                placeholder="Buscar..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }} />
            </div>

            <div>
                <Link className="back-link" to="/menu">
                    { <FiArrowLeft size={ 25 } color="#E02041" /> }
                        Voltar
                </Link>
            </div>
            
            <div>
            {product.map(prod => (
                <div key={ prod.id }>
                
                    <button className="button" onClick={() => handleOnClick(prod.id) }>
                        { prod.name }
                        <p>{ prod.category }</p>
                    </button>
                </div>
            ))}
            </div>
        </div>
    ) 
}