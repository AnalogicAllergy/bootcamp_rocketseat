import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../../config/auth';
import * as Yup from 'yup';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validação falhou! Reveja os dados' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    // code not works
    // if (!(await User.checkPassword(password))) {
    //   return res.status(401).json({ error: 'Senha não confere' });
    // }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Senhas não conferem' });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
