import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
class AnswerController {
  async store(req, res) {
    const { id } = req.params;
    const helpOrder = await HelpOrder.findByPk(id);
    if (!helpOrder) {
      return res.status(400).json({
        error: 'Não foi encontrado nenhum pedido de ajuda com esses parâmetros',
      });
    }
    const { answer } = req.body;
    const answerDate = Date.now();
    await helpOrder.update({ answer, answerAt: answerDate });
    await helpOrder.save();
    return res.status(200).json(helpOrder);
  }
}
export default new AnswerController();
