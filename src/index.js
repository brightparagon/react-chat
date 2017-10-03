import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';
import * as containers from './containers';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');
// react hot loading시 router 관련 코드를 plain obejct로 빼야 되는 경우가 있음
// const routes = (
//   <Route path='/' component={App}>
//     <IndexRoute component={containers.Lobby} />
//   </Route>
// );
const requireAuth = (nextState, replace) => {
  const path = nextState.location.pathname;
  // url path가 /admin/signin가 아니면서 로그인 되어있지 않으면 /signin로 이동
  if (path !== '/signin' && !window.sessionStorage.getItem('user_email')) {
    alert('로그인 페이지로 이동합니다.');
    replace({
      pathname: '/signin'
    });
  }
};

const render = (Component) => {
  ReactDOM.render (
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={Component} onEnter={requireAuth} >
            <IndexRoute component={containers.Lobby} onEnter={requireAuth} />
            <Route path='signin' component={containers.SignInPage} />
          </Route>
        </Router>
      </Provider>
    </AppContainer>,
    rootElement
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    // webpack v2 부터는 아래처럼 하지 않아도 module update가 자동으로 됨
    // const NextApp = require('./App').default;
    // 최상단 컴포넌트(App)에서 import/require chain을 통해 webpack이 어디를 update할지 알게 된다
    render(App);
  });
}
