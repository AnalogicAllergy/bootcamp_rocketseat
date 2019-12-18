# API Gobarber - 3

### Introdução

- Upload de arquivos isolados através dos dados de multipart/formdata
- Adicionando o Multer
  - `yarn add multer`
- Criar pastas 'tmp/uploads' fora da pasta 'src'
- Criar arquivo `multer.js` na pasta `config`

```javascript
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
export default {
  storage: multer.diskStorage({
    // up 2 dir
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        // callback espera um erro no primeiro argumento, como não tem= null
        return cb(null, res.toString('hex') + extname(file.originalName));
      });
    },
  }),
};
```

- Importando o `multerConfig` em routes

```javascript
import multer from 'multer';
import multerConfig from './config/multer';

// usando
const upload = multer(multerConfig);
// upload.single() só um arquivo com o nome 'file'
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});
```

- Ao criar a requisição no Insomnia, usar o tipo de corpo como multipart.
  - Name: file
  - Type: File
  - **NECESSÁRIO** adicionar o token JWT
- Ao adicionar o arquivo, o multer nos dá uma variável no _req_ chamada `req.file`

### Armazenando os arquivos no Banco de dados

- Criar uma nova migration de nome create-files
  `yarn sequelize migration:create --name:create-files`
- Estrutura da migration:

  ```javascript
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('files', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
    down: queryInterface => {
      return queryInterface.dropTable('files');
    },
  };
  ```

- Rodando a migration no banco
  - `yarn sequelize db:migrate`
- Criando o model de Files

```javascript
import Sequelize, { Model } from 'sequelize';
class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default File;
```

- Aplicando o sequelize no model

```javascript
// './database/index.js'
import File from '../app/models/File';

const models = [User, File];
```

- FileController

```javascript
import File from '../models/File';
class FileController {
  async store() {
    //named parameters
    const { filename: path, originalname: name } = req.file;
    const file = await File.create({
      name,
      path,
    });
    return res.json(file);
  }
}
export default new FileController();
```

### Relacionamento entre User e Files (1 - 1)

- **Questão?** Como adicionar um novo campo numa migration já executada?
  - Opção 1) Desfazer todas as migrations, adicionar um novo campo e reexecutá-las
    - Desvantagem: perda de todos os dados já armazenados.
    - Vantagem: facilidade.
  - Opção 2) Criar uma nova migration com as alterações
    - `yarn sequelize migration:create --name=add-avatar-field-to-users`
    - Estrutura da migration
    ```javascript
    'use strict';
    module.exports = {
      up: (queryInterface, Sequelize) => {
        // nome da tabela a adicionar, coluna a adicionar, {tipo do dado, chave estrangeira (model e id)}
        return queryInterface.addColumn('users', 'avatar_id', {
          type: Sequelize.INTEGER,
          references: { model: 'files', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      },
      down: queryInterface => {
        return queryInterface.removeColumn('users', 'avatar_id');
      },
    };
    ```
    - Execute: `yarn sequelize db:migrate`
    - Associar o User ao File
      - Crie um método chamado associate no User
      ```javascript
        static associate(models){
          this.belongsTo(models.File, {foreignKey: 'avatar_id'})
        }
      ```
    - Durante a iteração dos models no `index.js` de `database` adicione mais um map
      ```
        // *só chama o método se ele existir: existe && call*
        .map(model => model.associate && model.associate(this.connections.models))
      ```

## Listagem de Prestadores

- Crie um controller para os Providers
- Crie o método index para listar os providers, com o seguinte código:

```javascript
import User from './models/User';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({ where: { provider: true } });
    return res.json(providers);
  }
}
export default new ProviderController();
```

- Muitos dados irrelevantes foram retornados, **como evitar**? Usando attributes, posso escolher o que o banco me retorna!!

```javascript
  ...
  async index(req, res){
    const providers = await User.findAll({where: {provider: true}, attributes: ['id', 'name','email','avatar_id']})
    return res.json(providers)
  }
```

- Mas eu queria os dados do file, não somente o avatar, **como faço**? Inclua os dados de file:

```javascript
  async index(req, res){
    const providers = await User.findAll({where: {provider: true}, attributes: ['id', 'name','email','avatar_id'],
    include: [File]
    })
    return res.json(providers)

  }
```

    - Pra ficar mais semântico, no método associate do model Principal (não incluído), adicione o alias `as`:
      ```javascript
          static associate(models){
            this.belongsTo(models.File, {foreignKey: 'avatar_id', as: 'avatar'})
          }
        ```
    - Agora mude o `index` do ProviderController para

        ```javascript
          async index(req, res){
            const providers = await User.findAll({where: {provider: true}, attributes: ['id', 'name','email','avatar_id'],
              include: [{
                model: File,
                as: 'avatar',
                //limitando o retorno dos dados
                attributes: ['name', 'path']
              }],
            })
            return res.json(providers)
          }
        ```

## Retornando a URL para o frontend acessar o arquivo

- Somente a informação do path não é suficiente para renderizarmos o avatar do usuário.
- Como retornar a URL completa?

  - Crie um campo virtual no model de File

  ```javascript
     url: {
      type: Sequelize.VIRTUAL,
      get(){
        //url que estou servindo/rota
        return `http://localhost:3333/files/${this.path}`
      }
    }

  ```

  - Mas só isso não é suficiente!Precisamos servir os arquivos via rota estática
    `app.js`

  ```javascript
    middlewares(){
      ...
      this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp','uploads')))
    }

  ```

## Model e Migration de Agendamento

- Criar a migration de appointments
  `yarn sequelize migration:create --name=create-appointments`;
- Estrutura da migration `create-appointments`
  ```javascript
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('appointments', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        //RELACIONAMENTO
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
        provider_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
        canceled_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
    down: queryInterface => {
      return queryInterface.dropTable('appointments');
    },
  };
  ```
- Após isso, executar: `yarn sequelize db:migrate`
- Criar o model de Appointment

  ```javascript
  import Sequelize, { Model } from 'sequelize';
  class Appointment extends Model {
    static init(sequelize) {
      super.init(
        {
          date: Sequelize.DATE,
          canceled_at: Sequelize.DATE,
        },
        {
          sequelize,
        }
      );
      return this;
    }
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(models.User, {
        foreignKey: 'provider_id',
        as: 'provider',
      });
    }
  }
  export default Appointment;
  ```

- Importar o model no `index.js` de `./database`
  ```javascript
  // './database/index.js'
  import Appointment from '../app/models/Appointment';
  const models = [User, File, Appointment];
  ```

## Agendando o serviço

- Crie um controller para lidar com o agendamento

  ```
    import Appointment from './models/Appointment';
    import User from './models/User';
    import * as Yup from 'yup'

    class AppointmentController {
      async store(req, res){
        const schema = Yup.object().shape({
          date: Yup.date().required(),
          provider_id: Yup.number().required(),
        })
        if(!(await schema.isValid(req.body))){
          return res.status(400).json({error: 'Dados enviados estão incorretos. Reveja os dados'});

        }
        const {provider_id, date} = req.body;
        //checar se o provider_id pertence a um provider
        const isProvider = await User.findOne({where: {id: provider_id, provider: true}});
        if(!isProvider){
          return res.status(401).json({error: 'O id informado não pertence a um prestador de serviços'})
        }
        const appointment = await Appointment.create({
          user_id: req.userId, //não está funcionando
          provider_id,
          date
        })
        return res.json(appointment);
      }
    }
    export default new AppointmentController();
  ```

- Crie a rota para responder por esse controller
  ```javascript
  routes.post('/appointments', AppointmentController.store());
  ```
- Requisição do Insomnia
  ```json
  {
    "provider_id": 3,
    "date": "2019-07-01T18:00:00-03:00"
  }
  ```
