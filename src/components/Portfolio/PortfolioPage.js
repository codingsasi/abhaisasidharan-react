import React, { Component } from 'react';
import apiUrl from '../../Config';
import Loading from '../Loading/Loading';
import Sidebar from '../Sidebar/Sidebar';
import Relationship from '../Relationship/Relationship';

export default class PortfolioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      portfolios: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(apiUrl + `/api/node/portfolio/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            portfolios: result
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
      var portfolio = {
        id: this.state.portfolios.data.id,
        nid: this.state.portfolios.data.attributes.drupal_internal__nid,
        title: this.state.portfolios.data.attributes.title,
        body: { __html : this.state.portfolios.data.attributes.body.processed },
        alias: this.state.portfolios.data.attributes.path.alias,
        created: this.state.portfolios.data.attributes.created,
        changed: this.state.portfolios.data.attributes.changed,
        thumbnail: this.state.portfolios.data.relationships.field_thumbnail.links.related.href,
        alt: this.state.portfolios.data.relationships.field_thumbnail.data.meta.alt,
        images: [],
      };
      var images = this.state.portfolios.data.relationships.field_image.data;
      for (var i = 0; i < images.length; i++) {
        portfolio.images.push(images[i]);
      }
      return (
        <div className="row">
          <section className="col-md-8 mt-2" style={ {minHeight: 50 + 'em'} }>
            <div id="portfolio" className="carousel slide mt-5" data-ride="carousel">
              <ol className="carousel-indicators">
              {portfolio.images.map((image, index) => (
                <li key={ image.id } data-target="#portfolio" data-slide-to={ index } className={ (index === 0) ? 'active' : '' }></li>
              ))}
              </ol>
              <div className="carousel-inner">
              {portfolio.images.map((image, index) => (
                <div key={ image.id } className={ (index === 0) ? 'carousel-item active' : 'carousel-item' }>
                  <Relationship field='file' id={ image.id } class='d-block w-100 rounded img-fluid' type='image'/>
                </div>
              ))}
              </div>
              <a className="carousel-control-prev" href="#portfolio" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#portfolio" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <div dangerouslySetInnerHTML={ portfolio.body }></div>
            <a href={ `http://${ portfolio.live_link }` } className="btn btn-primary" target="_blank" rel="noopener noreferrer">Go to Site</a>
          </section>
          <aside className="col-md-4">
            <Sidebar />
          </aside>
        </div>
        );
    }
  }
}