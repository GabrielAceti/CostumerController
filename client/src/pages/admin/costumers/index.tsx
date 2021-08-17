import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menuAdmin';
import Copyright from '../../../components/footerAdmin'
import Paper from '@material-ui/core/Paper';
import api from '../../../services/api'
import Costumer from '../../../assets/models/Costumer';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { LinearProgress } from '@material-ui/core';


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
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    table: {
        minWidth: 650,
    },   
}));



export default function CostumersList() {

    const classes = useStyles();
    const [load, setLoad] = useState<boolean>(false);
    const [costumers, setCostumers] = useState<Costumer[]>([]);

    useEffect(() => {
        async function loadCostumers() {
            const response = await api.get('/costumer');
            setCostumers(response.data);
        }
        loadCostumers();
    }, []);

    return (
        <div className={classes.root}>
            <MenuAdmin title='COSTUMERS' />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                <Button variant="contained" color="primary" href={"/admin/costumers/register"}>Register</Button>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Paper className={classes.paper}>
                                <h2>Costumers List</h2>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <TableContainer component={Paper}>
                                            {
                                                load ? (<LinearProgress />) : (
                                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Id</TableCell>
                                                                <TableCell align="center">Name</TableCell>
                                                                <TableCell align="center">Address</TableCell>
                                                                <TableCell align="center">Telephone</TableCell>
                                                                <TableCell align="center">Observation</TableCell>
                                                                <TableCell align="center">Created At</TableCell>
                                                                <TableCell align="center">Options</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {costumers.map((row) => (
                                                                <TableRow >
                                                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                                                    <TableCell align="center">{row.name}</TableCell>
                                                                    <TableCell align="center">{row.address}</TableCell>
                                                                    <TableCell align="center">{row.telephone}</TableCell>
                                                                    <TableCell align="center">{row.observation}</TableCell>
                                                                    <TableCell align="center">{new Date(row.date).toLocaleString('pt-br')}</TableCell>
                                                                    <TableCell align="right">
                                                                        <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                                                                            <Button color="primary" href={`/admin/costumers/edit/${row.id}`}>Edit</Button>
                                                                            <Button color="secondary" onClick={async () => {
                                                                                if (window.confirm("Are you sure you want to delete this user?")) {
                                                                                    const response: Response = await api.delete(`/costumer/${row.id}`);
                                                                                    if (response.status === 200) {
                                                                                        window.location.reload();
                                                                                    }
                                                                                    else if (response.status === 400) {
                                                                                        alert("An error occurred. Please, try again.")
                                                                                    }
                                                                                }

                                                                            }
                                                                            }>Delete</Button>
                                                                        </ButtonGroup>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                )

                                            }

                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div >
    );
}


