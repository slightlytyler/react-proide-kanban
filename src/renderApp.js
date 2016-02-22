import './polyfill';
import React from 'react';
import { render } from 'react-dom';
import { unshiftEnhancer, reloadProviders } from 'react-redux-provide';
import replicate from 'redux-replicate';
import localforageReplicator from 'redux-replicate-localforage';
import providers from './providers/index';
import App from './components/App';
import defaultProps from './defaultProps';

const { theme } = providers;

// NOTE: you'll probably want to use a different replicator here, if any
unshiftEnhancer({ theme }, replicate(
  'theme', localforageReplicator({ themeName: true })
));

function renderApp(props, element = document.getElementById('root')) {
  return render(<App { ...props } />, element);
}

renderApp({ ...defaultProps, providedState: window.clientState });

export default renderApp;

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept([
      './defaultProps',
      './providers/index'
      // NOTE: you'll need to manually add each provider here
    ], () => {
      reloadProviders(require('./defaultProps').default);
    });
  }
}
