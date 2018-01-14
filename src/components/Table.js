import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function BasicTable(props) {

  const { classes, data } = props;

  return (
    <Paper className={classes.root}>
      {(data.length === 0) ?
        (<CircularProgress className={classes.progress} color="accent" size={50}/>) :
        (<Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Price</TableCell>
              <TableCell numeric>Supply</TableCell>
              <TableCell numeric>Market Cap</TableCell>
              <TableCell numeric>BTCPE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.name}</TableCell>
                  <TableCell numeric>{n.price_usd}</TableCell>
                  <TableCell numeric>{n.available_supply}</TableCell>
                  <TableCell numeric>{n.market_cap_usd}</TableCell>
                  <TableCell numeric>{n.btcpe}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>)}
    </Paper>
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);
