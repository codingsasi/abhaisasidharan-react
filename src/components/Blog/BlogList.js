import React, { Component } from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';
import { NavLink } from "react-router-dom";

export default class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      blogs: []
    };
  }

  render() {
    return (
      <div className="blog--timeline">
      {this.props.blogs.map(blog => (
        <article key={ blog.id }>
          <div className="blog-thumbnail--image row pt-5 pb-3 mt-2">
            <Thumbnail thumbnail={ blog.thumbnail } width='100%' height='60%' class="rounded img-fluid" alt={ blog.alt }/>
          </div>
          <div className="blog-thumbnail--title row">
          <h4><NavLink to={ `/blog/${blog.id}` }>{ blog.title }</NavLink></h4>
            <p>{ blog.summary }</p>
          </div>
          <div className="blog-thumbnail--created row">
          <div>
            <span><i className="fa fa-calendar"></i> { blog.created } </span><br />
          </div>
          </div>
          <hr />
        </article>
      ))}
      </div>
    );
  }
}