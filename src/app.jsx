'use strict';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

    axios.get('/api/search?s=news')
    .then(response => {
      this.setState({results: response.data});
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let results =
      (this.state.results || []).map(r => `<p>${r.ts_headline}</p>`);
    return (
      <div
        className="results"
        dangerouslySetInnerHTML={{__html: results}}>
      </div>
    )
  }
}
