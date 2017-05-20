import React from 'react';
import {connect} from 'react-redux';
import {
  Header, Button, Container
} from '../components';
import {
  getWorldRequest
} from '../actions/promotion';

class WorldContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Button />
        <Container />
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
