import React       from 'react';
import { Router }  from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes      from 'routes';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import { fromJS } from 'immutable';
import { compose, createStore, combineReducers } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const history = createBrowserHistory();

let initialState = window.__INITIAL_STATE__;

Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });

const reducer = combineReducers(reducers);
//const store = createStore(reducer, initialState);
const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducer);

React.render(
  <div>
    <Provider store={store}>
      {() =>
        <Router children={routes} history={history} />
        }
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>
  ,
  document.getElementById('react-view')
);
