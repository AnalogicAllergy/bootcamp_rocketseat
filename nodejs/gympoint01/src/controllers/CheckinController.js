import Student from '../models/Student';
import Checkin from '../models/Checkin';
import { Op } from 'sequelize';
import { subDays } from 'date-fns';
class CheckinController {
  async store(req, res) {
    const { id } = req.params;
    const studentExists = await Student.findByPk(id);
    if (!studentExists) {
      return res.status(400).json({
        error: 'Não foi possível encontrar um aluno com o parâmetro passado.',
      });
    }
    // 5 times in a week
    const today = Date.now();
    const checkinsMade = await Checkin.count({
      where: {
        student_id: id,
        createdAt: {
          [Op.gte]: subDays(today, 7),
        },
      },
    });

    if (checkinsMade + 1 > 5) {
      return res
        .status(400)
        .json({ error: 'Você só tem direto a 5 check-ins por semana!' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });
    if (!checkin) {
      return res.status(400).json({
        error: 'Não foi possível realizar o check-in. Tente novamente',
      });
    }
    return res.status(200).json({ checkin, checkinsMade });
  }
  async index(req, res) {
    const { id } = req.params;
    const checkIns = await Checkin.findAll({
      where: {
        student_id: id,
      },
    });
    if (!checkIns) {
      return res.status(400).json({
        error: 'Não foram encontrados checkins para o usuário informado',
      });
    }
    return res.status(200).json(checkIns);
  }
}
export default new CheckinController();
