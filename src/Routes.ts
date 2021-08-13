import { Router } from 'express';
const Routes: Router = Router();
import CostumerController from './app/controllers/CostumerController';
import UserController from './app/controllers/UserController';
const _CostumerController = new CostumerController;
const _UserController = new UserController;

//Costumer Routes
Routes.get('/costumer', _CostumerController.get);
Routes.get('/costumer/:_id', _CostumerController.getOne)
Routes.post('/costumer', _CostumerController.create);
Routes.put('/costumer/:_id', _CostumerController.put);
Routes.delete('/costumer/:_id', _CostumerController.delete);

//Login Route
Routes.post('/login', _UserController.login);

//User Routes
Routes.get('/user', _UserController.get);
Routes.get('/user/:_id', _UserController.getOne);
Routes.post('/user/checktoken', _UserController.checkToken);
Routes.post('/user', _UserController.create);
Routes.put('/user/:_id', _UserController.put);
Routes.delete('/user/:_id', _UserController.delete);

export default Routes;