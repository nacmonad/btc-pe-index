import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateParams} from '../actions';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

class SimpleSelect extends React.Component {
  state = {
    name: '',
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
    //check if params are different
    this.props.updateParams({ name:this.props.input.title, value:event.target.value});
    this.props.fetchData();
  };

  render() {
    const { classes, theme, input } = this.props;
    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">{input.title}</InputLabel>
          <Select
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="name-simple" />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 200,
                },
              },
            }}
          >
            {input.items.map(name =>
              {
                  return (
                    <MenuItem
                      key={name}
                      value={name}
                      style={{
                        fontWeight:
                          this.state.name !== name
                            ? theme.typography.fontWeightRegular
                            : theme.typography.fontWeightMedium,
                      }}
                    >
                      {name}
                    </MenuItem>
                  )
              })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    params:state.params
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateParams }, dispatch)
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(SimpleSelect));
