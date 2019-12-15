import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Token de autorização não informado' });
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ error, errorMsg: 'Token de autenticação não fornecido' });
  }
};
