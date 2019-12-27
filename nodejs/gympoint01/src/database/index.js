import Sequelize, { Model, DatabaseError } from 'sequelize';
import Student from '../models/Student';
import User from '../models/User';
import Registration from '../models/Registration';
import Enrollment from '../models/Enrollment';
import Checkin from '../models/Checkin';
import HelpOrder from '../models/HelpOrder';
import databaseConfig from '../config/database';

const models = [Student, User, Registration, Enrollment, Checkin, HelpOrder];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}
export default new Database();
