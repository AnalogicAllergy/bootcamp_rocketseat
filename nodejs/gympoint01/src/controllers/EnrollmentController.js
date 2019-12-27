import { addMonths, format, parseISO, parse } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Registration from '../models/Registration';
import Queue from '../lib/Queue';
import * as Yup from 'yup';
import Student from '../models/Student';
import RegistrationMail from '../app/jobs/RegistrationMail';
class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro na validação. Reveja os dados enviados' });
    }
    const { student_id, plan_id, start_date } = req.body;
    const plan = await Registration.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({
        error: 'Não foi possível encontrar planos com os dados enviados',
      });
    }
    // end date
    const duration = plan.duration;
    const end_date = addMonths(parseISO(start_date), duration);

    //price
    const monthlyPrice = plan.price;
    const price = monthlyPrice * duration;

    const checkisEnrolled = await Enrollment.findOne({
      where: { student_id: student_id },
    });
    if (checkisEnrolled) {
      return res
        .status(400)
        .json({ error: 'Cada aluno deve ter somente UMA matrícula' });
    }
    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
    if (!enrollment) {
      return res
        .status(400)
        .json({ error: 'Não foi possível criar a matrícula nesse momento' });
    }
    const student = await Student.findByPk(student_id);
    if (student) {
      console.log('ok');
    }
    Queue.add(RegistrationMail.key, { student, plan, price, end_date });
    return res.status(200).json(enrollment);
  }
  async index(req, res) {
    const enrollments = await Enrollment.findAll();
    if (!enrollments) {
      return res
        .status(400)
        .json({ error: 'Não foi possível encontrar matrículas cadastradas.' });
    }
    return res.status(200).json(enrollments);
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro na validação. Reveja os dados enviados' });
    }

    const { id } = req.params;
    const { plan_id, start_date } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    //atualizando o valor do plano
    let price;
    if (plan_id) {
      if (plan_id !== enrollment.plan_id) {
        const plan = await Registration.findByPk(plan_id);
        price = plan.price * plan.duration;
      }
    }
    // atualizando a data de fim
    let end_date;
    if (start_date) {
      const plan = await Registration.findByPk(enrollment.plan_id);
      if (plan) {
        end_date = addMonths(parseISO(start_date), plan.duration);
      }
    }
    if (!enrollment) {
      return res.status(400).json({
        error: 'Não foi possível encontrar uma matrícula com o ID informado',
      });
    }
    await enrollment.update({ plan_id, start_date, price, end_date });
    await enrollment.save();
    return res.status(200).json(enrollment);
  }
  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(400).json({
        error: `Não foi possível encontrar uma matrícula de ${id} informado`,
      });
    }
    await enrollment.destroy();
    return res
      .status(200)
      .json({ msg: `A matrícula ${id} foi deletada com sucesso!` });
  }
}
export default new EnrollmentController();
