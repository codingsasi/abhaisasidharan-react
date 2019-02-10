import React, { Component } from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';
import { NavLink } from "react-router-dom";

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      portfolios: []
    };
  }

  render() {
    var portfolio_title = '';
    return (
      <div className="portfolio--page row pt-5">
        {this.props.portfolios.map(portfolio => (
          portfolio_title = (portfolio.title.length > 15) ? portfolio.title.slice(0, 15) + '...' : portfolio.title,
          <div className="item col-md-4 grid-group-item" key={ portfolio.id }>          
            <article>
              <div className="thumbnail">
                <Thumbnail thumbnail={ portfolio.thumbnail } width='100%' height='40%' class="rounded img-fluid" alt={ portfolio.alt }/>
                <div className="caption">
                  <h5 className="group inner list-group-item-heading mt-2 mb-3"><NavLink to={ `/my-works-question-mark/${ portfolio.id }` }>{ portfolio_title }</NavLink></h5>
                    <div className="group inner list-group-item-text" dangerouslySetInnerHTML={ portfolio.body }></div>
                </div>
              </div>
            </article>
          </div>          
        ))}
        </div>
    );
  }
}