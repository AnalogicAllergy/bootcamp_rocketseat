import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import * as Yup from 'yup';
class HelpOrderController {
  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;
    const studentExists = await Student.findByPk(id);
    if (!studentExists) {
      return res.status(400).json({
        error: 'Não foi encontrado nenhum estudante com o id passado.',
      });
    }
    const helpOrder = await HelpOrder.create({
      student_id: id,
      question,
    });
    if (!helpOrder) {
      return res
        .status(400)
        .json({ error: 'Erro ao criar pedido de ajuda. Tente novamente' });
    }
    return res.status(200).json(helpOrder);
  }
  async index(req, res) {
    const { id } = req.params;
    const helpOrders = await HelpOrder.findAll({ where: { student_id: id } });
    if (!helpOrders) {
      return res.status(400).json({
        error: 'Não foram encontrados pedidos de ajuda para o usuário',
      });
    }
    return res.status(200).json(helpOrders);
  }
}
export default new HelpOrderController();
