import React from 'react';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  badge: {
    backgroundColor: props => props.color,
    color: 'white'
  },
  root: {
    width: '100%',
  }
};

BadgeColored.propTypes = {
  
  classes: PropTypes.object.isRequired
};
function BadgeColored(props) {

  const { classes, color, ...other } = props;

  return <Badge
      classes={{ badge: classes.badge, root: classes.root }}
      badgeContent={10}
      {...other}
    >
    </Badge>
 
}

export default withStyles(styles)(BadgeColored);