import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { history } from '../App';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import FavoriteIcon from 'material-ui-icons/Favorite';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';

const styles = {
  root: {
    position:'fixed',
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
      default:
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
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="About" icon={<InfoOutlineIcon />} />
        <BottomNavigationAction label="Donate" icon={<FavoriteIcon />} />
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
  return bindActionCreators({}, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Footer));
