import React from 'react';
import '../css/components.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='input'>
        <input value={this.props.message} onChange={this.props.onChange}/>
      </div>
    );
  }
}

export default Input;
