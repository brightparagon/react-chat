import React from 'react';
import '../css/components.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='button'>
        <button onClick={this.props.onSendMessage}>Send</button>
      </div>
    );
  }
}

export default Button;
