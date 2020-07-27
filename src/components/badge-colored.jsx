import React from 'react';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: props => props.color,
        // boxShadow: (props) => `0 3px 5px 2px ${props.color}`,
        color: 'white',
    },
};

BadgeColored.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired
};
function BadgeColored(props) {
    const { classes, color, ...other } = props;
    // console.log(props)
    return <div>
    <Badge
      classes={{ badge: classes.root }}
      badgeContent={10}
      {...other} 
    >
    </Badge>
  </div>
}

export default withStyles(styles)(BadgeColored);