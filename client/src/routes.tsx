import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom'

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
                <Route path="/" exact component={Home} />
                <Route path="/products/:_id" exact component={ProductsDetails} />

                {/*Routs for admin*/}
                <Route path="/admin" exact component={Dashboard}/>
                <Route path="/admin/products" exact component={Products}/>
                <Route path="/admin/products/register" exact component={ProductsRegister}/>
                <Route path="/admin/products/edit/:_id" exact component={ProductsEdit}/>
                
                <Route path="/admin/users" exact component={Users}/>
                <Route path="/admin/users/register" exact component={UsersRegister}/>
                <Route path="/admin/users/edit/:_id" exact component={UsersEdit}/>
                <Route path="/admin/users/login" exact component={Login} />

            </Switch>
        </BrowserRouter>
    )       
    
}

export default Routes;