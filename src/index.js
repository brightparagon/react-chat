import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
import App from './App';

const rootElement = document.getElementById('root');
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

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

/* <Router history={browserHistory}>
          <Route path='/' component={Component}>
            <IndexRoute component={containers.Lobby}/>
            <Route path='signin' component={containers.SignInPage} />
          </Route>
        </Router> */

const render = (Component) => {
  ReactDOM.render (
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component/>
        </BrowserRouter>
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
