import React from 'react';
import {connect} from 'react-redux';
import {
  Header, Button, Container
} from '../components';
import {
  getWorldRequest
} from '../actions/world';

class WorldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.handleGetWorld = this.handleGetWorld.bind(this);
  }

  handleGetWorld() {
    const {isClicked} = this.state;

    if(isClicked) {
      this.setState({
        isClicked: false
      });
    } else {
      this.props.getWorldRequest();
      this.setState({
        isClicked: true
      });
    }
  }

  render() {
    const {isClicked} = this.state;

    return (
      <div>
        <Header
          title='React Node Boilerplate'
        />
        <Container
          world={this.props.getWorld.world}
          isClicked={isClicked}
        />
        <Button
          onGetWorld={this.handleGetWorld}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getWorld: state.world.get
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWorldRequest: () => {
      return dispatch(getWorldRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorldContainer);
