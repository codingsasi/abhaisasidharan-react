import React, { Component } from 'react';
import PortfolioList from './PortfolioList';
import apiUrl from '../../Config';
import './Portfolio.scss';
import Loading from '../Loading/Loading';
import Sidebar from "../Sidebar/Sidebar";

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      portfolios: [],
    };
  }
  
  componentDidMount() {
    fetch(apiUrl + '/api/node/portfolio?sort=-created')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            portfolios: result.data
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
    var items = this.state.portfolios;
    
    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <Loading></Loading>;
    } else {
      var portfolios = [];
      items.forEach(function(portfolio) {
        var data = {
          id: portfolio.id,
          nid: portfolio.attributes.drupal_internal__nid,
          title: portfolio.attributes.title,
          live_link: portfolio.attributes.field_portfolio_link,
          alias: portfolio.attributes.path.alias,
          body: { __html : portfolio.attributes.body.processed },
          created: portfolio.attributes.created,
          thumbnail: portfolio.relationships.field_thumbnail.links.related.href,
          alt: portfolio.relationships.field_thumbnail.data.meta.alt,
        };
        portfolios.push(data);
      });
      return (
        <div className="row">
          <section className="col-md-8" style={{minHeight: 50 + 'em'}}>
            <PortfolioList portfolios={ portfolios }/>
          </section>
          <aside className="col-md-4">
            <Sidebar />
          </aside>
        </div>
      );
    }
  }
}