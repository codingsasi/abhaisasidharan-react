import React, { Component } from 'react';
import apiUrl from '../../Config';
import './Blog.scss';
import Loading from '../Loading/Loading';
import Thumbnail from '../Thumbnail/Thumbnail';

export default class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      blogs: [],
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(apiUrl + `/api/node/blog/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            blogs: result
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
      var blog = {
        id: this.state.blogs.data.id,
        nid: this.state.blogs.data.attributes.drupal_internal__nid,
        title: this.state.blogs.data.attributes.title,
        body: { __html : this.state.blogs.data.attributes.body.processed },
        summary: this.state.blogs.data.attributes.body.summary,
        alias: this.state.blogs.data.attributes.path.alias,
        created: this.state.blogs.data.attributes.created,
        changed: this.state.blogs.data.attributes.changed,
        thumbnail: this.state.blogs.data.relationships.field_thumbnail.links.related.href,
        alt: this.state.blogs.data.relationships.field_thumbnail.data.meta.alt,
      };  
      return (
        <section className="col-md-8" style={ {minHeight: 50 + 'em'} }>
          <div className="blog--timeline">
            <article key={ blog.id }>
              <div className="blog-full--image row pt-5 pb-3">
                <Thumbnail thumbnail={ blog.thumbnail } width='100%' height='60%' class="rounded img-fluid" alt={ blog.alt }/>  
              </div>
              <div className="blog-full--title row pb-3">
                <h4><a href="/blog/{{ blog.id }}">{ blog.title }</a></h4>
              </div>
              <div className="blog-full--created row pb-3">
                <div>
                  <span><i className="fa fa-calendar"></i> { blog.created } </span>
                  <br />
                </div>
              </div>
              <div className="blog-full--body row py-3">
                <div style={ {width: 100 + '%'} } dangerouslySetInnerHTML={ blog.body }></div>
              </div>
            </article>
          </div>
        </section>
        );
    }
  }
}