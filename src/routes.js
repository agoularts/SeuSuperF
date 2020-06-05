import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admin from './pages/Admin';
import ListProduct from './pages/AdminListProduct';
import ListMarket from './pages/AdminListMarket';
import ListRecycle from './pages/AdminListRecycle';
import DeleteMarket from './pages/AdminDelMarket';
import DeleteProduct from './pages/AdminDelProduct';
import DeleteRecycle from './pages/AdminDelRecycle';
import NewMarket from './pages/AdminNewMarket';
import NewProduct from './pages/AdminNewProduct';
import NewRecycle from './pages/AdminNewRecycle';
import UpdateMarket from './pages/AdminUpMarket';
import UpdateProduct from './pages/AdminUpProduct';
import UpdateRecycle from './pages/AdminUpRecycle';

import Favorite from './pages/Favorites';
import Logon from './pages/Logon';
import Market from './pages/Market';
import Menu from './pages/Menu';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Recycle from './pages/Recycle';
import Register from './pages/Register';
import SearchProd from './pages/SearchProd';

import SearchRecycle from './pages/SearchRecycle';

import Erro from './pages/Erro';

import PrivateRoutes from './services/PrivateRoutes';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* login */}
                <Route path="/" exact component={Logon} />

                {/* cadastro de usuário */}
                <Route path="/cadastro" exact component={Register} />

                {/* menu principal */}
                <PrivateRoutes path="/menu" exact component={Menu} />

                {/* lista os itens favoritados */}
                <PrivateRoutes path="/favoritos" exact component={Favorite} />

                {/* lista os mercados para o usuário */}
                <PrivateRoutes path="/mercados" exact component={Market} />
                {/* opções admin: Criar, deletar, Listar/Editar */}
                <PrivateRoutes path="/mercados/novo" exact component={NewMarket} />
                <PrivateRoutes path="/mercados/listar" exact component={ListMarket} />
                <PrivateRoutes path="/mercados/deletar" exact component={DeleteMarket} />
                <PrivateRoutes exact path="/mercados/editar/:cnpj" exact component={UpdateMarket} />

                {/* lista as opções de reciclagem para o usuário e mostra as infos do item selecionado*/}
                <PrivateRoutes path="/reciclagem" exact component={SearchRecycle} />
                {/* opções admin: Criar, deletar, Listar/Editar */}
                <PrivateRoutes path="/reciclagem/novo" exact component={NewRecycle} />
                <PrivateRoutes path="/reciclagem/deletar" exact component={DeleteRecycle} />
                <PrivateRoutes path="/reciclagem/listar" exact component={ListRecycle} />
                <PrivateRoutes exact path="/reciclagem/editar/:id" exact component={UpdateRecycle} />
                <PrivateRoutes exact path="/reciclagem/:id" exact component={Recycle} />

                {/* lista as opções de produto para o usuário e mostra as infos do item selecionado*/}
                <PrivateRoutes path="/produto" exact component={SearchProd} />
                {/* opções produtos: Criar, deletar, Listar/Editar */}
                <PrivateRoutes path="/produto/novo" exact component={NewProduct} />
                <PrivateRoutes path="/produto/deletar" exact component={DeleteProduct} />
                <PrivateRoutes path="/produto/listar" exact component={ListProduct} />
                <PrivateRoutes exact path="/produto/editar/:id" exact component={UpdateProduct} />
                <PrivateRoutes exact path="/produto/:id" component={Product} />

                {/* mostra as infos do usuário */}
                <PrivateRoutes path="/profile" exact component={Profile} />

                {/* FUNCIONALIDADES DO ADMINISTRADOR */}
                {/* menu principal */}
                <PrivateRoutes path="/admin" exact component={Admin} />

                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
    )
}