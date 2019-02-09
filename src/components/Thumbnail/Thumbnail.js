import React, { Component } from 'react';
import apiUrl from '../../Config';
import Loading from '../Loading/Loading';

export default class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      thumbnail: '',
      width: '',
      height: '',
      class: '',
      alt: this.props.alt,
    };
  }

  componentDidMount() {
    fetch(this.props.thumbnail)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            thumbnail: apiUrl + result.data.attributes.uri.url,
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
        <img src={ this.state.thumbnail } style={ {width: this.props.width, height: this.props.height} } className={ this.props.class } alt={ this.state.alt }/>
      );
    }
  }
}