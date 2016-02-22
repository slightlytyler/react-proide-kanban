import providers from './providers/index';
import themesFiles from './themes/files';

const min = process.env.MIN_EXT || '';
const themeName = Object.keys(themesFiles).shift();
const themeFiles = themesFiles[themeName];

export default {
  providers,
  providedState: {
    documentTitle: `Lumbur`,
    metaDescription: `Built with react-redux-provide.`,
    jsFiles: [`/dist/Lumbur${min}.js`],
    themesFiles,
    themeFiles,
    themeName
  }
};
