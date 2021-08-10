import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
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
import User from '../../../assets/models/User'
import { async } from 'q';



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

    const [userName, setUserName] = useState('');
    const [completedName, setCompletedName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [passWord, setPassWord] = useState('');
    const [observation, setObservation] = useState('');
    const { _id } = useParams<any>();

    useEffect(() => {
        async function getUser() {
            const response = await api.get(`/user/${_id}`);
            console.log(response.data[0])
            setUserName(response.data[0].userName)
            setCompletedName(response.data[0].completedName);
            setTelephone(response.data[0].telephone);
            setPassWord(response.data[0].passWord);
            setObservation(response.data[0].observation);
        }

        getUser();
    }, [])

    function validar() {

        if (userName === '') {
            alert('Please, enter a username!');
            return false;
        }
        if (completedName === '') {
            alert('Please, enter a completed name!');
            return false;
        }
        if (passWord === '') {
            alert('Please, enter a password!');
            return false;
        }

        return true
    }

    async function update() {
        const data = {
            userName: userName,
            completedName: completedName,
            telephone: telephone,
            passWord: passWord,
            observation: observation
        }

        if (validar()) {
            const response = await api.put(`/user/${_id}`, data);
            if(response.status == 200)
            {
                alert("User updated successfully!");
                window.location.href = '/admin/users'
            }
            else if (response.status == 400)
            {
                alert("An error occurred. Please, try again.")
            }
           
            
        }

    }
    return (
        <div className={classes.root}>

            <MenuAdmin title='USER' />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item sm={12}>
                        <Paper className={classes.paper}>
                            <h2>User Edit</h2>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="userName"
                                        name="userName"
                                        label="User Name"
                                        fullWidth
                                        autoComplete="user-name"
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="completedName"
                                        name="completedName"
                                        label="Completed Name"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={completedName}
                                        onChange={e => setCompletedName(e.target.value)}
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="password"
                                        required
                                        id="password"
                                        name="password"
                                        label="Password"
                                        fullWidth
                                        autoComplete="password"
                                        value={passWord}
                                        onChange={e => setPassWord(e.target.value)}
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


