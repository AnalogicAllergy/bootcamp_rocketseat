import User from '../models/User';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    //validação de dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validação falhou! Reveja os dados' });
    }
    // verificando repetição de email
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Usuário já existe no banco de dados' });
    }
    // diminuindo os itens na res
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : false
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validação falhou! Reveja os dados' });
    }
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Usuário já existe no banco de dados' });
      }
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (oldPassword && !isMatch) {
      return res.status(401).json({ error: 'Senhas não conferem' });
    }
    const { id, name, provider } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
