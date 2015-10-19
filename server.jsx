import express                   from 'express';
import React                     from 'react';
import ReactDOMServer            from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from 'routes';
import { compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';

import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const app = express();

app.use((req, res) => {
  const location = createLocation(req.url);
  const reducer = combineReducers(reducers);
  //const store = createStore(reducer);

  const finalCreateStore = compose(
    devTools()
  )(createStore);

  const store = finalCreateStore(reducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }
    if (!renderProps) return res.status(404).end('Not found.');

    const InitialComponent = (
      <div>
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
    const initialState = store.getState();
    const componentHTML = ReactDOMServer.renderToString(InitialComponent);
    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
  </html>
`
    res.end(HTML);
  });
});
export default app;
