import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';
// import {
//   MainContainer
// } from './containers';
import './index.css';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={Component}>
          </Route>
        </Router>
      </Provider>
    </AppContainer>,
    rootElement
  );
};

render(App);

// Hot Module Replacement API
if(module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
