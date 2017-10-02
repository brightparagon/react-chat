import React from 'react';
import { connect } from 'react-redux';
import {
  Input, Button, Container
} from '../components';
import {
  sendMessageRequest
} from '../actions/message';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: '',
      message: ''
    };

    // this.handleSendMessage = this.handleSendMessage.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e, {value}) {
  //   this.setState({
  //     message: value
  //   });
  // }

  // handleSendMessage() {
  //   const {message, socket} = this.state;
  //   console.log(message);
  //   socket.emit('chat message', message);
  //   this.setState({message: ''});
  // }
  //
  // componentDidMount() {
  //   const socket = io();
  //   this.setState({socket: socket});
  // }

  render() {
    return (
      <div>
        <h1>Hello Lobby Component</h1>

      </div>
    );
  }
  // <Container
  //   message={this.props.message}
  // />
  // <Input
  //   message={this.state.message}
  //   onHandleChange={this.handleChange}
  // />
  // <Button
  //   onSendMessage={this.handleSendMessage}
  // />
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessageRequest: (message) => {
      return dispatch(sendMessageRequest(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
