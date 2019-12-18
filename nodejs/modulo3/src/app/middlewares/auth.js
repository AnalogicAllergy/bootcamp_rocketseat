import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { promisify } from 'util';
// verifica se user está logado
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: 'Token não foi informado',
    });
  }
  const [, token] = authHeader.split(' ');

  try {
    // sem promisify
    jwt.verify(token, authConfig.secret, function(err, decoded) {
      if (err)
        return res.status(400).json({ error: 'Falha ao buscar id do usuário' });
      req.userId = decoded.id;
      console.log(req.userId);

      return next();
    });

    // const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // req.userId = decoded.id;
    // return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
