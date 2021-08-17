import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import api from '../services/api';
import { getToken, logout } from '../services/auth';


export const mainListItems = (
  <div>
    <ListItem button component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/admin/users">
      <ListItemIcon>
        <SupervisedUserCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button component="a" href="/admin/costumers">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Costumers" />
    </ListItem>    
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Options</ListSubheader>
    <ListItem button onClick={leave}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Leave" />
    </ListItem>    
  </div>
);

async function leave(){
  if(window.confirm("Do you want to leave?")){
    const res = await api.post('/user/clearToken', {token: getToken()});    
    if(res.status === 200){
      logout();
      window.location.href = '/admin/login'
    }
    else{
      alert("Ops... Something went wrong. Please, try again!");
    }

  }
}