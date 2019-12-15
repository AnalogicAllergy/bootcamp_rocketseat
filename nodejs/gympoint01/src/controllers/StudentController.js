import jwt from 'jsonwebtoken';
import Student from '../models/Student';
import * as Yup from 'yup';
class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .min(8)
        .required()
        .integer(),
      height: Yup.number().required(),
      weight: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(401)
        .json({ error: 'Erro na validação dos dados. Envie novamente' });
    }

    const { name, email, height, weight, age, userId } = req.body;
    // console.log(req);

    // if (!userId) {
    //   return res
    //     .status(401)
    //     .json({ error: 'Autenticação do admin falhou, tente novamente' });
    // }
    const emailExists = await Student.findOne({ where: { email } });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: 'Email já cadastrado em nossa base de dados' });
    }
    const student = await Student.create({
      name,
      email,
      height,
      weight,
      age,
    });
    if (student) {
      console.log('exists');

      const { id, name } = student;
      return res.status(200).json({
        id,
        name,
      });
    }
  }
}
export default new StudentController();
