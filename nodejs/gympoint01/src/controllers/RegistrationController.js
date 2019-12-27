import Registration from '../models/Registration';
import * as Yup from 'yup';
class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .min(1),
      price: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação dos dados! Reveja os parâmetros.',
      });
    }
    const { title, duration, price } = req.body;
    const registration = await Registration.create({
      title,
      duration,
      price,
    });
    if (registration) {
      return res.status(200).json(registration);
    }
  }
  async index(req, res) {
    const plans = await Registration.findAll();
    if (!plans) {
      return res
        .status(400)
        .json({ error: 'Não foram encontrados planos ativos' });
    }
    return res.status(200).json(plans);
  }
  async update(req, res) {
    const { id } = req.params;
    const { title, duration, price } = req.body;
    console.log(typeof id);

    const plan = await Registration.findByPk(id);
    if (!plan) {
      return res
        .status(400)
        .json({ error: 'Não existe plano com o ID informado' });
    }
    await plan.update({ title, duration, price });
    await plan.save();
    return res.status(200).json(plan);
  }
  async delete(req, res) {
    const { id } = req.params;
    const plan = await Registration.findByPk(id);
    if (!plan) {
      return res
        .status(400)
        .json({ error: 'Não foi encontrado nenhum plano com o ID' });
    }
    await plan.destroy();
    return res.status(200).json({ msg: `Plano com o id ${id} deletado` });
  }
}
export default new RegistrationController();
