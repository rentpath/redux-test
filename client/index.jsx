import React       from 'react';
import ReactDOM    from 'react-dom';
import { Router }  from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes      from 'routes';
import { Provider } from 'react-redux';
import reducer from 'reducers';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const history = createBrowserHistory();

let initialState = window.__INITIAL_STATE__;

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducer);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router children={routes} history={history} />
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>
  ,
  document.getElementById('react-view')
);
