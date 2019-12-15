import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        height: Sequelize.DOUBLE,
        weight: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
  }
}
export default Student;
