import Sequelize, { Model, DatabaseError } from 'sequelize';
import Student from '../models/Student';
import User from '../models/User';
import databaseConfig from '../config/database';

const models = [Student, User];

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
