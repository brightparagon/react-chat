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
      content: ''
    };

    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  handleSendMessage() {
    const { content } = this.state;
    const data = {
      email: this.props.auth.user.email,
      name: this.props.auth.user.name,
      content
    };
    this.props.socket.emit('message', data);
    this.setState({
      content: ''
    });
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('user_email')) {
      const isSignedIn = true;
      const signedUser = {
        email: window.sessionStorage.getItem('user_email'),
        name: window.sessionStorage.getItem('user_name'),
      };
      this.props.signIn(signedUser, isSignedIn);
    } else {
      return this.props.history.push('/signin');
    }

    this.props.socket.on('welcome', (userName) => {
      console.log('Lobby welcome');
      this.props.addMessage('welcome', userName, `${userName}님이 입장하셨습니다ㅎㅎ`);
    });
    this.props.socket.on('broadcast', (data) => {
      console.log('Lobby broadcast');
      this.props.addMessage(data.email, data.name, data.content);
    });
    this.props.socket.on('signout', (userName) => {
      console.log('Lobby sign out');
      this.props.addMessage('signout', userName, `${userName}님이 퇴장하셨습니다ㅜㅜ`);
    });
  }

  render() {
    return (
      <div className='flex-page' key='Lobby'>
        <div className='flex-page-item'>
          <h1>Hello Lobby Component</h1>
        </div>
        <div className='flex-page-item message-scroll'>
          {this.props.messages.map((message, index) =>
            <div key={index}>{message.name}: {message.content}</div>
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
    addMessage: (email, name, content) => {
      return dispatch(addMessage(email, name, content));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
