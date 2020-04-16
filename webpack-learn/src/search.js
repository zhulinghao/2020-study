import React from 'react';
import ReactDom from 'react-dom';

export default class Search extends React.Component {

  render() {
    return <div>Search</div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById("root")
)