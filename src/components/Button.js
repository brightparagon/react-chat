import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='buttonClass'>
        <button onClick={this.props.onGetWorld}>Click me!</button>
      </div>
    );
  }
}

export default Button;
