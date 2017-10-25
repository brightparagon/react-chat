import React from 'react';
import { connect } from 'react-redux';
import {
  Input, Button
} from '../components';
import {
  addMessage
} from '../actions/message';
import '../css/components.css';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSendMessage() {
    const { message } = this.state;
    const data = {
      email: this.props.auth.user.email,
      name: this.props.auth.user.name,
      message: message
    };
    this.props.socket.emit('message', data);
    this.setState({
      message: ''
    });
  }

  componentDidMount() {
    this.props.socket.on('welcome', (userName) => {
      this.props.addMessage('welcome', userName, `${userName}님이 입장하셨습니다ㅎㅎ`);
    });
    this.props.socket.on('broadcast', (data) => {
      this.props.addMessage(data.email, data.name, data.message);
    });
    this.props.socket.on('signout', (userName) => {
      this.props.addMessage('signout', userName, `${userName}님이 퇴장하셨습니다ㅜㅜ`);
    });
  }

  render() {
    return (
      <div className='flex-page'>
        <div className='flex-page-item'>
          <h1>Hello Lobby Component</h1>
        </div>
        <div className='flex-page-item'>
          {this.props.messages.map((message, index) =>
            <div key={message.name + index}>{message.name}: {message.message}</div>
          )}
        </div>
        <div className='flex-page-item'>
          <Input
            message={this.state.message}
            onChange={this.handleChange}
          />
          <Button
            onSendMessage={this.handleSendMessage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    messages: state.message.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (email, name, message) => {
      return dispatch(addMessage(email, name, message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
