import React, {Component} from 'react';

export default class Form extends Component {
  render(){

    const showResults = (values) =>
      new Promise(resolve => {
        setTimeout(() => {
          // simulate server latency
          console.log(values);
          resolve();

        }, 900)
      });

    const SyncValidationForm = require('./SyncValidationForm').default;

    return(
      <div className='container'>
        <div className="jumbotron text-center">
          <h1>Form</h1>
        </div>

        <SyncValidationForm onSubmit={showResults} />
      </div>
    )
  }
}