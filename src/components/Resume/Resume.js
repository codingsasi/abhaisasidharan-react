import React, { Component } from 'react';
import apiUrl from '../../Config';
import './Resume.scss';
import Loading from '../Loading/Loading';

export default class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      markup: '',
    };
  }

  componentDidMount() {
    fetch(apiUrl + '/api/resume')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            markup: {__html: result['#markup']},
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const error = this.state.error;
    const isLoaded = this.state.isLoaded;

    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <Loading></Loading>;
    } else {
      return (
        <div className="row py-5" id="resume">
          <div dangerouslySetInnerHTML={ this.state.markup }></div>
        </div>
      );
    }
  }

}