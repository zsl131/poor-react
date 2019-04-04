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
  message: '&copy; '+buildMessage()+' Created By zsl'
}

function buildMessage() {
  const myDate=new Date();
  const year = myDate.getFullYear();
  const res = (year-1)+"-"+(year+2);
  return res;
}
