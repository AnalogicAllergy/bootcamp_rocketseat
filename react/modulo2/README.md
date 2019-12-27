# Módulo 02 React

## Criando um novo projeto

`yarn create-react-app nome_do_projeto`

## Rodando o projeto

`yarn start` - do arquivo `package.json`

## Deletando arquivos que não serão utilizados

- Delete os seguintes arquivos: `App.css`, `App.test.js`, `index.css`, `logo.svg` e `serviceWorker.js`
- No arquivo `index.js` remova a parte do código referente a `serviceWorker.register()` e os imports

## Fazendo as configurações necessárias para a execução

_Editor Config_ - _Right click_ `Generate .editorconfig` no VSCode
`javascript root = true [*] indent_style = space indent_size = 2 charset = utf-8 trim_trailing_whitespace = true insert_final_newline = true end_of_line = lf`

_Eslint_

- `yarn add eslint -D` - `yarn eslint --init`
- _Check synthax, find problems and enforce code style_
- _Javascript Modules (import/export) _
- _React_
- _Browser_
- _Use a popular styleguide_
- _Airbnb_
- Delete o arquivo _package.lock.json_
- Execute `yarn`
- Configurando o Prettier com o Eslint
  `yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D`
- Configurando o arquivo `eslintrc.js`
  `javascript module.exports = { env: { browser: true, es6: true }, extends: ['airbnb', 'prettier', 'prettier/react'], globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' }, parser: 'babel-eslint', parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 2018, sourceType: 'module' }, plugins: ['react', 'prettier'], rules: { 'prettier/prettier': 'error', 'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }], 'import/prefer-default-export': 'off' } };` - Configurando o arquivo `.prettierrc`
  `json { "singleQuote": true, "trailingComma": "es5" }`

## Configurando Rotas na aplicação

- Rotas permitem a navegação do usuário
- Biblioteca de rotas: `yarn add react-router-dom`
- Crie um arquivo `routes.js` para lidar com as rotas da aplicação

```javascript
//BrowserRouter: navegação entre páginas através de `/page`
//Switch: garante que seja chamada apenas uma rota por vez - escolha
//Route: representa uma página da aplicação
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
// Cada rota é um componente
import Main from './pages/Main';
import Repository from './pages/Repository';

/**
    Se eu deixar a primeira rota sem o exact, todas as demais rotas renderizarão o component Main
    Porquê? Porque para acessar /repository tem o / da rota main e assim por diante.  
  * */
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
```

- No `App.js` utilize as rotas da seguinte forma:

```javascript
import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
class App extends Component {
  render() {
    return <Routes />;
  }
}
export default App;
```

## Styled Components

- Adicione a lib através do comando: `yarn add styled-components`
- Todo componente deve ser estar localizado em uma pasta com dois arquivos `index.js` e `styles.js`. No `index.js` estará a estrutura dos componentes, já no `styles.js` estarão as customizações CSS do componente.
- Arquivo `styles.js`
  ```javascript
  import styled from 'styled-components';
  // exporto um h1 chamado title com as seguintes características
  export const Title = styled.h1`
    font-size: 24px;
    color: #7159c1;
    font-family: 'Helvetica';
  `;
  ```
- No `index.js` do componente, importamos da seguinte forma
  ```javascript
  import React from 'react';
  import { Title } from './styles';
  function Main() {
    return <Title>Main</Title>;
  }
  export default Main;
  ```
- Encadeamento de estilos

  - Encadeamento de estilos serve para editar tags internas a componentes que já estilizamos.
  - Ex:
    ```javascript
    import React from 'react';
    import { Title } from './styles';
    function Main() {
      return (
        <Title>
          Main
          <small>E esse texto? Vai levar customização do Title!!!</small>
        </Title>
      );
    }
    export default Main;
    ```
  - Estruturamos a estilização da seguinte forma:

    ```javascript
    import styled from 'styled-components';
    export const Title = styled.h1`
      font-size: 24px;
      color: #7159c1;
      font-family: 'Helvetica' small {
        font-size: 16px;
        color: #333;
      }
    `;
    ```

    _Dentro desse componente Title eu tenho um small que será customizado da seguinte forma..._

- Como podemos aplicar estilos condicionais nos componentes (erro, warning)? Abaixo, temos de renderizar um certo estilo pois a propriedade `error` do componente está como `true`
  ```javascript
  import React from 'react';
  import { Title } from './styles';
  function Main() {
    return (
      <Title error={true}>
        Main
        <small>E esse texto? Vai levar customização do Title!!!</small>
      </Title>
    );
  }
  export default Main;
  ```
- Dou R\$ 10 se você citar as `props`! Mas `props` dentro do CSS, pode isso Arnaldo? SIM! Veja como fica:

```javascript
import styled from 'styled-components';
export const Title = styled.h1`
  font-size: 24px;
  // pego as props e verifico se a propriedade error c'est vrai, oui?!!
  color: ${props => (props.error ? 'red' : '#7159c1')};
  font-family: 'Helvetica' small {
    font-size: 16px;
    color: #333;
  }
`;
```

## Estilos Globais

- Estilos que se aplicam a TODA a aplicação! HUM, É MESMO???
- Pra começar, crie uma pasta chamada `styles` dentro da `src` do projeto
- Crie um arquivo chamado `global.js` na pasta `styles` com o seguinte conteúdo:
  ```javascript
  import { createGlobalStyle } from 'styled-components';
  export default createGlobalStyle`
      //todos os elementos do HTML
      *{
        margin: 0;
        padding: 0;
        outline: 0;
        //evita quebra de layout
        box-sizing: border-box;
      }
      // div com id rot
      html, body, #root{
        min-height: 100%;
      }
      body {
        background: #7159c1;
        //melhorar as fontes
        -webkit-font-smoothing: antialiased !important;
      }
      body, input, button {
        color: #222;
        font-size: 14px;
        font-family: 'Arial, Helvetica, sans-serif'
      }
      button {
        cursor: pointer
      }
    `;
  ```
- Importando o GlobalStyle -
  `javascript import React, { Component } from 'react'; import './App.css'; import GlobalStyle from './styles/global' import Routes from './routes' class App extends Component { render() { return ( <> <Routes/> <GlobalStyle/> </> ); } } export default App;`

## Estilizando o componente Main

- Adicionando ícones: `yarn add react-icons`
- Quando devo criar componentes estilizados? Quando houver mais de dois itens!

```javascript
import React from 'react';
import { Container, Form, SubmitButton } from './styles';
import { FaGithubAlt, FaPlus } from 'react-icons';
function Main() {
  return (
    <Container>
      <h1>Repositórios</h1>
      <FaGithubAlt />
      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar repositório" />
      </Form>
      <SubmitButton disabled>
        <FaPlus color="#fff" size={14}></FaPlus>
      </SubmitButton>
    </Container>
  );
}
export default Main;
```

- Estilização no `styles.js`

```javascript
import styled from 'styled-components';
export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  //distanciar a imagem do h1
  svg {
    margin-right: 10px;
  }
`;
export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;
export const SubmitButton = styled.button`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
```

- Passando atributos para o styled-component através do `attrs`

```javascript
export const SubmitButton = styled.button.attrs({ type: 'submit' })`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
```
