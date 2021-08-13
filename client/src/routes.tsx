import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './services/redirectAuthentication';

//Imports from admin
import Dashboard from './pages/admin/dashboard'

import Products from './pages/admin/products';
import ProductsEdit from './pages/admin/products/productsEdit';
import ProductsRegister from './pages/admin/products/productsRegister';

import Users from './pages/admin/users/index';
import UsersEdit from './pages/admin/users/userEdit';
import UsersRegister from './pages/admin/users/userRegister';

import Login from './pages/admin/login'

//Imports from client
import Home from './pages/client/home/index'; 
import ProductsDetails from './pages/client/products/productsDetails';

function Routes() {    
    return(
        <BrowserRouter>
            <Switch>
                {/*Routes for client*/}              
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/products/:_id" exact component={ProductsDetails} />

                {/*Routs for admin*/}
                <PrivateRoute path="/admin" exact component={Dashboard}/>
                <PrivateRoute path="/admin/products" exact component={Products}/>
                <PrivateRoute path="/admin/products/register" exact component={ProductsRegister}/>
                <PrivateRoute path="/admin/products/edit/:_id" exact component={ProductsEdit}/>
                
                <PrivateRoute path="/admin/users" exact component={Users}/>
                <PrivateRoute path="/admin/users/register" exact component={UsersRegister}/>
                <PrivateRoute path="/admin/users/edit/:_id" exact component={UsersEdit}/>
                <Route path="/admin/login" exact component={Login} />

            </Switch>
        </BrowserRouter>
    )       
    
}

export default Routes;