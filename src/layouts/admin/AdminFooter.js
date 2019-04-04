import React from 'react';

export default class AdminFooter extends React.Component {
  render() {
    return (
      <div style={{"textAlign": "center"}}>
        <p dangerouslySetInnerHTML={{__html: this.props.message}}></p>
      </div>
    );
  }
}

AdminFooter.defaultProps = {
  message: '&copy; 2018-2020 Created By zsl'
}
