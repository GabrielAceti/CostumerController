import Express from 'express';
import Routes from './Routes';
import cors from 'cors';
const app = Express();

app.use(Express.json());
app.use(cors({ origin: true }));
app.use('/', Routes);

export default app;