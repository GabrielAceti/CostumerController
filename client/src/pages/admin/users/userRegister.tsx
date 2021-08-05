import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menuAdmin';
import Copyright from '../../../components/footerAdmin'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';


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
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      
      <MenuAdmin title='USER'/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item sm={12}>
            <Paper className={classes.paper}>
              <h2>User Register</h2>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="userName"
                    name="userName"
                    label="User Name"
                    fullWidth
                    autoComplete="user-name"
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
                  />
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


