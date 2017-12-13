import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Header extends Component {
  render() {

    return (
      <header>
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top ">
          <div className="container">
            <NavLink className="navbar-brand logo-link py-0" exact to="/" aria-label='Logo'>
              Form Validation
            </NavLink>
            <button className="navbar-toggler " type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/" activeClassName="active" title=''>Home</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/form" activeClassName="active" title='form'>Form</NavLink>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </header>


    )
  }
}