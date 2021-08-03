import { Router } from 'express';
const Routes: Router = Router();
import CostumerController from './app/controllers/CostumerController';
const _CostumerController = new CostumerController;

Routes.get('/costumer', _CostumerController.get);
Routes.get('/costumer/:_id', _CostumerController.getOne)
Routes.post('/costumer', _CostumerController.create);
Routes.put('/costumer/:_id', _CostumerController.put);
Routes.delete('/costumer/:_id', _CostumerController.delete);

export default Routes;