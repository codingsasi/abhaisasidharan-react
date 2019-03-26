import React, { Component } from 'react';
import './App.scss';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Blog from "./components/Blog/Blog";
import BlogPage from "./components/Blog/BlogPage";
import { Route, HashRouter } from "react-router-dom";
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Portfolio from './components/Portfolio/Portfolio';
import PortfolioPage from './components/Portfolio/PortfolioPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Blog Sophisticated",
    };
  }
  render() {
    return (
      <div>
        <Header title={ this.state.title } />
        <div className="row container ml-5 mr-5">
          <HashRouter>
            <div className="content">
              <Route exact path="/blog" component={ Blog }/>
              <Route exact path="/" component={ Blog }/>
              <Route exact path="/blog/:id" component={ BlogPage }/>
              <Route exact path="/resume" component={ Resume }/>
              <Route exact path="/contact" component={ Contact }/>
              <Route exact path="/my-works-question-mark" component={ Portfolio }/>
              <Route exact path="/my-works-question-mark/:id" component={ PortfolioPage }/>
            </div>
          </HashRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
