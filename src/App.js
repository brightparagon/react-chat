import React from 'react';
import {
  MainContainer
} from './Containers';

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
        <MainContainer
        >
        </MainContainer>
      </div>
    );
  }
}

export default App;
