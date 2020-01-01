# Arquitetura Flux

![](assets/screens/flux.png)

- Actions são disparadas pelo USUÁRIO

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

  ![](assets/screens/redux.png)

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
