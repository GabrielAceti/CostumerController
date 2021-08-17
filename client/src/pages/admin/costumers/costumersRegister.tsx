import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menuAdmin';
import Copyright from '../../../components/footerAdmin'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import api from '../../../services/api'
import { ButtonGroup } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');  
  const [observation, setObservation] = useState('');  

function validar(){

  if(name === ''){
    alert('Please, enter an username!'); 
    return false;
  }  
  if(address === ''){
    alert('Please, enter an address!');
    return false;
  } 

  return true
}

  async function submit(){
    const data = {
    name: name,
    address: address,
    telephone: telephone,   
    observation: observation    
  }
  
  if(validar()){
    await api.post('/costumer', data).then((value) => {
      if(value.status === 200){
        window.location.href = "/admin/costumers";
      }
      else{
        alert("Something happened. Please, try again.")
      }
    });    
  }
   
  }
  return (
    <div className={classes.root}>

      <MenuAdmin title='COSTUMERS' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item sm={12}>
            <Paper className={classes.paper}>
              <h2>Costumers Register</h2>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    autoComplete="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="telephone"
                    name="telephone"
                    label="Telephone"
                    fullWidth
                    autoComplete="telephone"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                  />
                </Grid>                
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="observation"
                    name="observation"
                    label="Observation"
                    fullWidth
                    autoComplete="observation"
                    value={observation}
                    onChange={e => setObservation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                <Button variant="contained" color="primary" onClick={submit}>
                    Save
                  </Button>
                  <Button variant="contained" color="secondary" href="/admin/costumers">
                    Cancel
                  </Button>
                </ButtonGroup>
                  
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}


