import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menuAdmin';
import Copyright from '../../../components/footerAdmin'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import api from '../../../services/api'
import { useParams } from 'react-router-dom'

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
    const { _id } = useParams<any>();

    useEffect(() => {
        async function getUser() {
            const response = await api.get(`/costumer/${_id}`);          
            setName(response.data[0].name)
            setAddress(response.data[0].address);
            setTelephone(response.data[0].telephone);           
            setObservation(response.data[0].observation);
        }

        getUser();
    }, [])

    function validar() {

        if (name === '') {
            alert('Please, enter a name!');
            return false;
        }
        if (address === '') {
            alert('Please, enter an address!');
            return false;
        }      

        return true
    }

    async function update() {
        const data = {
            name: name,
            address: address,
            telephone: telephone,           
            observation: observation
        }

        if (validar()) {
            const response = await api.put(`/costumer/${_id}`, data);
            if(response.status === 200)
            {
                alert("User updated successfully!");
                window.location.href = '/admin/costumers'
            }
            else if (response.status === 400)
            {
                alert("An error occurred. Please, try again.")
            }           
        }

    }
    return (
        <div className={classes.root}>

            <MenuAdmin title='COSTUMER' />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item sm={12}>
                        <Paper className={classes.paper}>
                            <h2>Costumer Edit</h2>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        label="name"
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
                                    <Button variant="contained" color="primary" onClick={update}>
                                        Save
                                    </Button>
                                    <Button></Button>
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


