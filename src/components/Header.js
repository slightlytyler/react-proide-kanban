import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';
import ThemeSelector from './ThemeSelector';

@provide
export default class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.Header}>
        <span className={classes.Welcome}>
          Welcome!
        </span>

        <ThemeSelector/>
      </div>
    );
  }
}
