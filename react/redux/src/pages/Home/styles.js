import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  /**3 por linha, espaçamento igual */
  grid-template-columns: repeat(3, 1fr);
  /** espaço entre os <li> */
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
  }
  img {
    align-self: center;
    max-width: 250px;
  }
  /** Afetará somente o strong desse elemento interno de um li */
  > strong {
    font-size: 16px;
    line-height: 20px;
    color: #333;
    margin-top: 5px;
  }
  > span {
    font-size: 21px;
    font-weight: bold;
    margin: 5px 0 20px;
  }
  button {
    background: #7159c1;
    color: #fff;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    /** faz com o que o botão se adapte ao tamanho conteúdo dos elementos acima dele */
    margin-top: auto;
    display: flex;
    align-items: center;
    /** ao fazer o hover escureça a cor 7159c1 em 10% */
    &:hover {
      background: ${darken(0.1, '#7159c1')};
    }
    div {
      display: flex;
      align-items: center;
      padding: 12px;
      background: rgba(0, 0, 0, 0.1);
      /** Ícone do carrinho */
      svg {
        margin-right: 5px;
      }
    }
    span {
      flex: 1;
      text-align: center;
      font-weight: bold;
    }
  }
`;
