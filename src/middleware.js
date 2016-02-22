import defaultProps from './defaultProps';
import renderAppToString from './renderAppToString';
import { createMiddleware } from 'provide-page';

const min = process.env.MIN_EXT || '';
const { providedState } = defaultProps;
const defaultThemeFiles = providedState.themeFiles;
const themes = require(`./themes/index${min}`).default;
const middleware = createMiddleware({
  defaultProps: {
    ...defaultProps,
    providedState: {
      ...providedState,
      themes
    }
  },
  getProvidedState: mergedStates => ({
    ...mergedStates,
    jsFiles: [
      (mergedStates.themeFiles || defaultThemeFiles).jsFile,
      ...(mergedStates.jsFiles || [])
    ],
    cssFiles: [
      (mergedStates.themeFiles || defaultThemeFiles).cssFile,
      ...(mergedStates.cssFiles || [])
    ]
  }),
  getClientState: {
    themes: false
  },
  renderToString: renderAppToString
});

export default middleware;
