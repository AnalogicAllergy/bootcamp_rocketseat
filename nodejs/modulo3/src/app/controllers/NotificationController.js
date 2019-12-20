import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Só prestadores de serviço podem listar notificações' });
    }
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }
  async update(req, res) {
    //buscar  a notificação - estilo newba
    //const notification = await Notification.findById(req.params.id);
    // estilo ninja
    /**
     * (id, {dado a alterar})
     * new: retorna a nova notificação alterada
     */
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) {
      res.status(400).json({
        error: 'Não foi encontrada notificação a partir dos dados informados',
      });
    }
    return res.json(notification);
  }
}
export default new NotificationController();
