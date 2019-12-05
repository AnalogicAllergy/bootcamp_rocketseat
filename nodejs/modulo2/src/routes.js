import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).json({ msg: 'Hello ' });
});

export default routes;
