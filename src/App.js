import React, {Component} from 'react';

// Rotas e views
import Header from './components/Shared/Header'
import Footer from './components/Shared/Footer'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Form from './components/Form/Form'

import 'bootstrap/dist/css/bootstrap.min.css'

import './static/css/style.css'

// import FormularioEmpresa from './components/FormularioEmpresa/FormularioEmpresa'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Header/>

        <div className="page-container">
          <Route exact path="/" component={Home}/>
          <Route exact path="/form" component={Form}/>
        </div>

        <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
