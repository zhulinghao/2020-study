import React from 'react';
import ReactDom from 'react-dom';
import './search.less'
import avatar from './images/avatar.jpg';

export default class Search extends React.Component {
  render() {
    return (
      <>
        <div className="search--text">Search king of  asdasd  aaa </div>
        <img src={avatar}></img>
      </>
    )
  }
}

ReactDom.render(
  <Search />,
  document.getElementById("root")
)