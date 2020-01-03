# Arquitetura Flux

![](/src/assets/screens/flux.png)

**A store**

"store" é o nome dado pelo Facebook para o conjunto de estados da sua aplicação. Vamos pensar na store como um grande centro de informações, que possui disponibilidade para receber e entregar exatamente o que o seu componente requisita (seja uma função, ou uma informação propriamente dita). Tecnicamente, a store é um **objeto JavaScript** que possui **todos os estados** dos seus componentes.

**Os reducers**

Cada dado da store deve ter o seu próprio reducer, por exemplo: o dado "user" teria o seu reducer, chamado "userReducer". Um reducer é **encarregado de lidar com todas as ações**, como algum componente pedindo para alterar algum dado da store.

**As actions**

Actions são responsáveis por requisitar algo para um reducer. Elas devem ser sempre funções puras, o que, dizendo de uma forma leiga, quer dizer que elas devem **APENAS** enviar os dados ao reducer, nada além disso.

```javascript
    {
      type: "ADD_TO_CART",
      product: {...}
    }
```

- Toda ACTION deve ter um TYPE!

- Reducers intermedeiam a alteração de estado.
- **PRINCÍPIOS**
  - O estado do Redux é o único ponto de verdade
  - O estado do Redux **NÃO** pode ser mutado sem Action
  - As **ACTIONS** e os **REDUCERS** são funções PURAS, sendo assim não lidam com side-effects assíncronos
    - **NÃO** FAZEM CHAMADAS A APIs
    - **NÃO** PERSISTEM EM BANCO DE DADOS
    - Mas o que é uma FUNÇÃO PURA :question:
      - Função que independente da quantidade de chamadas, com os mesmos parâmetros, **SEMPRE** serão obtidos os mesmos resultados
  - Qualquer lógica assíncrona para regras de negócio deve ficar no REDUCER e nunca na ACTION
    - REDUCER :white_check_mark:
    - ACTION :x:
  * Nem toda aplicação necessita de Redux, inicie sem ele e se sentir necessidade, adicione!

## O que é Redux?

- Biblioteca que implementa a arquitetura Flux

## Quando usar?

- Meu estado tem mais de um dono
- Estado é manipulado por vários componentes
- Ações do usuário causam efeitos colaterais nos dados

## Exemplos de uso

- Carrinhos de compras :shopping_cart:
- Player de música :musical_note:

  ![](src/assets/screens/redux.png)

# Iniciando o Rocketshoes

## Rotas

- `yarn add react-router-dom` - Lidar com as rotas da aplicação
- Configurando o arquivo `routes.js`

```javascript
import React from 'react';
import { Switch, Route } from 'react-router-dom';
/*Switch permite somente a escolha de UMA ROTA*/
import Home from './pages/Home';
import Cart from './pages/Cart';
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
}
```

- Importando no `App.js`

```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
```

## Estilos Globais

- Instale o `styled-components`
- Crie uma pasta `styles` na raiz da pasta `src` com um arquivo `global.js`
- Conteúdo do arquivo `global.js`

```javascript
import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    }
    body {
      background: #191919;
      -webkit-font-smoothing: antialiased !important;
    }
    body, input, button {
      font: 14px sans-serif;
    }
    #root {
      max-width: 1020px;
      margin: 0 auto;
      padding: 0 20px 50px;
    }
    button {
      cursor: pointer;
    }
`;
```

- Adicionando fonte a partir de `@import url`

```javascript
import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;


      }
      body {
        background: #191919;
        -webkit-font-smoothing: antialiased !important;

      }
      body, input, button {
        font: 14px, Roboto  sans-serif;

      }
      #root {
        max-width: 1020px;
        margin: 0 auto;
        padding: 0 20px 50px;
      }
      button {
        cursor: pointer;
      }
  `;
```

- Adicionando SVG a partir de arquivo

```javascript
import { createGlobalStyle } from 'styled-components';
import background from '../../assets/back.svg';

export default createGlobalStyle`
  ...
    body {
      background: #191919 url(${background}) no-repeat center top;
      -webkit-font-smoothing: antialiased !important;

    }
  ...
`;
```

- Invocando os estilos globais no arquivo `App.js`

```javascript
...
import GlobalStyle from './styles/global';

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <GlobalStyle />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
```

## Header

- Crie um novo componente chamado Header e importe antes das Rotas do `App.js`

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import logo from '../../assets/logo.svg';
import { Container, Cart } from './styles';

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>3 itens</span>
        </div>
        <MdShoppingBasket size={34} color="#fff" />
      </Cart>
    </Container>
  );
}
```

- Customização

```javascript
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
`;
export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #fff;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
```

## Estilização da Home

- Crie um `styles.js`

```javascript
import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
    }
  }
`;
export const ProductTable = styled.table`
  width: 100%;
  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  img {
    height: 100px;
  }
  strong {
    color: #333;
    display: block;
  }
  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }
  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;
export const Total = styled.div`
  display: flex;
  align-items: baseline;
  span {
    color: #999;
    font-weight: bold;
  }
  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;
```

- Estruture o componente da seguinte forma

```javascript
import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="https://images.lojanike.com.br/1024x1024/produto/25892_1569666_20190801134152.png"
                alt=""
              />
            </td>
            <td>
              <strong>Tenis sghow</strong>
              <span>R$ 129,90</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={2} />
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$ 258,80 </strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>Total</span>
          <strong>R$ 1920</strong>
        </Total>
      </footer>
    </Container>
  );
}
```

## JSON Server

- Permite executar uma API mockada a partir de dados constantes em um JSON previamente preparado.
- Instalação
  - Instale a dependência `json-server`
  - Crie um arquivo chamado `abc.json`
  - Rode a API através do comando `json-server --watch abc.json`
    - Temos o problema da porta 3000 já ser usada pelo ReactJS, então como procedemos :question:
  - Rode a API através do comando `json-server abc.json -p 3333 -w`
    - `-p` é relativo a porta e `-w` é para o server sempre observar o JSON por mudanças
  - Sua API estará disponível no `localhost:3000`
- Consumindo a API
  - Crie uma pasta `service` e defina o arquivo `api` e consuma o arquivo

## Internacionalização

- Serve para configurar objetos com formatações específicas relativas à países.
- Arquivo `format.js` na pasta `util`

```javascript
/*exportarei a função format como formatPrice*/
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
```

## Redux

- Instalando:
  - `yarn add redux react-redux`
- Configurando

  - Crie uma pasta `store` na `src` com um arquivo `index.js` dentro:
    ```javascript
    import { createStore } from 'redux';
    const store = createStore();
    export default store;
    ```
  - Importe no arquivo `App.js` da seguinte forma
    `import {Provider} from 'react-redux'` - o Provider é responsável por disponibilizar uma `store` para todo o App.
  - Wrap os itens do return do `App.js` com o componente Provider

  ```javascript
  import React from 'react';
  import { BrowserRouter } from 'react-router-dom';
  import { Provider } from 'react-redux';
  import GlobalStyle from './styles/global';
  import Routes from './routes';
  import Header from './components/Header';

  // redux
  import store from './store/index';

  function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <GlobalStyle />
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }

  export default App;
  ```

  - App vai crashar! Porquê? Porque não podemos criar `stores` sem `reducers`

  ```javascript
  import { createStore } from 'redux';=
  function cart() {
    return [];
  }
  // cart pode ser um reducer
  const store = createStore(cart);
  export default store;

  ```

  - Componentizando os reducers

    - Crie uma pasta `modules` em `store` e dentro dela uma pasta que reflita o seu `reducer`: `cart` no caso atual e dentro dessa pasta, crie um arquivo `reducer.js`
    - O conteúdo desse arquivo deve ser primariamente o seguinte:

    ```javascript
    export default function cart() {
      return [];
    }
    ```

  - Pra um só reducer, isso funciona OK! E para vários?

    - Para tratar vários reducers, devemos utilizar um consolidador, que aqui chamaremos de `rootReducer`. Esse arquivo deve ficar dentro da pasta `modules` dentro de `store`.

    ```javascript
    import { combineReducers } from 'redux';
    import cart from './cart/reducer';

    export default combineReducers({
      cart,
      // outros reducers
    });
    ```

    - Feita essa consolidação, no arquivo `index.js` da pasta `store`, importe o `rootReducer` e passe para a função `createStore`

    ```javascript
    import { createStore } from 'redux';
    import rootReducer from './modules/rootReducer';
    const store = createStore(rootReducer);
    export default store;
    ```

  - Conectando componentes e estados
    - Importe o função `connect` do `react-redux` no componente alvo
    - No fim do arquivo, faça com que o componente use `export default connect()(NomeDoComponente)` -> assegure-se de remover o `export default` da instanciação do componente
    - O connect pode receber parâmetros => uma função.
  - Despachando as actions - Defina uma função que enviará as mudanças de estado para a `store` (no `onClick`, `onSubmit`).
    `<button onClick={this.handleAddProduct}>`
    e posteriormente, na função, dispare a action relativa aquela função.

        ```javascript
        handleAddProduct = product => {
          /**
           * qualquer componente que importa connect, tem uma nova prop chamada dispatch.
           * E o que fazemos com o dispatch? Disparamos ACTIONS
           *  */
          const { dispatch } = this.props;
          dispatch({
            type: 'ADD_TO_CART',
            product,
          });
        };
        ```

        - Tenha em mente que esse `dispatch` direcionará para o reducer.
        - TODA vez que um `dispatch` é disparado, TODOS os `reducers` escutam! Mas então, como saberemos que `reducer` tratará a nossa requisição?? **SIMPLES**!!!! Pela ACTION! :wink:
        - Beleza então! Mas como temos acesso à Action? No construtor da função temos acesso a dois parâmetros padrão: o estado anterior da aplicação (`state`) e a action (`action`)

        ```javascript
        export default function cart(state, action) {
          // a action contém o que foi enviado no dispatch do componente
          /*
            {
              type: 'ADD_TO_CART',
              product,
            }
          */
          return [];
        }
        ```

        - Estrutura padrão de um `reducer`
        ```javascript
        export default function cart(state = [], action) {
          switch (action.type) {
          case 'ADD_TO_CART':
            return [...state, action.product];
          default:
            return state;
          }
        }
        ```

    - Acessando dados do state em outros componentes

      - Faça o esquema de exportação de componentes com o `connect` - neste exemplos faremos no `Header`
      - Dentro do `connect` utilizaremos uma função para obter os dados do state

      ```javascript
      // state => parâmetro o qual a função connect tem acesso
      export default connect(state => ({
        // cart: parâmetro a ser desestrurado no construtor do Componente atual do arquivo - linha 607
        cart: state.cart,
        //state.cart => nome do reducer que quero acessar
      }))(Header);
      ```

      ```javascript
      function Header({ cart }) {
        console.log(cart);
        return (
          <Container>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <Cart to="/cart">
              <div>
                <strong>Meu carrinho</strong>
                <span>{cart.length}</span>
              </div>
              <MdShoppingBasket size={34} color="#fff" />
            </Cart>
          </Container>
        );
      }
      ```

    - Toda vez que os dados do state mudarem, o componente será renderizado.

## Redux e Reactotron

- Instalando as dependências
  `yarn add reactotron-react-js reactotron-redux`
- Configurando o Reactotron: crie uma pasta `config` com um arquivo `ReactotronConfig.js` com o seguinte conteúdo

```javascript
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .connect();

  tron.clear();

  console.tron = tron;
}
```

- Configurando na `index.js` da `store`

```javascript
import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';
const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;
const store = createStore(rootReducer, enhancer);
export default store;
```

- Agora é só importar a configuração do Reactortron do `App.js`
  `import './config/ReactotronConfig';`
- Regra no `eslintrc.js` para remover os erros dos `console.tron`
  `'no-console': ['error', { allow: ['tron'] }],`

**Reactotron**

![Timelinme](src/assets/screens/tron1.png)
![State Subscriptions](src/assets/screens/tron2.png)
![Snapshot do State](src/assets/screens/tron3.png)
