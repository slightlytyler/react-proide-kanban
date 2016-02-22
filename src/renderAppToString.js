import './polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { unshiftEnhancer } from 'react-redux-provide';
import replicate from 'redux-replicate';
import fsReplicator from 'redux-replicate-fs';
import providers from './providers/index';
import App from './components/App';
import defaultProps from './defaultProps';

const { theme } = providers;

// NOTE: you'll probably want to use a different replicator here, if any...
// but if you do decide to use this replicator, you'll need to create a `data`
// directory for it to work
unshiftEnhancer({ theme }, replicate(
  'data/theme', fsReplicator({ themeName: true })
));

function renderAppToString(props = defaultProps) {
  return renderToString(<App { ...props } />);
}

export default renderAppToString;
