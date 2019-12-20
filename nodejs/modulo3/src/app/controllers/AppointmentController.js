import Appointment from '../models/Appointment';
import User from '../models/User';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import File from '../models/File';
import * as Yup from 'yup';
import Notification from '../schemas/Notification';
import pt from 'date-fns/locale/pt';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados enviados são incorretos.' });
    }
    const { provider_id, date } = req.body;
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      return res.status(401).json({
        error: 'O id informado não pertence a um prestador de serviços',
      });
    }
    const hourStart = startOfHour(parseISO(date));
    // vendo se data pedida < hoje
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas passadas não são permitidas' });
    }
    const checkAvailability = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    });
    if (checkAvailability) {
      return res.status(400).json({ error: 'Data não disponível' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });
    //Notificar o user
    const user = await User.findByPk(req.userId);
    //dia 19 de Dezembro às 12:00h
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}  `,
      user: provider_id,
    });

    return res.json(appointment);
  }
  async index(req, res) {
    // paginação
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20, // limita a quantidade de registros do retorno por vez
      offset: (page - 1) * 20, // me diz o quanto devo pular em cada execução
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
          ],
        },
      ],
    });
    return res.json(appointments);
  }
  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
    // verificando se o user que enviou a deleção é dono do appointment
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: 'Você não está autorizado a deletar esse agendamento. ',
      });
    }
    // data -2h
    /**
     * Caso de teste:
     * data do appointment: 13h
     * dateWithSub = 13-2 => 11h
     * now: 11:25
     * result: DON'T allow deletion
     */
    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      res.status(401).json({
        error:
          'Você só pode deletar agendamentos com pelo menos 2h de antecedência',
      });
    }
    appointment.canceled_at = new Date();
    appointment.save();
    /// será movido para Cancellation mail job
    // await Mail.sendMail({
    //   to: `${appointment.provider.name} <${appointment.provider.email}>`,
    //   subject: 'Agendamento cancelado',
    //   template: 'cancellation',
    //   context: {
    //     provider: appointment.provider.name,
    //     user: appointment.user.name,
    //     date: format(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
    //       locale: pt,
    //     }),
    //   },
    // });
    Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  }
}
export default new AppointmentController();
