import Express from 'express';
import Routes from './Routes';
const app = Express();

app.use(Express.json());
app.use('/', Routes);

export default app;