import React, { Component } from 'react';
import './Contact.scss';

export default class Contact extends Component {
  render() {
    var scale = this.props.scale;
    var mx = '';
    if (!scale) {
      mx = 'mx-auto mt-5';
    }
    return (
      <div id="contact-card" className={ `col-6 ${ mx } mb-5` } style={ {transform: `scale(${scale})`} }>
        <div className="contact-container">
          <div className="card">
            <div className="front">
              <div className="logo"><span></span></div>
            </div>
            <div className="back">
              <h1>Abhai Sasidharan<span>Drupal Engineer <i>&</i> Consultant</span></h1>
              <ul>
                <li className="phone"><i className="fas fa-phone"></i>+91 7736382208</li>
                <li className="email"><i className="fas fa-envelope"></i>abhai@abhaisasidharan.xyz</li>
                <li className="website"><i className="fas fa-globe"></i>www.abhaisasidharan.xyz</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}