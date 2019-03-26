import React, { Component } from 'react';
import BlogList from './BlogList';
import apiUrl from '../../Config';
import './Blog.scss';
import Loading from '../Loading/Loading';
import Sidebar from "../Sidebar/Sidebar";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      blogs: [],
    };
  }
  
  componentDidMount() {
    fetch(apiUrl + '/api/node/blog?sort=-created')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            blogs: result.data
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
    var items = this.state.blogs;
    
    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <Loading></Loading>;
    } else {
      var blogs = [];
      items.forEach(function(blog) {
        var data = {
          id: blog.id,
          nid: blog.attributes.drupal_internal__nid,
          title: blog.attributes.title,
          body:  blog.attributes.body.processed,
          summary: blog.attributes.body.summary,
          alias: blog.attributes.path.alias,
          created: blog.attributes.created,
          changed: blog.attributes.changed,
          thumbnail: blog.relationships.field_thumbnail.links.related.href,
          alt: blog.relationships.field_thumbnail.data.meta.alt,
        };
        blogs.push(data);
      });
      return (
        <div className="row">
          <section className="col-md-8" style={{minHeight: 50 + 'em'}}>
            <BlogList blogs={ blogs }/>
          </section>
          <aside className="col-md-4">
          </aside>
        </div>
      );
    }
  }
}
