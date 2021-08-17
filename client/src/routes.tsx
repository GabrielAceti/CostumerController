import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './services/redirectAuthentication';

//Imports from admin
import Dashboard from './pages/admin/dashboard'

import Costumers from './pages/admin/costumers';
import CostumersEdit from './pages/admin/costumers/costumersEdit';
import CostumersRegister from './pages/admin/costumers/costumersRegister';

import Users from './pages/admin/users/index';
import UsersEdit from './pages/admin/users/userEdit';
import UsersRegister from './pages/admin/users/userRegister';

import Login from './pages/admin/login'


function Routes() {    
    return(
        <BrowserRouter>
            <Switch>               

                {/*Routs for admin*/}
                <PrivateRoute path="/admin" exact component={Dashboard}/>
                <PrivateRoute path="/admin/costumers" exact component={Costumers}/>
                <PrivateRoute path="/admin/costumers/register" exact component={CostumersRegister}/>
                <PrivateRoute path="/admin/costumers/edit/:_id" exact component={CostumersEdit}/>
                
                <PrivateRoute path="/admin/users" exact component={Users}/>
                <PrivateRoute path="/admin/users/register" exact component={UsersRegister}/>
                <PrivateRoute path="/admin/users/edit/:_id" exact component={UsersEdit}/>
                <Route path="/admin/login" exact component={Login} />

            </Switch>
        </BrowserRouter>
    )       
    
}

export default Routes;