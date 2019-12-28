/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';
import api from '../../service/api';
import { Loading, Owner, RowBack, IssueList } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repo: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: { state: 'open', per_page: 5 },
      }),
    ]);
    this.setState({
      loading: false,
      repo: repo.data,
      issues: issues.data,
    });
  }

  render() {
    const { repo, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <div>
        <Container>
          <Owner>
            <RowBack>
              <FaBackward color="#7159c1" size={24} />

              <Link to="/">Voltar aos repositórios </Link>
            </RowBack>

            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <h1>{repo.name}</h1>
            <p>{repo.description}</p>
          </Owner>
          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}> {label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
        </Container>
      </div>
    );
  }
}
