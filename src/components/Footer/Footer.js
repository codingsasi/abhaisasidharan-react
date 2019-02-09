import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
    <footer className="footer mt-3 pb-4 bg-light">
      <hr /> 
      <div className="container pt-3">
        <div className="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
          <div className="contact-details">
            <h4>Contact Me</h4>
            <ul className="contact">
              <li><p><i className="fa fa-map-marker"></i> <strong>Address:</strong> Bangalore, Karnataka, India</p></li>
              <li><p><i className="fa fa-phone"></i> <strong>Phone:</strong> (+91) 7736382208</p></li>
              <li><p><i className="fa fa-envelope"></i> <strong>Email:</strong> <a href="mailto:abhaisasidharan@gmail.com"> abhai@abhaisasidharan.xyz</a></p></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    );
  }
}
