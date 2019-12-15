import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../config/auth';
import User from '../models/User';
import * as Yup from 'yup';

class AdminController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        error: 'Erro na validação dos dados submetidos- por favor, reenviar',
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Email não encontrado na base de dados' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Senhas não conferem' });
    }
    const { id, name } = user;
    return res.status(200).json({
      user: {
        id,
        name,
      },
      token: jwt.sign({ id }, authConfig.secret, { expiresIn: '7d' }),
    });
  }
}
export default new AdminController();
