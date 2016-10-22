import React from 'react';

export default class Results extends React.Component {
  getResultHTML(){
    return (this.props.data || []).map(r => `<p>${r.ts_headline}</p>`);
  }

  render(){
    return (
      <div
        className="results"
        dangerouslySetInnerHTML={{__html: this.getResultHTML()}}>
      </div>
    )
  }
}

Results.propTypes = {
  data: React.PropTypes.array
};

Results.defaultProps = {
  data: []
};
