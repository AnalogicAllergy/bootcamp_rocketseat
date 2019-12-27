import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }
  async handle({ student, plan, price, end_date }) {
    await Mail.sendMail({
      to: `${student.email}`,
      subject: 'Nova matrícula',
      template: 'registration',
      context: {
        nome: plan.title,
        endDate: end_date,
        price: price,
      },
    });
  }
}
export default new RegistrationMail();
