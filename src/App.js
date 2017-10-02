import React from 'react';
// import {
//
// } from './Containers';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   socket: ''
    // };
  }

  // componentDidMount() {
  //   let {socket} = this.state;
  //   socket = io();
  // }

  render() {
    return (
      <div>
        <h1>Hello App Component</h1>
        {this.props.children}
      </div>
    );
  }
}

export default App;
