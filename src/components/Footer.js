import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { history } from '../App';

import { bang } from '../actions';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const styles = {
  root: {
    position:'absolute',
    width: '100%',
    bottom: 0
  },
};

class Footer extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });

    switch(value){
      case 0:
        if (history.location.pathname !== '/') history.push('/');
        break;
      case 1:
        if (history.location.pathname !== '/about') history.push('/about');
        break;
      case 2:
        if (history.location.pathname !== '/donate') history.push('/donate');
        break;
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<RestoreIcon />} />
        <BottomNavigationAction label="About" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Donate" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  return {
    router:state.router,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, bang), dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Footer));
