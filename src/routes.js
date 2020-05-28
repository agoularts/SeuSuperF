import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Favorite from './pages/Favorites';
import Logon from './pages/Logon';
import Maps from './pages/Maps';
import Market from './pages/Market';
import Menu from './pages/Menu';
import NewMarket from './pages/NewMarket';
import NewProduct from './pages/NewProduct';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Recycle from './pages/Recycle';
import Register from './pages/Register';
import SearchProd from './pages/SearchProd';
import ListRecycle from './pages/SearchRecycle';

import Erro from './pages/Erro';

import PrivateRoutes from './services/PrivateRoutes';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Logon } />

                <Route path="/cadastro" exact component={ Register } />

                <PrivateRoutes path="/menu" exact component={ Menu } />

                <PrivateRoutes path="/favoritos" exact component={ Favorite } />
                
                <PrivateRoutes path="/mapa" exact component={ Maps } />

                <PrivateRoutes path="/mercados/novo" exact component={ NewMarket } />
                <PrivateRoutes path="/mercados" exact component={ Market } />

                <PrivateRoutes path="/reciclagem/:id" exact component={ Recycle } />
                <PrivateRoutes path="/reciclagem" exact component={ ListRecycle } />
               
                <PrivateRoutes exact path="/produto/:id" component={Product} />
                <PrivateRoutes path="/produto/novo" exact component={ NewProduct } />
                <PrivateRoutes path="/produto" exact component={ SearchProd } />

                <PrivateRoutes path="/profile" exact component={ Profile } />
                
                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
    )
}