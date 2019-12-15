import { Router } from 'express';
import AdminController from './controllers/AdminController';
import authMiddleware from './middlewares/auth';
import StudentController from './controllers/StudentController';
const routes = new Router();

routes.post('/admin', AdminController.store);
routes.post('/students', authMiddleware, StudentController.store);

export default routes;
