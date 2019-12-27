import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';
import api from '../../service/api';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
    };
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { newRepo, repositories } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };
  render() {
    const { newRepo, loading } = this.state;
    return (
      <Container>
        <h1>Repositórios</h1>
        <FaGithubAlt />
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={newRepo}
            onChange={this.handleInputChange}
            placeholder="Adicionar repositório"
          />
        </Form>
        <SubmitButton enabled={loading}>
          {loading ? <FaSpinner color="#fff" /> : <FaPlus />}
        </SubmitButton>
      </Container>
    );
  }
}
