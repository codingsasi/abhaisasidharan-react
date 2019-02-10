import React, { Component } from 'react';
import apiUrl from '../../Config';
import Image from './Image';
import Loading from '../Loading/Loading';

export default class Relationship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      relationships: [],
    };
  }

  componentDidMount() {
    var id = this.props.id;
    fetch(apiUrl + `/api/file/file/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            relationships: result.data
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
      if (this.props.type === 'image') {
        var src = this.state.relationships.attributes.uri.url;
        return <Image src={ apiUrl + src } class={ this.props.class }/>
      }
    }
  }
}