import { Router } from 'express';
import AdminController from './controllers/AdminController';
import authMiddleware from './middlewares/auth';
import StudentController from './controllers/StudentController';
import RegistrationController from './controllers/RegistrationController';
import EnrollmentController from './controllers/EnrollmentController';
import CheckinController from './controllers/CheckinController';
import HelpOrderController from './controllers/HelpOrderController';
import AnswerController from './controllers/AnswerController';
const routes = new Router();

routes.post('/admin', AdminController.store);
routes.post('/students', authMiddleware, StudentController.store);
routes.post('/registration', authMiddleware, RegistrationController.store);
routes.get('/registration', authMiddleware, RegistrationController.index);
routes.put('/registration/:id', authMiddleware, RegistrationController.update);
routes.delete(
  '/registration/:id',
  authMiddleware,
  RegistrationController.delete
);
//enrollment
routes.post('/enrollment', authMiddleware, EnrollmentController.store);
routes.get('/enrollment', authMiddleware, EnrollmentController.index);
routes.put('/enrollment/:id', authMiddleware, EnrollmentController.update);
routes.delete('/enrollment/:id', authMiddleware, EnrollmentController.delete);
// check-ins
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

//help-order
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);

//answer
routes.put('/help-orders/:id/answer', authMiddleware, AnswerController.store);

export default routes;
