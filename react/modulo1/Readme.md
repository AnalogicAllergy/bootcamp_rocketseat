# React

## O que é React?

- Lib para construção de interfaces
- Utilizado para construção de SPAs (Single Page Applications)
- Tudo fica dentro do Javascript - SEM HTML ou CSS
  ```javascript
  import React from "react";
  //css
  import "./button.css";
  import icon from "./button.png";
  function Button() {
    return (
      <button>
        <img src={icon} />
      </button>
    );
  }
  ```

## React x ReactJS x React Native

- React é a base
- ReactJS é para _browser_ (React + DOM)
- React Native é para dispositivos móveis

## Vantagens

- Componentização - organização do código
- Divisão de responsabilidades
  - Back-end: regra de negócio
  - Front-end: interface
- Programação declarativa

## JSX

- Javascript + XML => HTML no Javascript

## Babel

- O Babel converte o código Javascript de uma forma que o _browser_ entenda.

## Webpack

- Criação do _bundle_, que une todo o código da aplicação em um pacote.
- Ensina ao Javascript como importar arquivos CSS, imagens, etc.
- Live reload com Webpack Dev Server.

## Estrutura do projeto

- Na pasta destinada ao projeto, execute `yarn init -y`
- `yarn add _____ -D`
  - `@babel/core`
  - `@babel/preset-env`
    - Alterar as funcionalidades do JS que o browser não entende
  - `@babel/preset-react`
    - Transformar as funcionalidades do React que o _browser_ não entende
  - `webpack`
  - `webpack-cli`
- `yarn add _____`
  - `react`
  - `react-dom`

### Configurando o Babel

    - Crie o arquivo `babel.config.js` com o seguinte conteúdo

    ```javascript
        module.exports = {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ]
        }
    ```

### Configurando o Webpack

    - Crie o arquivo `webpack.config.js`

    ```javascript
        const path = require('path')
        module.exports = {
          entry: path.resolve(__dirname, 'src','index.js'),
          output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
          },
          module: {
            rules: [
              {
                test:/\.js$/,
                exlcude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }
              }
            ]
          }
        }
    ```
    - Para usar o loader, instale: `yarn add babel-loader -D`

## Executando as alterações

- Crie um script no `package.json` com o seguinte conteúdo
  ```json
    "scripts": {
      "build": "webpack --mode development"
    }
  ```

## Alterando a página web a partir de mudanças no código

- Adicione a seguinte biblioteca: `yarn add webpack-dev-server -D`
- Adicione no `webpack.config.js` a seguinte informação
  ```javascript
  devServer: {
    contentBase: path.resolve(__dirname, "public");
  }
  ```
- Mude o script de _build_ para: `webpack-dev-server --mode development`

## Fazendo _load_ de CSS

- Para fazer _load_ de CSS, necessitamos carregar mais um loader: `yarn add style-loader css-loader -D`
- Adicione uma nova regra no `webpack.config.js` com o seguinte conteúdo:
  ```javascript
  const path = require("path");
  module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exlcude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }]
        }
      ]
    }
  };
  ```

## Fazendo o _load_ de imagens

- Adicione a _lib_ `yarn add file-loader -D`
- Configure a nova _rule_ da seguinte forma:
  ```javascript
  {
    // todos os arquivos, do tipo (jpeg ou jpg - e opcional)/i case insensitive
    test: /.*\.(gif | png | jpe?g)$/i,
    use: [
      loader: 'file-loader'
    ]
  }
  ```
- Importando a imagem: `import profile from './assets/profile.png'`
- Mostrando a imagem: `<img src={profile}/>`

# Componentes

## Componentes de classe

- Extendem `Component`
- Devem ter um método `render` com um `return ()`
- Exportam o próprio componente por _default_
  ```javascript
  import React, { Component } from "react";
  class TechList extends Component {
    render() {
      return (
        <ul>
          <li>Node.js</li>
          <li>React</li>
          <li>React Native</li>
        </ul>
      );
    }
  }
  export default TechList;
  ```
- Porquê usar componentes de classe?
  - Não era possível guardar estado fora de componentes de classe.
  ```javascript
  state = {
    abc: 0
  };
  this.setState({ abc: 123 });
  ```
  - Fazendo o Babel enxergar as propriedades de classe, como o estado fora do `constructor`: `yarn add @babel/plugin-proposal-class-properties -D`
  - Adicione o plugin na _config_ do Babel:
  ```javascript
  module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: ["@babel/plugin-proposal-class-properties"]
  };
  ```

## Estado e imutabilidade

```javascript
import React, { Component } from "react";
class TechList extends Component {
  state = {
    newTech: "",
    techs: ["Nodejs", "ReactJS", "React Native"]
  };
  handleInputChange = e => {
    this.setState({
      newTech: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };
  render() {
    return (
      <>
        <ul>
          {this.state.techs.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTech}
            onChange={this.handleInputChange}
          />
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  }
}
export default TechList;
```

## Props

- Forma de transmitir propriedades entre componentes
  ```javascript
  import React from "react";
  function TechItem({ tech }) {
    return (
      <li key={tech}>
        {tech}
        <button onClick={() => this.removeItem(tech)} type="button">
          x
        </button>
      </li>
    );
  }
  //ou
  import React from "react";
  function TechItem(props) {
    return (
      <li key={props.tech}>
        {tech}
        <button onClick={() => this.removeItem(props.tech)} type="button">
          x
        </button>
      </li>
    );
  }
  ```
- Chamando o componente
  ```javascript
  <ul>
    {this.state.techs.map(tech => (
      <TechItem key={tech} tech={tech} />
    ))}
  </ul>
  ```
- Mas e pra passar FUNÇÕES? Por exemplo, o delete do techItem não funciona!!!
  - Defina o comportamento da sua função
    ```javascript
      onDelete={ ()=> this.removeItem(tech)}
    ```
  - Receba essa função no seu componente externo
    ```javascript
    import React from "react";
    function TechItem(props, onDelete) {
      return (
        <li key={props.tech}>
          {tech}
          <button onClick={onDelete} type="button">
            x
          </button>
        </li>
      );
    }
    ```
  ### As funções que manipulam o estado devem ficar onde o estado fica! Não pode haver mudança de estado a partir de um componente que não o detém.

## Default Props e PropTypes

- Default props são como os valores padrão que os atributos devem ter
- Já as PropTypes nos ajudam com validações de tipo/required

```javascript
TechItem.defaultProps = {
  tech: "Não informado pelo cliente"
};
TechItem.propTypes = {
  tech: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};
```

## Ciclo de vida de componentes

- `componentDidMount` - executado assim que o componente aparece em tela
- `componentDidUpdate(prevProps, prevState )` - sempre que houver alteração nas props ou no estado
- `componentWillUnmount` - executado quando o componente deixa de existir.
