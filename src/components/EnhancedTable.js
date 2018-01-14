import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import NumberFormat from 'react-number-format';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/Cached';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'price_usd', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'btcpe', numeric: true, disablePadding: false, label: 'BTCPE' },
  { id: 'supply', numeric: true, disablePadding: false, label: 'Supply' },
  { id: 'market_cap_usd', numeric: true, disablePadding: false, label: 'MarketCap' },
];

class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead color="default">
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
    color: theme.palette.primary.A700,
    backgroundColor: theme.palette.primary.A100
  },
  highlight:
    theme.palette.type == 'light'
      ? {
          color: theme.palette.primary.A700,
          backgroundColor: theme.palette.primary.A100,
        }
      : {
          color: theme.palette.primary.A100,
          backgroundColor: theme.palette.primary.A700,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">Table</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Refresh List">
            <IconButton aria-label="Refresh List">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'desc',
      orderBy: 'market_cap_usd',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    if(orderBy === 'name') {
      const data =
        order === 'desc'
          ? this.state.data.sort((a, b) => (b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1))
          : this.state.data.sort((a, b) => (a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? -1 : 1));

      this.setState({ data, order, orderBy });
    } else {
      const data =
        order === 'desc'
          ? this.state.data.sort((a, b) => (parseFloat(b[orderBy]) < parseFloat(a[orderBy]) ? -1 : 1))
          : this.state.data.sort((a, b) => (parseFloat(a[orderBy]) < parseFloat(b[orderBy]) ? -1 : 1));

      this.setState({ data, order, orderBy });
    }

  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentWillReceiveProps(newProps, oldProps) {

    this.setState({data:newProps.data, params:newProps.params})

  }
  determinePrefix = ()=>{
    switch(this.props.params.currency){
      case 'USD':
        return '$'
        break;
      case 'CAD':
        return '$'
        break;
      case 'EUR':
        return '€'
        break;
      case 'GBP':
        return '£'
        break;
      case 'JPY':
        return '¥'
        break;
      default:
        return '$'
    }

  }
  render() {

    const { classes, params } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    onKeyDown={event => this.handleKeyDown(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="none">{n.name}</TableCell>
                    <TableCell numeric><NumberFormat value={n[`price_${params.currency.toLowerCase()}`].toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={this.determinePrefix()} /></TableCell>
                    <TableCell numeric><NumberFormat value={n.btcpe} displayType={'text'} thousandSeparator={true} prefix={this.determinePrefix()} /></TableCell>
                    <TableCell numeric><NumberFormat value={parseFloat(n.available_supply).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={''} /></TableCell>
                    <TableCell numeric><NumberFormat value={n[`market_cap_${params.currency.toLowerCase()}`].toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={this.determinePrefix()} /></TableCell>


                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
