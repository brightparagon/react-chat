import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='buttonClass'>
        <button onClick={this.props.onSendMessage}>Send</button>
      </div>
    );
  }
}

export default Button;
