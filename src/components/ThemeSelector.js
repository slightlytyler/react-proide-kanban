import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';
import { Form } from 'provide-page';

@provide
export default class ThemeSelector extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    themesFiles: PropTypes.object.isRequired,
    themeName: PropTypes.string.isRequired,
    loadTheme: PropTypes.func.isRequired,
    formId: PropTypes.string
  };

  static defaultProps = {
    formId: 'ThemeSelector'
  };

  loadNextTheme = (event, formData) => {
    const { themesFiles, themeName, loadTheme } = this.props;
    const themeNames = Object.keys(themesFiles);
    const themeIndex = themeNames.indexOf(themeName);
    const nextThemeName = themeNames[themeIndex + 1] || themeNames[0];

    loadTheme(nextThemeName, themesFiles[nextThemeName]);
  };

  render() {
    const { classes, themeName, formId } = this.props;

    return (
      <Form
        formId={formId}
        className={classes.ThemeSelector}
        onSubmit={this.loadNextTheme}
      >
        <button className={classes.ThemeName} type="submit">
          {themeName}
        </button>
      </Form>
    );
  }
}
