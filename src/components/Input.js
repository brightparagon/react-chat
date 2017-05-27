import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='inputClass'>
        <input value={this.props.message} onChange={this.props.onHandleChange}/>
      </div>
    );
  }
}

export default Input;
